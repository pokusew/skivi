/* eslint strict: 0 */
"use strict";

import webpack from 'webpack';
import baseConfig from './webpack.config.base.babel.js';
import autoprefixer from 'autoprefixer';

let config = {
	...baseConfig,
	debug: true,
	devtool: 'cheap-module-eval-source-map',
	entry: [
		'webpack-hot-middleware/client',
		'./src/main'
	],
	plugins: [
		...baseConfig.plugins,
		new webpack.optimize.OccurrenceOrderPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin()
	],
	module: {
		...baseConfig.module,
		loaders: [
			...baseConfig.module.loaders,
			{
				test: /\.css?$/,
				exclude: /\/src\/styles\/~bootstrap-sass\//,
				loaders: ['style', 'raw'],
				include: __dirname
			},
			{
				test: /\.scss$/,
				exclude: /~bootstrap-sass/,
				loader: 'style-loader!css-loader!sass-loader!postcss-loader?parser=postcss-scss'
			}
		]
	},
	postcss: function () {
		return [autoprefixer];
	}
};

export default config;