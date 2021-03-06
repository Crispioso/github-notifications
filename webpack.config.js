const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
	entry: './src/index.js',
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
            },
			{
				test: /\.jsx$/,
				loader: "eslint-loader"
			}
		]
	},
	plugins: [
        new ExtractTextPlugin("main.css"),
        new CopyWebpackPlugin([
            { from: 'src/index.html', to: 'index.html' }
        ])
	],
    eslint: {
        configFile: '.eslintrc.json'
    }
};
