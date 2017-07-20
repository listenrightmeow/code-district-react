import React from 'react';
import { Router, browserHistory } from 'react-router';

import application from 'views/application.jsx';
import lazyload from 'helpers/lazyloader';

function err(err) {
  console.error('Dynamic page loading failed', err);
}

const routes = {
  component: application,
  childRoutes: [
    {
      path: '/',
      getComponent(location, callback) {
        lazyload(err, callback, ['user'], 'user');
      }
    }
  ]
};

export default (
  <Router history={browserHistory} routes={routes} />
);
