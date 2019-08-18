import { Action } from 'typescript-fsa';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { State } from 'reducers';
import { AppState } from 'modules/App/reducers';
import appActions from 'modules/App/actions';
import MyPage from 'components/MyPage';

export interface MypageStateToProps {
  appState: AppState;
}

function mapStateToProps(state: State) {
  return {
    appState: state.app,
  };
}

export interface MypPageActionsToProps {
  chengeAuthChecked: (v: boolean) => Action<boolean>;
  updateTwitterUser: (v: any) => Action<any>;
}

function mapDispatchToProps(dispatch: Dispatch<Action<any>>) {
  return {
    chengeAuthChecked: (v: boolean) => dispatch(appActions.chengeAuthChecked(v)),
    updateTwitterUser: (v: any) => dispatch(appActions.updateTwitterUser(v)),
  };
}

export type Props = MypageStateToProps & MypPageActionsToProps;
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MyPage);
