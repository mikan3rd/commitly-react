import { all, fork } from 'redux-saga/effects';

import AppSaga from 'modules/App/sagas';

export const rootSaga = function* root() {
  yield all([fork(AppSaga)]);
};

export default rootSaga;
