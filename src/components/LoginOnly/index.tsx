import React from 'react';
import firebase from 'firebase/app';
import { Redirect } from 'react-router';

import { path } from 'routes';
import { Props } from 'containers/LoginOnly';

const LoginOnly: React.FC<Props> = props => {
  const {
    appState: { authChecked, loginUser },
    children,
  } = props;

  if (!authChecked) {
    return null;
  }

  const { currentUser } = firebase.auth();

  if (!currentUser) {
    return <Redirect to={path.topPage} />;
  }

  // user情報を取得中の場合
  if (currentUser && !loginUser) {
    return null;
  }

  // currentUser と loginUser が担保された状態
  return children;
};

export default LoginOnly;
