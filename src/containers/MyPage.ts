import { Action } from 'typescript-fsa';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { State } from 'reducers';
import { AppState } from 'modules/App/reducers';
import MyPage from 'components/MyPage';

export interface MypageStateToProps {
  appState: AppState;
}

function mapStateToProps(state: State) {
  return {
    appState: state.app,
  };
}

export interface MypPageActionsToProps {}

function mapDispatchToProps(dispatch: Dispatch<Action<string>>) {
  return {};
}

export type Props = MypageStateToProps & MypPageActionsToProps;
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MyPage);
