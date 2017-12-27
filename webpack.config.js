'use strict';

const path = require('path');

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
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      }
    }]
  },
  resolve: {
    modules: [
      'node_modules'
    ],
    extensions: ['.js', '.json']
  },
  resolveLoader: {
    moduleExtensions: ['-loader']
  },
  devtool: 'cheap-module-source-map',
  devServer: {
    contentBase: path.resolve(__dirname, './content'),
    compress: true,
    historyApiFallback: {
      index: '/content/'
    },
    https: false,
    port: 8081,
    publicPath: '/',
    setup: function(app) {
      console.log('======= app', app);
    },
    stats: true,
    watchOptions: {
      aggregateTimeout: 1000,
      ignored: /node_modules/,
      poll: true
    }
  }
};
