const path = require('path');

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
    }
}