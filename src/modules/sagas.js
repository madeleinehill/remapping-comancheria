import axios from "axios";
import { put, takeLatest, takeEvery, call, select } from "redux-saga/effects";
import {
  FETCH_AVAILABLE_LESSONS,
  FETCH_AVAILABLE_LESSONS_SUCCEEDED,
  FETCH_AVAILABLE_LESSONS_FAILED,
  FETCH_LESSON,
  FETCH_LESSON_SUCCEEDED,
  FETCH_LESSON_FAILED,
  FETCH_RESOURCE,
  FETCH_RESOURCE_SUCCEEDED,
  FETCH_RESOURCE_FAILED,
  SET_SLIDE_DEPENDENCIES,
  SLIDE_RESOURCES_FAILED,
} from "./actions";
import { SUCCESS } from "../utils/constants";

export function* rootSaga() {
  yield takeEvery(FETCH_AVAILABLE_LESSONS, fetchAvailableLessons);
  yield takeEvery(FETCH_AVAILABLE_LESSONS, fetchAvailableLessons);
  yield takeLatest(FETCH_LESSON, fetchLesson);
  yield takeLatest(FETCH_LESSON_SUCCEEDED, fetchResources);
  yield takeEvery(FETCH_RESOURCE, fetchResource);
}

export function* initializeApplication() {
  yield put({ type: FETCH_AVAILABLE_LESSONS });
  yield put({
    type: FETCH_LESSON,
    value: 1,
  });
}

const getCurrentResources = (state) => state.resources;

const public_dir = (url) => {
  return axios.request({
    method: "get",
    url: url,
  });
};

function* fetchAvailableLessons() {
  try {
    const response = yield call(
      public_dir,
      `${process.env.PUBLIC_URL}/lessons/available_lessons.json`,
    );
    yield put({
      type: FETCH_AVAILABLE_LESSONS_SUCCEEDED,
      value: response.data,
    });
  } catch (e) {
    yield put({ type: FETCH_AVAILABLE_LESSONS_FAILED, message: e.message });
  }
}

function* fetchLesson(action) {
  try {
    const response = yield call(
      public_dir,
      `${process.env.PUBLIC_URL}/lessons/${action.value}/master.json`,
    );
    yield put({
      type: FETCH_LESSON_SUCCEEDED,
      value: { ...response.data, src: action.value },
    });
  } catch (e) {
    yield put({ type: FETCH_LESSON_FAILED, message: e.message });
  }
}

function* fetchResources(action) {
  // crawl content tree for "src" key, load urls
  for (const slide in action.value.content) {
    try {
      const dependencies = yield recursiveFetchResources(
        action.value.content[slide],
      );

      yield put({
        type: SET_SLIDE_DEPENDENCIES,
        value: { slide, dependencies },
      });
    } catch (e) {
      yield put({ type: SLIDE_RESOURCES_FAILED, value: { slide }, message: e });
    }
  }
}

function* recursiveFetchResources(el, overrides = {}) {
  let dependencies = [];

  // if el is an object
  if (typeof el === "object" && el !== null) {
    // check if it contains 'src'
    if (!!el["src"]) {
      // send FETCH_RESOURCE action to store
      yield put({
        type: FETCH_RESOURCE,
        value: { src: el["src"] },
      });
      dependencies.push(el["src"]);
    }

    // apply overrides, after merging with current scope
    overrides =
      !!el.overrides && typeof el.overrides === "object"
        ? { ...overrides, ...el.overrides }
        : overrides;
    Object.entries(overrides).forEach(([key, override]) => {
      if (!!el[override]) {
        el[key] = el[override];
      }
    });
  }
  // crawl children if el is array or object
  if (Array.isArray(el) || (typeof el === "object" && el !== null)) {
    // crawl elements
    for (const child in el) {
      const childDependencies = yield recursiveFetchResources(
        el[child],
        overrides,
      );
      dependencies = dependencies.concat(childDependencies);
    }
  }
  return dependencies;
}

function* fetchResource(action) {
  const { src } = action.value;

  // check if in store already and not failed
  const loadedResources = yield select(getCurrentResources);
  if (
    !!loadedResources[src] &&
    loadedResources[src].loadingStatus === SUCCESS
  ) {
    return;
  }

  // resolve address based on whether relative or absolute
  // const resolvedSrc =
  //   src.substring(0, 2) === "./"
  //     ? `${process.env.PUBLIC_URL}/${src.substring(2)}`
  //     : src;

  // otherwise fetch the resource
  try {
    const response = yield call(public_dir, src);
    yield put({
      type: FETCH_RESOURCE_SUCCEEDED,
      value: {
        src: src,
        type: "unknown",
        content: response.data,
      },
    });
  } catch (e) {
    yield put({ type: FETCH_RESOURCE_FAILED, message: e.message });
  }
}
