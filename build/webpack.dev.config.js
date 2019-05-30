const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.config')
const webpack = require('webpack')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')
const path = require('path')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

const devWebpackConfig = merge(baseWebpackConfig, {
  mode: 'development',

  output: {
    filename: 'static/js/[name].[hash].js',
    chunkFilename: 'static/js/[id].[hash].js',
    publicPath: 'http://localhost:8080/'
  },

  devtool: 'inline-source-map',

  devServer: {
    port: 8080,
    headers: { 'Access-Control-Allow-Origin': '*' },
    contentBase: false,
    historyApiFallback: {
      rewrites: [
        { from: /.*/, to: '/index.html' },
      ],
    },
    hot: true,
    quiet: true
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'postcss-loader'
        ]
      },
      {
        test: /\.styl(us)?$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'postcss-loader',
          'stylus-loader'
        ]
      }
    ]
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new FriendlyErrorsWebpackPlugin({
      compilationSuccessInfo: {
        messages: ['You application is running here http://localhost:8080'],
        notes: ['Some additionnal notes to be displayed unpon successful compilation']
      },
      clearConsole: true
    }),
    new HtmlWebpackPlugin({
      template: 'index.html'
    }),
    new AddAssetHtmlPlugin({
      filepath: resolve('static/js/*.js'),
    }),
    new VueSSRClientPlugin()
  ]
})

module.exports = devWebpackConfig
