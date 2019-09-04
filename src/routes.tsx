import React from 'react';
import { Switch, Route } from 'react-router';

import App from 'containers/App';
import LoginOnly from 'containers/LoginOnly';
import TopPage from 'containers/TopPage';
import MyPage from 'containers/MyPage';
import Profile from 'containers/Profile';

export const path = {
  topPage: '/',
  mypage: '/mypage',
  profile: '/profile/:username',
};

const routes = (
  <Switch>
    <App>
      <Switch>
        <Route exact path={path.topPage} component={TopPage} />
        <Route exact path={path.profile} component={Profile} />
        <LoginOnly>
          <Switch>
            <Route exact path={path.mypage} component={MyPage} />
          </Switch>
        </LoginOnly>
      </Switch>
    </App>
  </Switch>
);

export default routes;
