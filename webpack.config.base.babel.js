/* eslint strict: 0 */
"use strict";

import path from 'path';

let config = {
	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				loaders: ['babel-loader'],
				exclude: /node_modules/
			},
			{
				test: /\.json$/,
				loader: 'json-loader'
			}
		],
		noParse: ['ws']
	},
	plugins: [],
	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'bundle.js',
		publicPath: '/static/'
	}
};

export default config;