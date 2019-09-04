import { all, fork } from 'redux-saga/effects';

import AppSaga from 'modules/App/sagas';
import MyPageSaga from 'modules/MyPage/sagas';
import ProfileSaga from 'modules/Profile/sagas';

export const rootSaga = function* root() {
  yield all([fork(AppSaga), fork(MyPageSaga), fork(ProfileSaga)]);
};

export default rootSaga;
