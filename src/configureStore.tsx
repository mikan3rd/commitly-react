import { createBrowserHistory } from 'history';
import { applyMiddleware, compose, createStore } from 'redux';
import { routerMiddleware } from 'connected-react-router';

import createRootReducer from 'reducers';

export const history = createBrowserHistory();

export default function configureStore(preloadedState?: any) {
  const store = createStore(
    createRootReducer(history),
    preloadedState,
    compose(applyMiddleware(routerMiddleware(history))),
  );

  // // Hot reloading
  // if (module.hot) {
  //   // Enable Webpack hot module replacement for reducers
  //   module.hot.accept('./reducers', () => {
  //     store.replaceReducer(createRootReducer(history));
  //   });
  // }

  return store;
}
