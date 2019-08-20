import { takeLatest, put } from 'redux-saga/effects';

import Actions from './actions';
import { functions } from 'index';

export default function* saga() {
  yield takeLatest(Actions.getLoginUser, getLoginUser);
  yield takeLatest(Actions.updateGitHubUser, updateGitHubUser);
}

function* getLoginUser(action: ReturnType<typeof Actions.updateGitHubUser>) {
  const getLoginUser = functions.httpsCallable('getLoginUser');
  const response = yield getLoginUser();
  yield put(Actions.setLoginUser(response.data));
}

function updateGitHubUser(action: ReturnType<typeof Actions.updateGitHubUser>) {
  const {
    credential: { accessToken },
    additionalUserInfo: { username },
  } = action.payload;

  const requestData = { github_access_token: accessToken, github_user_name: username };

  const updateGitHubUser = functions.httpsCallable('updateGitHubUser');
  updateGitHubUser(requestData).catch(error => {
    console.error(error);
  });
}
