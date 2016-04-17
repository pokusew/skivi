"use strict";

import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import { browserHistory } from 'react-router';

import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import persistState from 'redux-localstorage';

import rootReducer from '../reducers/';

import DevTools from '../containers/DevTools.js';

const reduxRouterMiddleware = routerMiddleware(browserHistory);

export default function configureStore(initialState) {

	const store = createStore(
		rootReducer,
		initialState,
		compose(
			applyMiddleware(thunk, reduxRouterMiddleware/*, createLogger()*/),
			persistState('auth'),
			DevTools.instrument()
		)
	);

	// Required for replaying actions from devtools to work
	//reduxRouterMiddleware.listenForReplays(store);

	if (module.hot) {
		// Enable Webpack hot module replacement for reducers
		module.hot.accept('../reducers/', () => {
			const nextRootReducer = require('../reducers/').default;
			store.replaceReducer(nextRootReducer)
		})
	}

	return store;
}