import { Action } from 'typescript-fsa';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';

import { State } from 'reducers';
import Profile from 'components/Profile';
import { ProfileState } from 'modules/Profile/reducers';
import profileActions from 'modules/Profile/actions';

export interface ProfileStateToProps {
  profileState: ProfileState;
}

function mapStateToProps(state: State) {
  return {
    profileState: state.profile,
  };
}

export interface ProfileActionsToProps {
  getUserInfo: (v: any) => Action<string>;
}

function mapDispatchToProps(dispatch: Dispatch<Action<any>>) {
  return {
    getUserInfo: (v: string) => dispatch(profileActions.getUserInfo(v)),
  };
}

export type Props = ProfileStateToProps & ProfileActionsToProps & RouteComponentProps<{ username: string }>;
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Profile);
