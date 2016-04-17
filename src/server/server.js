/* eslint-disable no-console, no-use-before-define */

import chalk from 'chalk';
import morgan from 'morgan';
import { Server } from 'http';
import Express from 'express';

import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from '../../webpack.config.development.babel.js';

const app = new Express();
const http = Server(app);
const port = 3000;

// Log request
app.use(morgan('dev'));

// Use this middleware to set up hot module reloading via webpack.
const compiler = webpack(webpackConfig);
app.use(webpackDevMiddleware(compiler, {noInfo: true, publicPath: webpackConfig.output.publicPath}));
app.use(webpackHotMiddleware(compiler));

app.get('/*', function (req, res) {
	res.sendFile(__dirname + '/index.html');
});

http.listen(port, function () {
	console.log(chalk.gray(`HTTP server listening on port ${chalk.cyan(port)}`));
});