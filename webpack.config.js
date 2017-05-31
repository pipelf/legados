var webpack = require('webpack');
var path = require("path");

module.exports = {
    entry: {
        main: './src/index.js'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
            // new webpack.optimize.CommonsChunkPlugin({
            //     name: ['vendor', 'manifest'],
            //     minChunks: function (module) {
            //       return module.context && module.context.indexOf('node_modules') !== -1;
            //     }
            // })
    ],
    devtool: "cheap-eval-source-map"    
};