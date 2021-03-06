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
    })]
}