const path = require('path')
const workboxPlugin = require('workbox-webpack-plugin')
const AutoDllPlugin = require('autodll-webpack-plugin')
const webpack = require('webpack')

function resolve (dir) {
  return path.join(__dirname, dir)
}

const workboxOptions = {
  swSrc: resolve('src/sw/serviceWorker.js'),
  swDest: 'serviceWorker.js',
  importWorkboxFrom: 'disabled',
  exclude: [/^workbox/, /\.html/, /\.map$/]
}

module.exports = {
  devServer: {
    host: '0.0.0.0',
    port: 8080,
    historyApiFallback: {
      rewrites: [
        { from: /.*/, to: '/index.html' }
      ]
    },
    proxy: {
      '/api': {
        target: 'http://localhost:4000/',
        pathRewrite: { '^/api': '' },
        changeOrigin: true,
        secure: false
      }
    }
  },
  configureWebpack: (config) => {
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
      new webpack.ProvidePlugin({
        'mapState':     ['vuex', 'mapState'],
        'mapMutations': ['vuex', 'mapMutations'],
        'mapActions': ['vuex', 'mapActions']
      })
    )
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

    config.module
      .rule('vue')
      .uses.delete('cache-loader')

    config.module
      .rule('vue')
      .use('vue-loader')
        .loader('vue-loader')
        .tap(options => {
          options = {}
          return options
        })

    // console.log(process.env.VUE_CLI_MODERN_BUILD)
    config.plugins.has('copy') &&
    config
      .plugin('copy')
      .tap(args => {
        args[0][0].ignore = process.env.NODE_ENV === 'production' ? ['*.dev.*'] : ['*.prod.*']
        return args
      })
  }
}
