import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/functions';

import configureStore, { history } from 'configureStore';
import routes from 'routes';
import * as serviceWorker from 'serviceWorker';

import 'semantic-ui-css/semantic.min.css';
import 'react-semantic-toasts/styles/react-semantic-alert.css';

const firebaseConfig = {
  apiKey: 'AIzaSyCOPncLMSkbelEOCye6o-xjWFcx0FNcDzs',
  authDomain: 'commitly-27919.firebaseapp.com',
  databaseURL: 'https://commitly-27919.firebaseio.com',
  projectId: 'commitly-27919',
  storageBucket: 'commitly-27919.appspot.com',
  messagingSenderId: '917003540938',
  appId: '1:917003540938:web:c7ac2e1bdbc1c67d',
};
firebase.initializeApp(firebaseConfig);

export const functions = firebase.app().functions('asia-northeast1');

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>{routes}</ConnectedRouter>
  </Provider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
