import actionCreatorFactory from 'typescript-fsa';

const actionCreator = actionCreatorFactory('App');

const actions = {
  changeLoading: actionCreator<boolean>('changeLoading'),
  chengeAuthChecked: actionCreator<boolean>('chengeAuthChecked'),
  updateGitHubUser: actionCreator<any>('updateGitHubUser'),
  getLoginUser: actionCreator('getLoginUser'),
  setLoginUser: actionCreator<any>('setLoginUser'),
};

export default actions;
