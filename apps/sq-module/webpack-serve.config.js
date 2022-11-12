const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const terserPlugin = require('terser-webpack-plugin');
const uglifyJsPlugin = require('uglifyjs-webpack-plugin');
const dotEnvPlugin = require('dotenv-webpack');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const path = require('path');
module.exports = {
	entry: [path.resolve(process.cwd(), 'apps/sq-module/src/main.ts')],
	watch: false,

	mode: 'development',

	devtool: 'inline-source-map',
	resolve: {
		extensions: ['.ts', '.tsx', '.js', '.jade'],
		modules: [path.resolve(process.cwd(), 'node_modules')],
	},
	target: 'node',
	output: {
		path: path.resolve(process.cwd(), 'dist-w/app'),
		filename: '[name].js',
	},
	externals: [nodeExternals()],
	module: {
		rules: [
			{
				test: /\.(ts|js)x?$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'babel-loader',
						options: {
							cacheDirectory: true,
						},
					},
					{
						loader: 'ts-loader',
						options: {},
					},
				],
			},
			{
				test: /\.handlebars$/,
				loader: 'handlebars-loader',
				options: {
					knownHelpersOnly: false,
					inlineRequires: /\/assets\/(:?images|audio|video)\//gi,
					partialDirs: ['./src/views/email/partials'],
				},
			},
		],
	},
	plugins: [
		new webpack.EvalSourceMapDevToolPlugin({
			filename: '[name].js.map',
		}),

		new webpack.DefinePlugin({
			'process.NODE_LOCAL_ENV': JSON.stringify(process.NODE_LOCAL_ENV || 'production'),
			'process.AWS_PROFILE': JSON.stringify(process.AWS_PROFILE || (() => (process.NODE_LOCAL_ENV === 'dev' ? 'local' : 'serverless'))()),
		}),
	],
	stats: 'verbose',
};
