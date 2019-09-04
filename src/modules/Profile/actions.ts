import actionCreatorFactory from 'typescript-fsa';

const actionCreator = actionCreatorFactory('Profile');

const actions = {
  getUserInfo: actionCreator<string>('getUserInfo'),
  setUserInfo: actionCreator<any>('setUserInfo'),
};

export default actions;
