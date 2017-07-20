import { applyMiddleware, createStore, combineReducers } from 'redux';
import thunk from 'redux-thunk';

function createReducer(store) {
  return combineReducers(store, applyMiddleware(thunk));
}

export default (err, callback, reducers, view) => {
  let ready = false;
  const store = {};

  if (!!reducers.length) {
    reducers.forEach((reducer, idx) => {
      import(`reducers/${reducer}/index.js`).then((module) => {
        store[reducer] = module;

        if (++idx === reducers.length) {
          window.fynd.store.replaceReducer(createReducer(store));
          ready = true;
        }
      }).catch(err);
    });

    const lazy = setInterval(() => {
      if (!!ready) {
        clearInterval(lazy);
        import(`views/${view}.jsx`).then((module) => {
          return callback(null, module);
        }).catch(err);
      }
    }, 50);
  } else {
    import(`views/${view}.jsx`).then((module) => {
      return callback(null, module);
    }).catch(err);
  }
};
