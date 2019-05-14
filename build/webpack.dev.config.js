const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.config')
const webpack = require('webpack')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')

const devWebpackConfig = merge(baseWebpackConfig, {
  mode: 'development',
  output: {
    filename: 'static/js/[name].[hash].js',
    chunkFilename: 'static/js/[id].[hash].js',
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: false,
    historyApiFallback: {
      rewrites: [
        { from: /.*/, to: '/index.html' },
      ],
    },
    hot: true,
    quiet: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new FriendlyErrorsWebpackPlugin({
      compilationSuccessInfo: {
        messages: ['You application is running here http://localhost:8080'],
        notes: ['Some additionnal notes to be displayed unpon successful compilation']
      },
      clearConsole: true
    })
  ]
})

module.exports = devWebpackConfig
