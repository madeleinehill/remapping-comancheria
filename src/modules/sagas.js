import axios from "axios";
import { put, takeLatest, takeEvery, call } from "redux-saga/effects";
import {
  FETCH_AVAILABLE_LESSONS,
  FETCH_AVAILABLE_LESSONS_SUCCEEDED,
  FETCH_AVAILABLE_LESSONS_FAILED,
  FETCH_LESSON,
  FETCH_LESSON_SUCCEEDED,
  FETCH_LESSON_FAILED,
  FETCH_MAIN,
  FETCH_MAIN_SUCCEEDED,
  FETCH_MAIN_FAILED,
} from "./actions";
import { config } from "../utils/constants";

// const fetch = (ms) => new Promise((res) => setTimeout(res, ms));

export function* rootSaga() {
  yield takeEvery(FETCH_AVAILABLE_LESSONS, fetchAvailableLessons);
  yield takeLatest(FETCH_LESSON, fetchLesson);
  yield takeLatest(FETCH_LESSON_SUCCEEDED, fetchResources);
  yield takeEvery(FETCH_MAIN, fetchLessonResource);
}

export function* initializeApplication() {
  yield put({ type: FETCH_AVAILABLE_LESSONS });
}

function public_dir(url) {
  console.log(url);
  return axios.request({
    method: "get",
    url: url,
  });
}

function* fetchLessonResource(action) {
  try {
    const response = yield call(public_dir, action.value.path);
    yield put({
      type: FETCH_MAIN_SUCCEEDED,
      value: {
        lessonID: action.value.lessonID,
        contentIndex: action.value.contentIndex,
        content: response.data,
      },
    });
  } catch (e) {
    yield put({ type: FETCH_MAIN_FAILED, message: e.message });
  }
}

function* fetchLesson(action) {
  try {
    const response = yield call(
      public_dir,
      `${config.API_URL}/lessons/${action.value}/master.json`,
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
  for (const c in action.value.content) {
    yield put({
      type: FETCH_MAIN,
      value: {
        lessonID: action.value.src,
        contentIndex: c,
        path: `${config.API_URL}/lessons/${action.value.src}/${action.value.content[c].main_url}`,
      },
    });
  }
}

function* fetchAvailableLessons() {
  try {
    const response = yield call(
      public_dir,
      `${config.API_URL}/lessons/available_lessons.json`,
    );
    yield put({
      type: FETCH_AVAILABLE_LESSONS_SUCCEEDED,
      value: response.data,
    });
  } catch (e) {
    yield put({ type: FETCH_AVAILABLE_LESSONS_FAILED, message: e.message });
  }
}
