const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: "./src/client.js",
    output: {
        path: './dist/',
        filename: "bundle.js"
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel'
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader!sass-loader")
            }
        ]
    },
    devtool: '#source-map',
    // resolve: {
    //     alias: {
    //         'react': 'preact-compat',
    //         'react-dom': 'preact-compat'
    //     }
    // },
    plugins: [
        new ExtractTextPlugin("main.css")
    ]
};