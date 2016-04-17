"use strict";

import React, { Component, PropTypes } from 'react';

import { Link } from 'react-router';
import { Button } from 'react-bootstrap';
import { LinkContainer, IndexLinkContainer } from 'react-router-bootstrap';
import { Page, PageHeader, PageContent, LoadScreen } from '../components/common/layout';

import EditorForm from '../components/EditorForm';

import { saveAs } from '../components/FileSaver';


class HomePage extends Component {

	constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(values) {

		console.log(values);

		let title = values.name;
		let parts = values.parts.map(part => {

			let startTime = part.startTime.split(':');
			let stopTime = part.stopTime.split(':');

			startTime = parseInt(startTime[0]) * 60 + parseInt(startTime[1]);
			stopTime = parseInt(stopTime[0]) * 60 + parseInt(stopTime[1]);

			return {
				...part,
				startTime,
				stopTime,
				fileName: values.fileName
			};
		});

		let file = generate(title, parts);
		file = file.replace(/\t/g, '');
		file = file.trim();

		console.log(file);

		let blob = new Blob([file], {type: 'text/xml;charset=utf-8'});

		saveAs(blob, `${title}.xspf`);

		alert('Soubor byl vygenerován a měl by se automaticky stáhnout.');

		console.log();

	}

	render() {

		return (
			<Page>
				<PageHeader>
					<h1>Zkracovač videa</h1>
				</PageHeader>
				<PageContent>
					<div className="container">
						<p className="lead">
							Vítejte v jednoduché aplikaci, která vám umožní vytvořit zkrácenou verzi z vašeho
							videa.<br/>
							Pro bezproblémový chod prosím použijte nejnovější verzi prohlížeče <strong>Google
							Chrome</strong>.
						</p>
						<p>
							Použití je jednoduché. Vyplňte jméno vašeho videa, poté zadejte název souboru i s příponou
							ve kterém je video uloženo.<br/>
							Poté můžete klinutím na tlačítko „Přidat další část“ postupě přidat jednotlivé části videa,
							které si přejete zachovat.
						</p>
						<p>
							Až budete mít vše hotovo, klikněte na tlačítko „Vygenerovat“. Na základě vyplněných
							informací se vygeneruje speciální soubor s příponou xspf, který se automaticky stáhne.
						</p>
						<p>
							Stažený soubor přemístěte do <strong>stejné složky ve které je uloženo vaše video</strong>, které má název,
							který jste zde zadali.<br/>
							Pro přehrání upravené verze je potřeba program <a href="http://www.videolan.org/vlc/index.cs.html" target="_blank">VLC media player</a>.<br/>
							Po nainstalování programu, upravenou verzi videa přehrajete otevřením vygenrovaného xspf souboru ve VLC media playeru (mělo by stačit dvakrát kliknout).
						</p>
						<br/>
						<EditorForm
							onSubmit={this.handleSubmit}
						/>
					</div>
				</PageContent>
			</Page>
	);
	}

	}

	function generate(title, parts) {

		console.log(title, parts);

		function createTrack(index, part) {

		let track = (`
			<track>
				<location>${part.fileName}</location>
				<!-- <duration>${part.duration}</duration> -->
				<extension application="http://www.videolan.org/vlc/playlist/0">
					<vlc:id>${index}</vlc:id>
					<vlc:option>start-time=${part.startTime}</vlc:option>
					<vlc:option>stop-time=${part.stopTime}</vlc:option>
				</extension>
			</track>
		`);

		return track;

	}

		function createItem(index, part) {

		let item = (`
			<vlc:item tid="${index}"/>
		`);

		return item;

	}

		let playlist = (`
		<?xml version="1.0" encoding="UTF-8"?>
		<playlist xmlns="http://xspf.org/ns/0/" xmlns:vlc="http://www.videolan.org/vlc/playlist/ns/0/" version="1">
			<title>${title}</title>
			<trackList>
				${parts.map((part, index) => createTrack(index, part))}
			</trackList>
			<extension application="http://www.videolan.org/vlc/playlist/0">
				${parts.map((part, index) => createItem(index, part))}
			</extension>
		</playlist>
	`);

		return playlist;

	}

	export default HomePage;