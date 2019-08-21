import { Action } from 'typescript-fsa';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

import { State } from 'reducers';
import { AppState } from 'modules/App/reducers';
import appActions from 'modules/App/actions';
import App from 'components/App';

export interface AppStateToProps {
  children?: any;
  appState: AppState;
}

function mapStateToProps(state: State) {
  return {
    appState: state.app,
  };
}

export interface AppActionsToProps {
  moveTo: (v: string) => Action<any>;
  setLoading: (V: boolean) => Action<boolean>;
  chengeAuthChecked: (v: boolean) => Action<boolean>;
  getLoginUser: () => Action<void>;
  updateGitHubUser: (v: any) => Action<any>;
}

function mapDispatchToProps(dispatch: Dispatch<Action<any>>) {
  return {
    moveTo: (v: string) => dispatch(push(v)),
    setLoading: (v: boolean) => dispatch(appActions.setLoading(v)),
    chengeAuthChecked: (v: boolean) => dispatch(appActions.chengeAuthChecked(v)),
    getLoginUser: () => dispatch(appActions.getLoginUser()),
    updateGitHubUser: (v: any) => dispatch(appActions.updateGitHubUser(v)),
  };
}

export type Props = AppStateToProps & AppActionsToProps;
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
