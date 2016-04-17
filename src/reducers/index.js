"use strict";

import { combineReducers } from 'redux';

import { reducer as form } from 'redux-form';
import { routerReducer } from 'react-router-redux';


const normalizeTime = (value, previousValue) => {

	if (!value) {
		return value;
	}

	console.log(previousValue);
	console.log(value);

	const check = /([0-9]+):([0-9]+)/g;

	if (!value.match(check)) {
		return value;
	}

	return value;

};

const rootReducer = combineReducers({
	form: form.normalize({
		editor: {
			//'parts[].startTime': normalizeTime,
			//'parts[].stopTime': normalizeTime
		}
	}),
	routing: routerReducer
});


export default rootReducer;