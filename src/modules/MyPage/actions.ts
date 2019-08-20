import actionCreatorFactory from 'typescript-fsa';

const actionCreator = actionCreatorFactory('App');

const actions = {
  updateTwitterUser: actionCreator<any>('updateTwitterUser'),
  deleteTwitterUser: actionCreator('deleteTwitterUser'),
};

export default actions;
