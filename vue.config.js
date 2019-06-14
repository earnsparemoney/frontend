const path = require('path')
const workboxPlugin = require('workbox-webpack-plugin')
const AutoDllPlugin = require('autodll-webpack-plugin')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')
const nodeExternals = require('webpack-node-externals')

function resolve (dir) {
  return path.join(__dirname, dir)
}

const serverSide = process.env.BUILD_TARGET === 'server'

const workboxOptions = {
  swSrc: resolve('src/sw/serviceWorker.js'),
  swDest: 'serviceWorker.js',
  importWorkboxFrom: 'disabled',
  exclude: [/^workbox/, /index\.html/, /\.map$/]
}

module.exports = {
  outputDir: serverSide ? resolve('dist/server-build') : resolve('dist'),
  publicPath: process.env.NODE_ENV === 'production' ? '/' : 'http://localhost:8080/',
  css: {
    extract: serverSide || process.env.NODE_ENV !== 'production' ? false : true
  },
  devServer: {
    port: 8080,
    headers: { 'Access-Control-Allow-Origin': '*' },
    historyApiFallback: {
      rewrites: [
        { from: /.*/, to: '/index.html' }
      ]
    }
  },
  configureWebpack: (config) => {
    if (!serverSide) {
      config.entry.app = resolve('src/entry-client.js')
      config.plugins.push(
        new AutoDllPlugin({
          inject: true,
          debug: true,
          filename: '[name].[hash].js',
          path: './dll',
          entry: {
            vendor: [
              'vue/dist/vue.esm.js',
              'vuex',
              'vue-router',
              'axios'
            ]
          }
        })
      )
      config.plugins.push(
        new workboxPlugin.InjectManifest(workboxOptions)
      )
      config.plugins.push(
        new VueSSRClientPlugin()
      )
    } else {
      config.entry.app = resolve('src/entry-server.js')
      config.target = 'node',
      config.output.libraryTarget = 'commonjs2'
      config.externals = nodeExternals({
        whitelist: /ant-design-vue\/lib\/(.)+\/style\/css/
      })
      config.optimization = {
        splitChunks: undefined
      }
      config.plugins.push(
        new VueSSRServerPlugin()
      )
    }
  },
  chainWebpack: (config) => {
    if (process.env.NODE_ENV !== 'production') {
      config.output
        .set('filename', 'static/js/[name].[hash].js')
        .set('chunkFilename', 'static/js/[name].[hash].js')
    }

    config.resolve.alias
      .set('vue$', 'vue/dist/vue.esm.js')
      .set('@', resolve('src'))
      .set('styles', resolve('src/assets/styles'))
      .set('utils', resolve('src/utils'))
      .set('@ant-design/icons/lib/dist$', resolve('src/utils/antdIcon.js'))

    config
      .plugin('copy')
      .tap(args => {
        if (serverSide) {
          args[0][0].ignore = ['*workbox*']
        } else {
          args[0][0].ignore = process.env.NODE_ENV === 'production' ? ['*.dev.*'] : ['*.prod.*']
        }
        return args
      })
  }
}
