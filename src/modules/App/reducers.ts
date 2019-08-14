import { reducerWithInitialState } from 'typescript-fsa-reducers';
import actions from './actions';

export interface AppState {
  authChecked: boolean;
}

const initialState: AppState = {
  authChecked: false,
};

export const appReducer = reducerWithInitialState(initialState).case(
  actions.chengeAuthChecked,
  (state, authChecked) => {
    return { ...state, authChecked };
  },
);
