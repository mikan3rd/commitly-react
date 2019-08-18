import { takeLatest } from 'redux-saga/effects';

import Actions from './actions';
import { functions } from 'index';

export default function* saga() {
  yield takeLatest(Actions.updateGitHubUser, updateGitHubUser);
  yield takeLatest(Actions.updateTwitterUser, updateTwitterUser);
}

function updateGitHubUser(action: ReturnType<typeof Actions.updateGitHubUser>) {
  const {
    credential: { accessToken },
    additionalUserInfo: { username },
  } = action.payload;

  const requestData = { github_access_token: accessToken, github_user_name: username };

  const updateGitHubUser = functions.httpsCallable('updateGitHubUser');
  updateGitHubUser(requestData)
    .then(response => {
      console.log(response);
    })
    .catch(error => {
      console.error(error);
    });
}

function updateTwitterUser(action: ReturnType<typeof Actions.updateGitHubUser>) {
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
  updateTwitterUser(requestData)
    .then(response => {
      console.log(response);
    })
    .catch(error => {
      console.error(error);
    });
}
