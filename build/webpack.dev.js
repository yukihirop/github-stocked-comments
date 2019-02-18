const webpack = require('webpack')
const merge = require('webpack-merge')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const baseWebpack = require('./webpack.base')
const { styleLoaders } = require('./tools')
const ChromeReloadPlugin = require('wcer')

const path = require('path')
const rootDir = path.resolve(__dirname, '..')

module.exports = merge(baseWebpack, {
  watch: true,
  module: { rules: styleLoaders({ sourceMap: false }) },
  devtool: '#cheap-module-source-map',
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({ 'process.env.NODE_ENV': '"development"' }),
    new FriendlyErrorsPlugin(),
    new ChromeReloadPlugin({
      port: 9090,
      manifest: path.join(rootDir, 'src', 'manifest.js')
    })
  ]
})
