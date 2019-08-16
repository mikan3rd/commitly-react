import actionCreatorFactory from 'typescript-fsa';

const actionCreator = actionCreatorFactory('App');

const actions = {
  changeLoading: actionCreator<boolean>('changeLoading'),
  chengeAuthChecked: actionCreator<boolean>('chengeAuthChecked'),
};

export default actions;
