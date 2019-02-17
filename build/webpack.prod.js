const webpack = require('webpack')
const merge = require('webpack-merge')
const ZipPlugin = require('zip-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const baseWebpack = require('./webpack.base')
const { styleLoaders } = require('./tools')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const requirePath = require('./tools').requirePath

const path = require('path')
const rootDir = path.resolve(__dirname, '..')
const resolve = (dir) => path.join(rootDir, 'src', dir)

module.exports = merge(baseWebpack, {
  module: { rules: styleLoaders({ extract: true, sourceMap: true }) },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({ 'process.env.NODE_ENV': '"production"' }),
    new OptimizeCSSPlugin({ cssProcessorOptions: { safe: true } }),
    new ExtractTextPlugin({ filename: 'css/[name].[contenthash].css' }),
    new CopyWebpackPlugin([
    {
      from: resolve('manifest.js'),
      to: path.join(__dirname, '../dist'),
      transform(content, path) {
        return Promise.resolve(JSON.stringify(requirePath(path)))
      },
      transformPath(targetPath, absolutePath) {
        return 'manifest.json';
      },
    }]),
    new webpack.HashedModuleIdsPlugin(),
    new ZipPlugin({
      path: '..',
      filename: 'extension.zip'
    })
  ]
})
