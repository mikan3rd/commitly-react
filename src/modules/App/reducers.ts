import { reducerWithInitialState } from 'typescript-fsa-reducers';
import actions from './actions';

export interface AppState {
  isLoading: boolean;
  authChecked: boolean;
}

const initialState: AppState = {
  isLoading: false,
  authChecked: false,
};

export const appReducer = reducerWithInitialState(initialState)
  .case(actions.changeLoading, (state, isLoading) => {
    return { ...state, isLoading };
  })
  .case(actions.chengeAuthChecked, (state, authChecked) => {
    return { ...state, authChecked };
  });
