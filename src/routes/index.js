"use strict";

import React from 'react';
import { Router, Route, IndexRoute, Redirect, browserHistory } from 'react-router';

import App from '../containers/App';

import HomePage from '../views/HomePage';
import AboutPage from '../views/AboutPage';
import NotFoundPage from '../views/NotFoundPage';

export default (
	<Route path="/" component={App}>
		<IndexRoute component={HomePage}/>
		<Route path="about" component={AboutPage}/>
		<Route path="*" component={NotFoundPage}/>
	</Route>
);