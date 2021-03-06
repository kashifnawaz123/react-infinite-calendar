var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    devtool: 'cheap-module-eval-source-map',
    entry: [
        'webpack-hot-middleware/client',
        './index'
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/static/'
    },
    plugins: [
        new HtmlWebpackPlugin({
			template: './index.html',
			inject: 'body' // Inject all scripts into the body
		}),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ],
    resolve: {
			root: path.resolve(__dirname, "node_modules"),
			extensions: ['', '.js', '.jsx', '.scss']
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loaders: ['babel'],
                exclude: /node_modules/,
                include: __dirname
            },
            {
                test: /(\.scss|\.css)$/,
                loaders: ['style', 'css?sourceMap&modules&importLoaders=1&localIdentName=Cal__[name]__[local]!postcss!sass?sourceMap']
            }
        ]
    },
    postcss: [autoprefixer]
}
