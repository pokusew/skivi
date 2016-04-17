"use strict";

import './styles/main.scss';
import React from 'react';
import { render } from 'react-dom';
import configureStore from './store/configureStore';
import Root from './containers/Root.js';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

let store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);

render(
	<Root
		store={store}
		history={history}
	/>,
	document.getElementById('app')
);