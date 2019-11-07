const webpack = require('webpack')
const fs = require('fs')
const { resolve, join } = require('path')

const baseConfig = {
  mode: 'production',
  output: {
    path: resolve('dist')
  },
  resolve: {
    modules: [
      resolve('src'),
      'node_modules'
    ],
    extensions: ['.js'],
    mainFiles: ['index']
  },
  stats: {
    colors: true,
    reasons: true,
    chunks: false
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        exclude: resolve(__dirname, 'node_modules')
      },
      {
        test: /\.js$/,
        exclude: [
          resolve(__dirname, 'node_modules')
        ],
        use: [
          {
            loader: 'babel-loader'
          }
        ]
      }
    ]
  }
}

const browserConfig = {
  ...baseConfig,
  context: resolve('src'),
  entry: './index.js',
  externals: {
    'cross-fetch': 'cross-fetch'
  },
  output: {
    ...baseConfig.output,
    filename: 'index.js',
    libraryTarget: 'umd',
    publicPath: '/'
  }
}

module.exports = browserConfig
