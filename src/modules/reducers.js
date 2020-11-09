// import _ from "lodash";
import {
  FETCH_AVAILABLE_LESSONS_SUCCEEDED,
  FETCH_AVAILABLE_LESSONS_FAILED,
  FETCH_AVAILABLE_LESSONS,
  FETCH_LESSON_SUCCEEDED,
  FETCH_LESSON_FAILED,
  FETCH_LESSON,
  INCREMENT_INDEX,
  DECREMENT_INDEX,
} from "./actions";
import { SUCCESS, FAILED, NOT_LOADED, LOADING } from "../utils/loadingStatus";

export const defaultState = {
  availableLessons: { loadingStatus: NOT_LOADED, lessons: [] },
  currentLesson: {
    loadingStatus: NOT_LOADED,
    currentIndex: 0,
    content: [],
    name: null,
  },
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    default:
      return state;

    case FETCH_AVAILABLE_LESSONS:
      return {
        ...state,
        availableLessons: { ...state.availableLessons, loadingStatus: LOADING },
      };

    case FETCH_AVAILABLE_LESSONS_SUCCEEDED:
      return {
        ...state,
        availableLessons: {
          loadingStatus: SUCCESS,
          lessons: action.value.availableLessons,
        },
      };

    case FETCH_AVAILABLE_LESSONS_FAILED:
      return {
        ...state,
        availableLessons: { loadingStatus: FAILED },
      };

    case FETCH_LESSON:
      return {
        ...state,
        currentLesson: {
          ...state.currentLesson,
          loadingStatus: LOADING,
        },
      };

    case FETCH_LESSON_SUCCEEDED:
      return {
        ...state,
        currentLesson: {
          loadingStatus: SUCCESS,
          content: action.value.content,
          name: action.value.name,
          src: action.value.src,
          currentIndex: 0,
        },
      };

    case FETCH_LESSON_FAILED:
      return {
        ...state,
        currentLesson: {
          ...state.currentLesson,
          loadingStatus: FAILED,
        },
      };

    case INCREMENT_INDEX:
      return {
        ...state,
        currentLesson: {
          ...state.currentLesson,
          currentIndex: state.currentLesson.currentIndex + 1,
        },
      };

    case DECREMENT_INDEX:
      return {
        ...state,
        currentLesson: {
          ...state.currentLesson,
          currentIndex: state.currentLesson.currentIndex - 1,
        },
      };
  }
};

export default reducer;
