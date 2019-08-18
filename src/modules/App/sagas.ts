import { takeLatest } from 'redux-saga/effects';

import Actions from './actions';
import { functions } from 'index';

export default function* saga() {
  yield takeLatest(Actions.updateGitHubUser, updateGitHubUser);
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
