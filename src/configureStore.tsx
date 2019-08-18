import { createBrowserHistory } from 'history';
import { applyMiddleware, compose, createStore } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import createSagaMiddleware from 'redux-saga';

import createRootReducer from 'reducers';
import rootSaga from 'sagas';

export const history = createBrowserHistory();

export default function configureStore(preloadedState?: any) {
  const sagaMiddleware = createSagaMiddleware();
  const middleWares = [routerMiddleware(history), sagaMiddleware];
  const store = createStore(createRootReducer(history), preloadedState, compose(applyMiddleware(...middleWares)));
  sagaMiddleware.run(rootSaga);

  // // Hot reloading
  // if (module.hot) {
  //   // Enable Webpack hot module replacement for reducers
  //   module.hot.accept('./reducers', () => {
  //     store.replaceReducer(createRootReducer(history));
  //   });
  // }

  return store;
}
