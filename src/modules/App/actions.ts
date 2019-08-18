import actionCreatorFactory from 'typescript-fsa';

const actionCreator = actionCreatorFactory('App');

const actions = {
  updateGitHubUser: actionCreator<any>('updateGitHubUser'),
  updateTwitterUser: actionCreator<any>('updateTwitterUser'),
  changeLoading: actionCreator<boolean>('changeLoading'),
  chengeAuthChecked: actionCreator<boolean>('chengeAuthChecked'),
};

export default actions;
