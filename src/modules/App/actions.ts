import actionCreatorFactory from 'typescript-fsa';

const actionCreator = actionCreatorFactory('App');

const actions = {
  chengeAuthChecked: actionCreator<boolean>('chengeAuthChecked'),
};

export default actions;
