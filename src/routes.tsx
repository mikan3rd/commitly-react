import React from 'react';
import { Switch, Route } from 'react-router';
import App from './containers/App';
import MyPage from './containers/MyPage';

const routes = (
  <Switch>
    <Route exact path='/' component={App} />
    <Route exact path='/mypage' component={MyPage} />
  </Switch>
);

export default routes;
