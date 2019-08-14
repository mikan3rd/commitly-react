import React from 'react';
import firebase from 'firebase/app';
import { Redirect } from 'react-router';

import { path } from '../../routes';
import { Props } from '../../containers/LoginOnly';

class LoginOnly extends React.Component<Props> {
  componentDidMount() {
    const {
      appState: { authChecked },
      chengeAuthChecked,
    } = this.props;
    if (!authChecked) {
      const { currentUser } = firebase.auth();
      if (currentUser) {
        chengeAuthChecked(true);
      } else {
        firebase.auth().onAuthStateChanged(function(user) {
          chengeAuthChecked(true);
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
      return <div>Loading...</div>;
    }

    const { currentUser } = firebase.auth();
    if (!currentUser) {
      return <Redirect to={path.topPage} />;
    }

    return children;
  }
}

export default LoginOnly;
