const path = require('path');
const NodemonPlugin = require('nodemon-webpack-plugin');
const MiniCssExtract = require('mini-css-extract-plugin');
const webpack = require('webpack');

let dev = process.env.NODE_ENV === "dev";

module.exports = {
    watch: dev,
    mode: "none",
    devtool: 'eval-cheap-source-map',


    entry: {
        app: './src/index.js',
    },

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js',
    },

    module: {
        rules: [
            {
                test: /\.(sa|sc|c)ss$/,
                use: [MiniCssExtract.loader, 
                    'css-loader',
                    'postcss-loader',
                    'sass-loader',
                ],
            },
        ],
    },

    plugins: [
        new NodemonPlugin({

            script: './src/server.js',
            watch: [path.resolve('./dist'), path.resolve('./src')],
            ignore: ['*.js.map'],
            verbose: true,

            ext: 'js,njk,json',
        }),
        // This makes it possible for us to safely use env vars on our code
        new webpack.DefinePlugin({
            'MODE': JSON.stringify(dev),
            'webpack': JSON.stringify(webpack),
        }),

        new MiniCssExtract({
            filename: '[name].css',
            hmr: dev,
        }),
    ]
}