import { takeLatest, put } from 'redux-saga/effects';
import { toast } from 'react-semantic-toasts';

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
    toast({
      type: 'success',
      icon: 'twitter',
      title: 'Twitter連携に成功しました！',
      time: 4000,
    });
  } catch (error) {
    console.log(error);
    toast({
      type: 'error',
      icon: 'twitter',
      title: 'Twitter連携に失敗しました...',
      description: String(error),
      time: 8000,
    });
  }
}

function* deleteTwitterUser(action: ReturnType<typeof Actions.deleteTwitterUser>) {
  const deleteTwitterUser = functions.httpsCallable('deleteTwitterUser');
  try {
    yield deleteTwitterUser();
    toast({
      type: 'success',
      icon: 'twitter',
      title: 'Twitterの解除に成功しました！',
      time: 4000,
    });
  } catch (error) {
    console.error(error);
    toast({
      type: 'error',
      icon: 'twitter',
      title: 'Twitterの解除に失敗しました...',
      description: error.message,
      time: 8000,
    });
  }
}

function* updateGithubRepositories(action: ReturnType<typeof Actions.updateGithubRepositories>) {
  yield put(Actions.setRepositoryLoading(true));
  const updateGithubRepositories = functions.httpsCallable('updateGithubRepositories');
  try {
    yield updateGithubRepositories();
    yield put(appActions.getLoginUser());
    toast({
      type: 'success',
      icon: 'github',
      title: '連携中リポジトリを更新しました！',
      time: 4000,
    });
  } catch (error) {
    console.log(error);
    toast({
      type: 'error',
      icon: 'github',
      title: '連携中リポジトリの更新に失敗しました...',
      description: String(error),
      time: 8000,
    });
  }
  yield put(Actions.setRepositoryLoading(false));
}
