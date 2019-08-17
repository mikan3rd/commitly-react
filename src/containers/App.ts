import { Action } from 'typescript-fsa';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

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
  chengeAuthChecked: (v: boolean) => Action<boolean>;
}

function mapDispatchToProps(dispatch: Dispatch<Action<any>>) {
  return {
    chengeAuthChecked: (v: boolean) => dispatch(appActions.chengeAuthChecked(v)),
  };
}

export type Props = AppStateToProps & AppActionsToProps;
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
