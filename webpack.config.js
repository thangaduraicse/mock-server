'use strict';

const path = require('path');
const mockserver = require('./mock-server');

module.exports = {
  entry: [
    'webpack-dev-server/client?http://localhost:8081',
    path.resolve(__dirname, 'index.js')
  ],
  output: {
    path: path.resolve(__dirname, './content'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.json']
  },
  devServer: {
    before: function(app) {
      mockserver(app);
    },
    contentBase: path.resolve(__dirname, './content'),
    compress: true,
    historyApiFallback: {
      index: '/content/'
    },
    https: false,
    port: 8081,
    publicPath: '/',
    stats: 'errors-only',
    watchOptions: {
      aggregateTimeout: 1000,
      ignored: /node_modules/,
      poll: true
    }
  }
};
