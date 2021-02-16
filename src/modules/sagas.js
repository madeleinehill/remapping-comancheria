import axios from "axios";
import { put, takeLatest, takeEvery, call } from "redux-saga/effects";
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
} from "./actions";
import { config } from "../utils/constants";

export function* rootSaga() {
  yield takeEvery(FETCH_AVAILABLE_LESSONS, fetchAvailableLessons);
  yield takeEvery(FETCH_AVAILABLE_LESSONS, fetchAvailableLessons);
  yield takeLatest(FETCH_LESSON, fetchLesson);
  yield takeLatest(FETCH_LESSON_SUCCEEDED, fetchResources);
  yield takeEvery(FETCH_RESOURCE, fetchLessonResource);
}

export function* initializeApplication() {
  yield put({ type: FETCH_AVAILABLE_LESSONS });
  yield put({
    type: FETCH_LESSON,
    value: 1,
  });
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
      type: FETCH_RESOURCE_SUCCEEDED,
      value: {
        lessonID: action.value.lessonID,
        contentIndex: action.value.contentIndex,
        content: response.data,
      },
    });
  } catch (e) {
    yield put({ type: FETCH_RESOURCE_FAILED, message: e.message });
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
      type: FETCH_RESOURCE,
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
