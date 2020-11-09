import axios from "axios";
import { put, takeEvery, call } from "redux-saga/effects";
import {
  FETCH_AVAILABLE_LESSONS,
  FETCH_AVAILABLE_LESSONS_SUCCEEDED,
  FETCH_AVAILABLE_LESSONS_FAILED,
  FETCH_LESSON,
  FETCH_LESSON_SUCCEEDED,
  FETCH_LESSON_FAILED,
} from "./actions";

// const fetch = (ms) => new Promise((res) => setTimeout(res, ms));

export function* rootSaga() {
  yield takeEvery(FETCH_AVAILABLE_LESSONS, fetchAvailableLessons);
  yield takeEvery(FETCH_LESSON, fetchLesson);
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

function* fetchLesson(action) {
  try {
    const response = yield call(public_dir, `/scry/lessons/${action.value}`);
    yield put({
      type: FETCH_LESSON_SUCCEEDED,
      value: { ...response.data, src: action.value },
    });
  } catch (e) {
    yield put({ type: FETCH_LESSON_FAILED, message: e.message });
  }
}

function* fetchAvailableLessons() {
  try {
    const response = yield call(public_dir, `/scry/available_lessons.json`);
    yield put({
      type: FETCH_AVAILABLE_LESSONS_SUCCEEDED,
      value: response.data,
    });
  } catch (e) {
    yield put({ type: FETCH_AVAILABLE_LESSONS_FAILED, message: e.message });
  }
}
