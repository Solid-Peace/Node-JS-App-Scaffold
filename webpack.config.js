const path = require('path');
const NodemonPlugin = require('nodemon-webpack-plugin');

let dev = process.env.NODE_ENV === "dev";

module.exports = {
    watch: dev,
    mode: "none",
    devtool: 'eval-cheap-source-map',


    entry:  {
        app: './src/index.js',
    },

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    },

    plugins: [
        new NodemonPlugin({

            script: './src/server.js',
            watch: [path.resolve('./dist'), path.resolve('./src')],
            ignore: ['*.js.map'],
            verbose: true,

            ext: 'js,njk,json',
        }),
    ]
}