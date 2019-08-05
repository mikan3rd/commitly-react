import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { actions } from './actions';

export interface AppState {
  name: string;
}

const initialState: AppState = {
  name: '',
};

export const appReducer = reducerWithInitialState(initialState).case(actions.changeName, (state, name) => {
  return { ...state, name };
});
