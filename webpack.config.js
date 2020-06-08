const path = require('path')
const webpack = require('webpack')

const main = './src/index.js'

const sourcePaths = [main]

module.exports = {
  entry: sourcePaths,

  mode: 'production',
  // mode: 'development',

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'nineslice.min.js',
    libraryTarget: 'umd',
    library: 'NineSlice',
  },

  externals: /^phaser(\/.*)?/,

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
  }
};
