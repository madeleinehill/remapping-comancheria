import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import reducers from "./reducers";
import createSagaMiddleware from "redux-saga";

import { rootSaga, initializeApplication } from "./sagas";

export const defaultState = { availableLessons: [], currentLesson: null };
const sagaMiddleware = createSagaMiddleware();

export const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(sagaMiddleware)),
);

sagaMiddleware.run(rootSaga);
sagaMiddleware.run(initializeApplication);
