const path = require('path')
const webpack = require('webpack')
const u = require('./webpack.util.js')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')


// lists all files rooted at the directory `base`
const fileList = base => u.getFilesIn(u.getDirPath(base))

const main = './src/index.js'

const sourcePaths = [main]

module.exports = {
  entry: sourcePaths,

  devtool: 'cheap-module-eval-source-map',

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'nineslice.js',
    libraryTarget: 'var',
    library: 'NineSlice',
    // devtoolModuleFilenameTemplate: 'webpack:///[absolute-resource-path]',
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: [
          /node_modules/,
          /vendor/,
        ],
      },
    ],
  },

  plugins: [
    new UglifyJsPlugin(),
  ],
};