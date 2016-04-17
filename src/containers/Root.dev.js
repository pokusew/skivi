"use strict";

import React, { Component, PropTypes } from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';

import routes from '../routes/';
import DevTools from './DevTools.js';

export default class Root extends Component {

	static propTypes = {
		store: PropTypes.object.isRequired
	};

	render() {

		const { store, history } = this.props;

		return (
			<Provider store={store}>
				<div id="root">
					<Router history={history} routes={routes}/>
					<DevTools />
				</div>
			</Provider>
		);

	}

};