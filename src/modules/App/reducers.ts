import { reducerWithInitialState } from 'typescript-fsa-reducers';

import actions from './actions';

export interface AppState {
  isLoading: boolean;
  authChecked: boolean;
  loginUser?: any;
}

const initialState: AppState = {
  isLoading: false,
  authChecked: false,
  loginUser: null,
};

export const appReducer = reducerWithInitialState(initialState)
  .case(actions.setLoginUser, (state, loginUser) => {
    return { ...state, loginUser };
  })
  .case(actions.changeLoading, (state, isLoading) => {
    return { ...state, isLoading };
  })
  .case(actions.chengeAuthChecked, (state, authChecked) => {
    return { ...state, authChecked };
  });
