import React from 'react';
import firebase from 'firebase/app';
import { Redirect } from 'react-router';

import { path } from 'routes';
import { Props } from 'containers/LoginOnly';

const LoginOnly: React.FC<Props> = props => {
  const {
    appState: { authChecked },
    children,
  } = props;

  if (!authChecked) {
    return null;
  }

  const { currentUser } = firebase.auth();
  if (!currentUser) {
    return <Redirect to={path.topPage} />;
  }

  return children;
};

export default LoginOnly;
