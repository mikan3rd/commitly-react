import { reducerWithInitialState } from 'typescript-fsa-reducers';

import actions from './actions';

export interface ProfileState {
  user: any;
}

const initialState: ProfileState = {
  user: undefined,
};

export const profileReducer = reducerWithInitialState(initialState).case(actions.setUserInfo, (state, user) => {
  return { ...state, user };
});
