import React from 'react';
import { Switch, Route } from 'react-router';

import App from './containers/App';
import TopPage from './containers/TopPage';
import MyPage from './containers/MyPage';

export const path = {
  topPage: '/',
  mypage: '/mypage',
};

const routes = (
  <App>
    <Switch>
      <Route exact path={path.topPage} component={TopPage} />
      <Route exact path={path.mypage} component={MyPage} />
    </Switch>
  </App>
);

export default routes;
