import actionCreatorFactory from 'typescript-fsa';

const actionCreator = actionCreatorFactory('App');

const actions = {
  setLoading: actionCreator<boolean>('setLoading'),
  chengeAuthChecked: actionCreator<boolean>('chengeAuthChecked'),
  updateGitHubUser: actionCreator<any>('updateGitHubUser'),
  getLoginUser: actionCreator('getLoginUser'),
  setLoginUser: actionCreator<any>('setLoginUser'),
};

export default actions;
