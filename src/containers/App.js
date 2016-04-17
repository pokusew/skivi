"use strict";

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Header from '../components/common/Header';

class App extends Component {

	static propTypes = {
		// Injected by React Redux connect() call
		dispatch: PropTypes.func,
		// Injected by React Router
		children: PropTypes.node
	};

	render() {

		const {children} = this.props;

		return (
			<div className="layout">
				<div className="layout-content">
					{children}
				</div>
				<footer className="layout-footer">
					<div className="container-fluid">
						<p>
							Jednoduchá plikace pro vytváření XSPF playlistů.
						</p>
						<p>
							&copy; 2016 Martin Endler
						</p>
					</div>
				</footer>
			</div>
		);
	}

}

function select(state) {
	return {};
}

// Wrap the component to inject dispatch and state into it
export default connect(select)(App);