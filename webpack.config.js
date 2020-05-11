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
    filename: 'browser.js',
    libraryTarget: 'umd',
    publicPath: '/'
  }
}

const nodeConfig = {
  ...baseConfig,
  target: 'node',
  context: resolve('src'),
  devtool: false,
  entry: './index.js',
  externals: {
    'cross-fetch': 'cross-fetch'
  },
  output: {
    ...baseConfig.output,
    filename: 'node.js',
    libraryTarget: 'commonjs2',
    publicPath: '/'
  },
  node: {
    console: false,
    global: false,
    process: false,
    Buffer: false,
    __filename: false,
    __dirname: false
  }
}

const configs = {
  browser: browserConfig,
  node: nodeConfig
}

module.exports = configs[process.env.TARGET]
