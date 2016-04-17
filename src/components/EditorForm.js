"use strict";

import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import classNames from 'classnames';

import TextInput from './common/TextInput';
import SelectInput from './common/SelectInput';

import { Button, ButtonToolbar } from 'react-bootstrap';


export const fields = [
	'name',
	'fileName',
	'duration',
	'parts[].startTime',
	'parts[].stopTime'
];

const validate = values => {

	const errors = {};

	if (!values.name) {
		errors.name = 'Prosím vyplňte toto pole.';
	}

	if (!values.fileName) {
		errors.fileName = 'Prosím vyplňte toto pole.';
	}

	errors.parts = {};

	values.parts.forEach((part, index) => {

		errors.parts[index] = {};

		console.log(part);

		if (!part.startTime) {
			errors.parts[index].startTime = 'Prosím vyplňte toto pole.';
		}
		else {
			if (!part.startTime.match(/[0-9]+:[0-9]{1,2}/)) {
				errors.parts[index].startTime = 'Zadejte hodnotu ve formátu 00:00 (minuty:sekundy)';
			}
		}

		if (!part.stopTime) {
			errors.parts[index].stopTime = 'Prosím vyplňte toto pole.';
		}
		else {
			if (!part.stopTime.match(/[[0-9]+:[0-9]{1,2}/)) {
				errors.parts[index].stopTime = 'Zadejte hodnotu ve formátu 00:00 (minuty:sekundy)';
			}
		}

		if (part.startTime && part.stopTime && part.startTime.match(/[0-9]{2}:[0-9]{2}/) && part.stopTime.match(/[0-9]{2}:[0-9]{2}/)) {

			let startTime = part.startTime.split(':');
			let stopTime = part.stopTime.split(':');

			startTime = parseInt(startTime[0]) * 60 + parseInt(startTime[1]);
			stopTime = parseInt(stopTime[0]) * 60 + parseInt(stopTime[1]);

			console.log(startTime, stopTime);

			if (startTime >= stopTime) {
				errors.parts[index].stopTime = 'Hodnota koncového času musí být větší než hodnota počátečního času';
			}

		}

	});

	return errors;

};

class EditorForm extends Component {

	static propTypes = {
		fields: PropTypes.object.isRequired,
		handleSubmit: PropTypes.func.isRequired,
		resetForm: PropTypes.func.isRequired,
		submitting: PropTypes.bool.isRequired
	};

	constructor(props) {
		super(props);
	}

	render() {

		const {
			fields: {name, fileName, duration, parts},
			handleSubmit,
			resetForm,
			submitting
		} = this.props;

		//console.log(this.props);

		const wrapperClass = classNames({
			'form-group': true
		});

		// <TextInput
		// 	name="duration"
		// 	label="Délka trvání"
		// 	{...duration}
		// 	error={duration.touched && duration.error ? duration.error : ''}
		// />

		return (
			<form onSubmit={handleSubmit}>

				<TextInput
					name="title"
					label="Jméno projektu"
					placeholder="Svkělý dokument o Novém Zélandu"
					{...name}
					error={name.touched && name.error ? name.error : ''}
				/>

				<TextInput
					name="fileName"
					label="Název souboru videa"
					placeholder="video.mp4"
					{...fileName}
					error={fileName.touched && fileName.error ? fileName.error : ''}
				/>

				<div className={wrapperClass}>
					<label className="control-label">Části videa <span className="badge">{parts.length}</span></label>
					{parts.map((part, index) =>
						<div key={index} className="panel panel-default">
							<div className="panel-heading">část #{index + 1}</div>
							<div className="panel-body">

								<TextInput
									name="startTime"
									label="Počáteční čas"
									placeholder="minuty:sekundy"
									{...part.startTime}
									error={part.startTime.touched && part.startTime.error ? part.startTime.error : ''}
								/>


								<TextInput
									name="stopTime"
									label="Koncový čas"
									placeholder="minuty:sekundy"
									{...part.stopTime}
									error={part.stopTime.touched && part.stopTime.error ? part.stopTime.error : ''}
								/>

								<Button bsStyle="danger" onClick={() => {parts.removeField(index);}}>Smazat</Button>
							</div>
						</div>
					)}
					<ButtonToolbar>
						<Button bsStyle="danger" onClick={() => {parts.addField();}}>Přidat další část</Button>
					</ButtonToolbar>
				</div>

				<ButtonToolbar>
					<Button type="submit" bsStyle="success" bsSize="large" disabled={submitting}>Vygenerovat</Button>
					<Button disabled={submitting} onClick={resetForm}>Vymazat</Button>
				</ButtonToolbar>

			</form>
		);
	}
}

EditorForm = reduxForm({
	form: 'editor',
	fields,
	validate
})(EditorForm);

export default EditorForm;