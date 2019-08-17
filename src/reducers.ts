import { History } from 'history';
import { combineReducers } from 'redux';
import { RouterState, connectRouter } from 'connected-react-router';

import { appReducer, AppState } from 'modules/App/reducers';

export interface State {
  router: RouterState;
  app: AppState;
}
const rootReducer = (history: History) =>
  combineReducers({
    router: connectRouter(history),
    app: appReducer,
  });

export default rootReducer;
