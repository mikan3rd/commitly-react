import { Action } from 'typescript-fsa';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { State } from 'reducers';
import { AppState } from 'modules/App/reducers';
import appActions from 'modules/App/actions';
import LoginOnly from 'components/LoginOnly';

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
  changeLoading: (V: boolean) => Action<boolean>;
  chengeAuthChecked: (v: boolean) => Action<boolean>;
}

function mapDispatchToProps(dispatch: Dispatch<Action<any>>) {
  return {
    changeLoading: (v: boolean) => dispatch(appActions.changeLoading(v)),
    chengeAuthChecked: (v: boolean) => dispatch(appActions.chengeAuthChecked(v)),
  };
}

export type Props = AppStateToProps & AppActionsToProps;
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginOnly);
