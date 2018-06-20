const path = require('path')
const webpack = require('webpack')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const main = './src/index.js'

const sourcePaths = [main]

module.exports = {
  entry: sourcePaths,

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'nineslice.js',
    libraryTarget: 'umd',
    library: 'NineSlice',
  },

  externals: {
    phaser: 'phaser',
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: [
          /node_modules/,
        ],
      },
    ],
  },

  plugins: [
    new UglifyJsPlugin(),
  ],
};