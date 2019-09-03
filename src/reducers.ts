import { History } from 'history';
import { combineReducers } from 'redux';
import { RouterState, connectRouter } from 'connected-react-router';

import { appReducer, AppState } from 'modules/App/reducers';
import { myPageReducer, MyPageState } from 'modules/MyPage/reducers';

export interface State {
  router: RouterState;
  app: AppState;
  myPage: MyPageState;
}
const rootReducer = (history: History) =>
  combineReducers({
    router: connectRouter(history),
    app: appReducer,
    myPage: myPageReducer,
  });

export default rootReducer;
