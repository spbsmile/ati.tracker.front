"use strict";
var webpack = require('webpack');
var path = require('path');
var rules = require('./webpack.rules');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var DashboardPlugin = require('webpack-dashboard/plugin');
var BitBarWebpackProgressPlugin = require("bitbar-webpack-progress-plugin");
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const HOST = process.env.HOST || "127.0.0.1";
const PORT = process.env.PORT || 5555;

module.exports = {
	entry: [
		'react-hot-loader/patch',
		'./src/index.jsx'
	],
	devtool: process.env.WEBPACK_DEVTOOL || 'eval-source-map',
	output: {
		publicPath: '/',
		path: path.join(__dirname, 'public'),
		filename: 'bundle.js',
	},
	module:{
		rules
	},
	resolve: {
		modules: [
			path.join(__dirname, "src"),
			"node_modules"
		],
		extensions: ['.js', '.jsx', '.scss']
	},
	devServer: {
		contentBase: "./public",
		// do not print bundle build stats
		noInfo: true,
		// enable HMR
		hot: true,
		// embed the webpack-dev-server runtime into the bundle
		inline: true,
		// serve index.html in place of 404 responses to allow HTML5 history
		historyApiFallback: true,
		port: PORT,
		host: HOST
	},
	plugins: [
		new webpack.NoEmitOnErrorsPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new DashboardPlugin(),
		new webpack.NamedModulesPlugin(),
		// prints more readable module names in the browser console on HMR updates
		new HtmlWebpackPlugin({
			template: './src/template.html'
		}),
		new BitBarWebpackProgressPlugin(),
		new ExtractTextPlugin({
			filename: "bundle.sass",
			disable: false,
			allChunks: true
		})
	]
}