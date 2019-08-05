import actionCreatorFactory from 'typescript-fsa';

const actionCreator = actionCreatorFactory('App');

export const actions = {
  changeName: actionCreator<string>('changeName'),
};
