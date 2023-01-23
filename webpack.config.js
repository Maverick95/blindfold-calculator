const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    resolve: {
        extensions: ['.ts', '.tsx', '.jsx', '...'],
    },
    mode: 'development',
    devServer: {
        compress: true,
        port: 9000,
    },
    module: {
        rules: [
            {
                test: /\.[tj]sx?/,
                use: 'babel-loader',
            },
            {
                test: /\.css/,
                use: ['style-loader', 'css-loader'],
            },
        ]
    },
    plugins: [new HtmlWebpackPlugin({
        title: 'Blindfold Calculator',
        template: 'src/index.html',
    })],
    /* 
     * Tried to build with node v18.9.1, npm v8.19.1
     * Encountered the error seen at this issue with webpack
     * See comment for fix recommended by webpack author 
     * https://github.com/webpack/webpack/issues/14532#issuecomment-947525539
     */
    output: {
        hashFunction: "xxhash64",
    },
}