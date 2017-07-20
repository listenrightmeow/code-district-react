import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';

import router from './router';
import reducer from 'reducers/default';

window.fynd.store = createStore(
  combineReducers({ default: reducer }),
  applyMiddleware(thunk)
);

render(
  <Provider store={window.fynd.store}>{router}</Provider>,
  document.getElementById('root')
)
