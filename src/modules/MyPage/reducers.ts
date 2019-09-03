import { reducerWithInitialState } from 'typescript-fsa-reducers';

import actions from './actions';

export interface MyPageState {
  isRepositoryLoading: boolean;
}

const initialState: MyPageState = {
  isRepositoryLoading: false,
};

export const myPageReducer = reducerWithInitialState(initialState).case(
  actions.setRepositoryLoading,
  (state, isRepositoryLoading) => {
    return { ...state, isRepositoryLoading };
  },
);
