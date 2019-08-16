import React from 'react';
import firebase from 'firebase/app';
import { Redirect } from 'react-router';

import { path } from '../../routes';
import { Props } from '../../containers/LoginOnly';

class LoginOnly extends React.Component<Props> {
  componentDidMount() {
    const {
      appState: { authChecked },
      changeLoading,
      chengeAuthChecked,
    } = this.props;
    if (!authChecked) {
      const { currentUser } = firebase.auth();
      if (currentUser) {
        chengeAuthChecked(true);
      } else {
        changeLoading(true);
        firebase.auth().onAuthStateChanged(function(user) {
          chengeAuthChecked(true);
          changeLoading(false);
        });
      }
    }
  }

  render() {
    const {
      appState: { authChecked },
      children,
    } = this.props;

    if (!authChecked) {
      return null;
    }

    const { currentUser } = firebase.auth();
    if (!currentUser) {
      return <Redirect to={path.topPage} />;
    }

    return children;
  }
}

export default LoginOnly;
