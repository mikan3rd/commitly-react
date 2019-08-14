import React from 'react';
import { Switch, Route } from 'react-router';

import App from './containers/App';
import LoginOnly from './containers/LoginOnly';
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
      <LoginOnly>
        <Switch>
          <Route exact path={path.mypage} component={MyPage} />
        </Switch>
      </LoginOnly>
    </Switch>
  </App>
);

export default routes;
