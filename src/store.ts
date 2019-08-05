import { createStore, combineReducers } from 'redux';
import { appReducer, AppState } from './modules/App/reducers';

export type State = {
  app: AppState;
};

const store = createStore(
  combineReducers<State>({
    app: appReducer,
  })
);

export default store;
