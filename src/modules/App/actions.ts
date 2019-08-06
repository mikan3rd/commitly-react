import actionCreatorFactory from 'typescript-fsa';

const actionCreator = actionCreatorFactory('App');

const actions = {
  changeName: actionCreator<string>('changeName'),
};

export default actions;
