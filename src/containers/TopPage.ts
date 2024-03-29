import { Action } from 'typescript-fsa';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';

import { State } from 'reducers';
import { AppState } from 'modules/App/reducers';
import appActions from 'modules/App/actions';
import TopPage from 'components/TopPage';

export interface AppStateToProps {
  appState: AppState;
}

function mapStateToProps(state: State) {
  return {
    appState: state.app,
  };
}

export interface AppActionsToProps {
  updateGitHubUser: (v: any) => Action<any>;
}

function mapDispatchToProps(dispatch: Dispatch<Action<string>>) {
  return {
    updateGitHubUser: (v: any) => dispatch(appActions.updateGitHubUser(v)),
  };
}

export type Props = AppStateToProps & AppActionsToProps & RouteComponentProps;
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TopPage);
