"use strict";

import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

class TextInput extends Component {

	static propTypes = {
		name: PropTypes.string.isRequired,
		label: PropTypes.string.isRequired,
		onChange: PropTypes.func.isRequired,
		value: PropTypes.string,
		placeholder: PropTypes.string,
		error: PropTypes.string
	};

	render() {

		const wrapperClass = classNames({
			'form-group': true,
			'has-error': this.props.error && this.props.error.length > 0
		});

		const errorBlock = this.props.error && this.props.error.length > 0
			? (<p className="help-block">{this.props.error}</p>)
			: null;

		const inputProps = {
			...this.props
		};
		delete inputProps.label;

		return (
			<div className={wrapperClass}>
				<label className="control-label" htmlFor={this.props.name}>{this.props.label}</label>
				<input
					type="text"
					name={this.props.name}
					placeholder={this.props.label}
					className="form-control"
					{...inputProps}
				/>
				{errorBlock}
			</div>
		);
	}
}

export default TextInput;