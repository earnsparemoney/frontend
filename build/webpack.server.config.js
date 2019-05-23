const merge = require('webpack-merge')
const nodeExternals = require('webpack-node-externals')
const baseConfig = require('./webpack.base.config.js')
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')
const path = require('path')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = merge(baseConfig, {
  mode: 'production',

  entry: './src/entry-server.js',

  target: 'node',

  devtool: 'source-map',

  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'css-loader',
          'postcss-loader'
        ]
      },
      {
        test: /\.styl(us)?$/,
        use: [
          'css-loader',
          'postcss-loader',
          'stylus-loader'
        ]
      }
    ]
  },

  output: {
    path: resolve('dist/server-build'),
    libraryTarget: 'commonjs2'
  },

  externals: nodeExternals({
    whitelist: /ant-design-vue\/lib\/(.)+\/style\/css/
  }),

  plugins: [
    new VueSSRServerPlugin()
  ]
})
