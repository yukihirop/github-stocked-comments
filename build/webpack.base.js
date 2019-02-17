const path = require('path')
const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const ChromeReloadPlugin = require('wcer')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { cssLoaders, htmlPage } = require('./tools')
require('dotenv').config()

const rootDir = path.resolve(__dirname, '..')
const resolve = (dir) => path.join(rootDir, 'src', dir)
const PACKAGE_VERSION = require('../package.json').version

module.exports = {
  entry: {
    popup: resolve('./popup'),
    tab: resolve('./tab'),
    options: resolve('./options'),
    content: resolve('./content'),
    background: resolve('./background'),
    inject: resolve('./inject')
  },
  output: {
    path: path.join(rootDir, 'dist'),
    publicPath: '/',
    filename: 'js/[name].js',
    chunkFilename: 'js/[id].[name].js?[hash]',
    library: '[name]'
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src')
    }
  },
  module: {
    rules: [{
      test: /\.(js|vue)$/,
      loader: 'eslint-loader',
      enforce: 'pre',
      include: [ path.join(rootDir, 'src') ],
      options: { formatter: require('eslint-friendly-formatter') }
    }, {
      test: /\.vue$/,
      loader: 'vue-loader',
      options: {
        extractCSS: true,
        loaders: {
          ...cssLoaders(),
          js: { loader: 'babel-loader' }
        },
        transformToRequire: {
          video: 'src',
          source: 'src',
          img: 'src',
          image: 'xlink:href'
        }
      }
    }, {
      test: /\.js$/,
      loader: 'babel-loader',
      include: [
        path.join(rootDir, 'src'),
        // https://github.com/sagalbot/vue-select/issues/71#issuecomment-229453096
        path.join(rootDir, 'node_modules', 'element-ui', 'src', 'utils')
      ]
    }, {
      test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
      loader: 'url-loader',
      options: {
        limit: 10000,
        name: 'assets/img/[name].[ext]'
      }
    }, {
      test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
      loader: 'url-loader',
      options: {
        limit: 10000,
        name: 'media/[name].[hash:7].[ext]'
      }
    }, {
      test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
      loader: 'url-loader',
      options: {
        limit: 10000,
        name: 'fonts/[name].[hash:7].[ext]'
      }
    }]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'CLIENT_ID': JSON.stringify(process.env.CLIENT_ID),
        'CLIENT_SECRET': JSON.stringify(process.env.CLIENT_SECRET),
        'PACKAGE_VERSION': JSON.stringify(PACKAGE_VERSION)
      }
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
    }),
    new CopyWebpackPlugin(
      [{
        from: path.join(__dirname, '../src', 'assets', 'css', '*'),
        to: path.join(__dirname, '../dist'),
        context: 'src'
      },
      {
        from: path.join(__dirname, '../src', 'assets', 'webfonts', '*'),
        to: path.join(__dirname, '../dist'),
        context: 'src'
      }]
    ),
    new CleanWebpackPlugin(['*'], { root: path.join(rootDir, 'dist') }),
    // Customize your extension structure.
    htmlPage('home', 'app', ['vendor', 'tab']),
    htmlPage('popup', 'popup', ['vendor', 'popup']),
    htmlPage('options', 'options', ['vendor', 'options']),
    htmlPage('background', 'background', ['vendor', 'background']),
    // End customize
    new CopyWebpackPlugin([{ from: path.join(rootDir, 'static') }]),
    new ChromeReloadPlugin({
      port: 9090,
      manifest: path.join(rootDir, 'src', 'manifest.js')
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module) {
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            path.join(__dirname, '../node_modules')
          ) === 0
        )
      }
    })
  ],
  performance: { hints: false }
}
