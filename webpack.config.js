const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
	entry: './client/index.js',
	output: {
		path: './dist',
		filename: 'bundle.js',
		publicPath: 'http://localhost:8080/'
	},
	devtool: '#source-map',
	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				loader: 'babel-loader'
			},
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader!sass-loader")
            }
		]
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
        new ExtractTextPlugin("main.css")
	]
};
