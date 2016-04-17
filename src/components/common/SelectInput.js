"use strict";

import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import Select from 'react-select';

class SelectInput extends Component {

	static propTypes = {
		name: PropTypes.string.isRequired,
		label: PropTypes.string.isRequired,
		onChange: PropTypes.func.isRequired,
		value: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
		placeholder: PropTypes.string,
		multi: PropTypes.bool,
		options: PropTypes.array,
		error: PropTypes.string
	};

	static defaultProps = {
		multi: false
	};

	handleChange = (options) => {

		if (this.props.multi) {
			//console.log('Selected options', options);
			let values = [];
			if (options) {
				values = options.map((option) => option.value);
			}
			//console.log('Selected values', values);
			this.props.onChange(values);
		} else {
			let value = null;
			if (options) {
				value = options.value;
			}
			//console.log(value);
			this.props.onChange(value);
		}

	};

	handleBlur = () => {
		this.props.onBlur();
	};

	render() {

		const wrapperClass = classNames({
			'form-group': true,
			'has-error': this.props.error && this.props.error.length > 0
		});

		const errorBlock = this.props.error && this.props.error.length > 0
			? (<p className="help-block">{this.props.error}</p>)
			: null;

		const {name, label, placeholder, value, options, multi, ...inputProps} = this.props;

		return (
			<div className={wrapperClass}>
				<label className="control-label" htmlFor={name}>{label}</label>
				<Select
					name={name}
					options={options}
					multi={multi}
					{...inputProps}
					value={value === '' && multi ? [] : value}
					onChange={this.handleChange}
					onBlur={this.handleBlur}
				/>
				{errorBlock}
			</div>
		);
	}
}

export default SelectInput;