import { takeLatest } from 'redux-saga/effects';

import Actions from './actions';
import { functions } from 'index';

export default function* saga() {
  yield takeLatest(Actions.updateGitHubUser, updateGitHubUser);
}

function updateGitHubUser(action: ReturnType<typeof Actions.updateGitHubUser>) {
  console.log(action.payload);
  const {
    credential: { accessToken },
    additionalUserInfo: { username },
  } = action.payload;
  const requestData = { github_access_token: accessToken, github_user_name: username };
  console.log(requestData);

  const testFunction = functions.httpsCallable('testFunction');
  testFunction(requestData).then(function(response) {
    console.log(response);
  });
}
