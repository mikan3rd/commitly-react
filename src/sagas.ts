import { all, fork } from 'redux-saga/effects';

import AppSaga from 'modules/App/sagas';
import MyPageSaga from 'modules/MyPage/sagas';

export const rootSaga = function* root() {
  yield all([fork(AppSaga), fork(MyPageSaga)]);
};

export default rootSaga;
