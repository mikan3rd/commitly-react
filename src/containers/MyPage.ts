import { Action } from 'typescript-fsa';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { State } from '../reducers';
import { AppState } from '../modules/App/reducers';
import appActions from '../modules/App/actions';
import MyPage from '../components/Mypage/index';

export interface MypageStateToProps {
  appState: AppState;
}

function mapStateToProps(state: State) {
  return {
    appState: state.app,
  };
}

export interface MypPageActionsToProps {
  changeName: (v: string) => Action<string>;
}

function mapDispatchToProps(dispatch: Dispatch<Action<string>>) {
  return {
    changeName: (v: string) => dispatch(appActions.changeName(v)),
  };
}

export type Props = MypageStateToProps & MypPageActionsToProps;
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyPage);
