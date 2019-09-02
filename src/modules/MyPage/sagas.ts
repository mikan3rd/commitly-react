import { takeLatest, put } from 'redux-saga/effects';

import Actions from './actions';
import { functions } from 'index';
import appActions from 'modules/App/actions';

export default function* saga() {
  yield takeLatest(Actions.updateTwitterUser, updateTwitterUser);
  yield takeLatest(Actions.deleteTwitterUser, deleteTwitterUser);
  yield takeLatest(Actions.updateGithubRepositories, updateGithubRepositories);
}

function* updateTwitterUser(action: ReturnType<typeof Actions.updateTwitterUser>) {
  const {
    credential: { accessToken, secret },
    additionalUserInfo: { username },
  } = action.payload;

  const requestData = {
    twitter_access_token: accessToken,
    twitter_access_token_secret: secret,
    twitter_screen_name: username,
  };

  const updateTwitterUser = functions.httpsCallable('updateTwitterUser');
  try {
    yield updateTwitterUser(requestData);
    yield put(appActions.getLoginUser());
  } catch (error) {
    console.log(error);
  }
}

function deleteTwitterUser(action: ReturnType<typeof Actions.deleteTwitterUser>) {
  const deleteTwitterUser = functions.httpsCallable('deleteTwitterUser');
  deleteTwitterUser().catch(error => {
    console.error(error);
  });
}

function* updateGithubRepositories(action: ReturnType<typeof Actions.updateGithubRepositories>) {
  const updateGithubRepositories = functions.httpsCallable('updateGithubRepositories');
  try {
    yield updateGithubRepositories();
    yield put(appActions.getLoginUser());
  } catch (error) {
    console.log(error);
  }
}
