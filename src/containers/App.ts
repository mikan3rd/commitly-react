import { Action } from 'typescript-fsa';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { State } from '../reducers';
import { AppState } from '../modules/App/reducers';
import App from '../components/App';

export interface AppStateToProps {
  children?: any;
  appState: AppState;
}

function mapStateToProps(state: State) {
  return {
    appState: state.app,
  };
}

export interface AppActionsToProps {}

function mapDispatchToProps(dispatch: Dispatch<Action<string>>) {
  return {};
}

export type Props = AppStateToProps & AppActionsToProps;
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
