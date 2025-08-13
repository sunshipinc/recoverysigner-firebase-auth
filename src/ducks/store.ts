import reduceReducers from "reduce-reducers";
import { type Reducer, type Action, legacy_createStore } from "redux";

import { Page } from "types/Page";
import { type State } from "types/State";
import { reducer as appReducer } from "./app";
import { reducer as firebaseReducer } from "./firebase";
import { reducer as pageReducer } from "./page";
import { reducer as statusReducer } from "./status";

const initialState: State = {
  appDidLoad: false,
  currentPage: Page.landing,
  statuses: {},
} as State;

const rootReducer = reduceReducers<State>(
  initialState,
  appReducer as unknown as Reducer<State>,
  firebaseReducer as unknown as Reducer<State>,
  pageReducer as unknown as Reducer<State>,
  statusReducer as unknown as Reducer<State>,
);

export const store = legacy_createStore(rootReducer as Reducer<State, Action>);

export type AppDispatch = typeof store.dispatch;
