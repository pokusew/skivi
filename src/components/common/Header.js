"use strict";

import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { Nav, NavDropdown, NavItem, Navbar, MenuItem, Button } from 'react-bootstrap';
import { LinkContainer, IndexLinkContainer } from 'react-router-bootstrap';

class Header extends Component {

	static propTypes = {
		user: PropTypes.object,
		onSignOut: PropTypes.func.isRequired
	};

	constructor(props) {
		super(props);
	}

	render() {

		const { user } = this.props;

		let login = (
			<LinkContainer to={`/sign/in`} active={false}>
				<Button className="navbar-btn navbar-right" bsStyle="primary">Přihlásit se</Button>
			</LinkContainer>
		);

		if (user) {
			login = (
				<Nav pullRight>
					<NavDropdown eventKey={5} title="Martin Endler" id="basic-nav-dropdown">
						<MenuItem eventKey={5.1}>Another action</MenuItem>
						<MenuItem eventKey={5.2}>Something else here</MenuItem>
						<MenuItem divider/>
						<MenuItem eventKey={5.3} onClick={this.props.onSignOut}>Odhlásit se</MenuItem>
					</NavDropdown>
				</Nav>
			);
		}

		return (
			<Navbar bsStyle="custom" fixedTop fluid>
				<Navbar.Header>

					<Navbar.Brand>
						<IndexLinkContainer to={`/`}>
							<a href="#">Memorio</a>
						</IndexLinkContainer>
					</Navbar.Brand>

					<Navbar.Toggle />
				</Navbar.Header>
				<Navbar.Collapse>
					<Nav>
						<IndexLinkContainer to={`/`}>
							<NavItem eventKey={1} href="#">Domů</NavItem>
						</IndexLinkContainer>
						<LinkContainer to={`/tags`}>
							<NavItem eventKey={2} href="#">Témata</NavItem>
						</LinkContainer>
						<LinkContainer to={`/items`}>
							<NavItem eventKey={3} href="#">Položky</NavItem>
						</LinkContainer>
						<LinkContainer to={`/about`}>
							<NavItem eventKey={4} href="#">O aplikaci</NavItem>
						</LinkContainer>
					</Nav>
					{login}
				</Navbar.Collapse>
			</Navbar>
		);

	}

}

export default Header;