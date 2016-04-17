/* eslint strict: 0 */
"use strict";

import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import baseConfig from './webpack.config.base.babel.js';
import autoprefixer from 'autoprefixer';

let config = {
	...baseConfig,
	devtool: 'source-map',
	entry: [
		'./src/main'
	],
	plugins: [
		...baseConfig.plugins,
		new webpack.optimize.OccurrenceOrderPlugin(),
		new webpack.optimize.UglifyJsPlugin({
			compressor: {
				screw_ie8: true,
				warnings: false
			}
		}),
		new ExtractTextPlugin('style.css', {allChunks: true})
	],
	module: {
		...baseConfig.module,
		loaders: [
			...baseConfig.module.loaders,
			{
				test: /\.css?$/,
				exclude: /\/src\/styles\/~bootstrap-sass\//,
				loaders: ExtractTextPlugin.extract('style-loader', 'raw'),
				include: __dirname
			},
			{
				test: /\.scss$/,
				exclude: /~bootstrap-sass/,
				loader: ExtractTextPlugin.extract('style-loader', ['css-loader', 'sass-loader', 'postcss-loader?parser=postcss-scss'])
			}
		]
	},
	postcss: function () {
		return [autoprefixer];
	}
};

export default config;