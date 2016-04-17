"use strict";

import React, { Component, PropTypes } from 'react';

import { Modal, Button } from 'react-bootstrap';

class ConfirmDialog extends Component {

	static propTypes = {
		title: PropTypes.string,
		sure: PropTypes.string,
		cancel: PropTypes.string
	};

	constructor(props) {
		super(props);
		this.state = {
			showModal: false,
			message: null
		};
	}

	handleCancel = () => {
		this.setState({showModal: false}, () => this.state.reject());
	};

	handleConfirm = () => {
		this.setState({showModal: false}, () => this.state.resolve());
	};

	confirm = (message) => {

		return new Promise((resolve, reject) => {
			this.setState({
				showModal: true,
				message: message,
				resolve: resolve,
				reject: reject
			});
		});
	};

	render() {

		return (
			<Modal show={this.state.showModal} onHide={this.handleCancel}>
				<Modal.Header closeButton>
					<Modal.Title>Potvrdit akci</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					{this.state.message}
				</Modal.Body>
				<Modal.Footer>
					<Button onClick={this.handleCancel}>Ne</Button>
					<Button bsStyle="danger" onClick={this.handleConfirm}>Ano</Button>
				</Modal.Footer>
			</Modal>
		);
	}
}

export default ConfirmDialog;