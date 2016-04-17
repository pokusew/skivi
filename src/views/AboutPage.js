"use strict";

import React, { Component, PropTypes } from 'react';

import { Link } from 'react-router';
import { Button } from 'react-bootstrap';
import { LinkContainer, IndexLinkContainer } from 'react-router-bootstrap';
import { Page, PageHeader, PageContent } from '../components/common/layout';


class AboutPage extends Component {

	render() {

		return (
			<Page>
				<PageHeader>
					<h1>O aplikaci</h1>
				</PageHeader>
				<PageContent>
					<div className="container-fluid">
						by se toho dalo napsat hodně, ale nejdřív napíšeme tu aplikaci
					</div>
				</PageContent>
			</Page>
		);
	}

}

export default AboutPage;