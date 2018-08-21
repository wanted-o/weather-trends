import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { middleware } from './src/utils/redux';
import sagas from './src/sagas';
import AppReducer from './src/reducers';

export default initialState => {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [sagaMiddleware, middleware];

  const devToolsExtention = 
    window && window.devToolsExtention ? window.devToolsExtention() : f => f;
  const store = createStore(AppReducer, initialState, compose(
    applyMiddleware(...middlewares),
    devToolsExtention,
  ));

  sagaMiddleware.run(sagas);

  return store;
};
