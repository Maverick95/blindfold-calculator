const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
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
    plugins: [new HtmlWebpackPlugin()]
}