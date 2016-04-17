"use strict";

import React, { Component, PropTypes } from 'react';

import { Link } from 'react-router';
import { Button } from 'react-bootstrap';
import { LinkContainer, IndexLinkContainer } from 'react-router-bootstrap';
import { Page, PageHeader, PageContent } from '../components/common/layout';

class NotFoundPage extends Component {

	render() {
		return (
			<Page>
				<PageHeader>
					<h1>Stránka nenalezena</h1>
				</PageHeader>
				<PageContent>
					<div className="container-fluid">
						<p>
							Jejda! :D
						</p>
						<LinkContainer to="/">
							<Button>Zpět na úvodní stránku</Button>
						</LinkContainer>
					</div>
				</PageContent>
			</Page>
		);
	}

}

export default NotFoundPage;