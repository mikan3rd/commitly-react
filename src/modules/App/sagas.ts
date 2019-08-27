import { takeLatest, put } from 'redux-saga/effects';
import { push } from 'connected-react-router';

import Actions from './actions';
import { functions } from 'index';
import { path } from 'routes';

export default function* saga() {
  yield takeLatest(Actions.getLoginUser, getLoginUser);
  yield takeLatest(Actions.updateGitHubUser, updateGitHubUser);
}

function* getLoginUser(action: ReturnType<typeof Actions.getLoginUser>) {
  yield put(Actions.setLoading(true));
  const getLoginUser = functions.httpsCallable('getLoginUser');
  try {
    const response = yield getLoginUser();
    yield put(Actions.setLoginUser(response.data));
  } catch (error) {
    console.log(error);
  }
  yield put(Actions.setLoading(false));
}

function* updateGitHubUser(action: ReturnType<typeof Actions.updateGitHubUser>) {
  yield put(Actions.setLoading(true));

  const {
    credential: { accessToken },
    additionalUserInfo: {
      username,
      isNewUser,
      profile: { id },
    },
  } = action.payload;

  const requestData = {
    github_access_token: accessToken,
    github_user_name: username,
    github_user_id: id,
    is_new_user: isNewUser,
  };

  const updateGitHubUser = functions.httpsCallable('updateGitHubUser');

  try {
    yield updateGitHubUser(requestData);
    yield put(push(path.mypage));
  } catch (error) {
    console.log(error);
  }

  yield put(Actions.setLoading(false));
}
