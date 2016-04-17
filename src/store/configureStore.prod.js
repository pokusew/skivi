"use strict";

import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import { browserHistory } from 'react-router';

import thunk from 'redux-thunk';
import persistState from 'redux-localstorage';

import rootReducer from '../reducers/';

export default function configureStore(initialState) {
	return createStore(
		rootReducer,
		initialState,
		compose(
			applyMiddleware(thunk, routerMiddleware(browserHistory)),
			persistState('auth')
		)
	);
};