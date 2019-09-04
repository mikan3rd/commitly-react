import { takeLatest, put } from 'redux-saga/effects';

import Actions from './actions';
import { functions } from 'index';
import appActions from 'modules/App/actions';

export default function* saga() {
  yield takeLatest(Actions.getUserInfo, getUserInfo);
}

function* getUserInfo(action: ReturnType<typeof Actions.getUserInfo>) {
  yield put(appActions.setLoading(true));
  const username = action.payload;
  const requestParams = { github_user_name: username };
  const getUserInfo = functions.httpsCallable('getUserInfo');
  try {
    const response = yield getUserInfo(requestParams);
    yield put(Actions.setUserInfo(response.data));
  } catch (error) {
    console.log(error);
  }
  yield put(appActions.setLoading(false));
}
