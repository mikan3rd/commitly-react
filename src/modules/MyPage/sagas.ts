import { takeLatest } from 'redux-saga/effects';

import Actions from './actions';
import { functions } from 'index';

export default function* saga() {
  yield takeLatest(Actions.updateTwitterUser, updateTwitterUser);
  yield takeLatest(Actions.deleteTwitterUser, deleteTwitterUser);
}

function updateTwitterUser(action: ReturnType<typeof Actions.updateTwitterUser>) {
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

function deleteTwitterUser(action: ReturnType<typeof Actions.deleteTwitterUser>) {
  const deleteTwitterUser = functions.httpsCallable('deleteTwitterUser');
  deleteTwitterUser()
    .then(response => {
      console.log(response);
    })
    .catch(error => {
      console.error(error);
    });
}
