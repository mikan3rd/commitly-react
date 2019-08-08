import React from 'react';
import { Switch, Route } from 'react-router';
import App from './containers/App';

const routes = (
  <Switch>
    <Route exact path='/' component={App} />
  </Switch>
);

export default routes;
