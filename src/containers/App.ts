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
  changeLoading: (V: boolean) => Action<boolean>;
  chengeAuthChecked: (v: boolean) => Action<boolean>;
  updateGitHubUser: (v: any) => Action<any>;
}

function mapDispatchToProps(dispatch: Dispatch<Action<any>>) {
  return {
    moveTo: (v: string) => dispatch(push(v)),
    changeLoading: (v: boolean) => dispatch(appActions.changeLoading(v)),
    chengeAuthChecked: (v: boolean) => dispatch(appActions.chengeAuthChecked(v)),
    updateGitHubUser: (v: any) => dispatch(appActions.updateGitHubUser(v)),
  };
}

export type Props = AppStateToProps & AppActionsToProps;
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
