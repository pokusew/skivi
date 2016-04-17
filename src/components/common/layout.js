"use strict";

import React, { Component, PropTypes } from 'react';


export const Page = (props) => {
	return (
		<main className="page">
			{props.children}
		</main>
	);
};

export const PageHeader = (props) => {
	return (
		<header className="page-header">
			<div className="container">
				{props.children}
			</div>
		</header>
	);
};

export const PageContent = (props) => {
	return (
		<div className="page-content">
			{props.children}
		</div>
	);
};

export const LoadScreen = (props) => {
	return (
		<div className="load-screen">
			<div className="sk-three-bounce">
				<div className="sk-child sk-bounce1"></div>
				<div className="sk-child sk-bounce2"></div>
				<div className="sk-child sk-bounce3"></div>
			</div>
			<div className="load-message">Načítání</div>
		</div>
	);
};
