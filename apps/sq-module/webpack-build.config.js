const { merge } = require('webpack-merge');
const webpack = require('webpack');
const path = require('path');
module.exports = (config, context) => {
	return merge(config, {
		devtool: 'source-map',
		mode: 'development',
		module: {
			// show logging in output
			rules: [
				{
					test: /\.css$/i,
					use: ['style-loader', 'css-loader'],
				},
			],
		},
		plugins: [
			new webpack.DefinePlugin({
				'process.NODE_LOCAL_ENV': JSON.stringify(process.NODE_LOCAL_ENV || 'production'),
				'process.AWS_PROFILE': JSON.stringify(process.AWS_PROFILE || (() => (process.NODE_LOCAL_ENV === 'dev' ? 'local' : 'serverless'))()),
			}),
		],
		stats: 'verbose',
	});
};
