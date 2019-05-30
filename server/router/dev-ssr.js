const axios = require('axios')
const path = require('path')
const MemoryFS = require('memory-fs')
const webpack = require('webpack')
const serverConfig = require('../../build/webpack.server.config')
const Router = require('koa-router')
const { createBundleRenderer } = require('vue-server-renderer')
const { resolve } = require('../utils/utils')

const ssrRouter = new Router()

const template = require('fs').readFileSync(resolve('../../index.html'), 'utf-8')

const serverCompiler = webpack(serverConfig)
const mfs = new MemoryFS()
serverCompiler.outputFileSystem = mfs

let serverBundle
serverCompiler.watch({}, () => {
  const bundlePath = path.join(
    serverConfig.output.path,
    'vue-ssr-server-bundle.json'
  )
  serverBundle = JSON.parse(mfs.readFileSync(bundlePath, 'utf-8'))
  console.log('new bundle generated')
})

ssrRouter.get('*', async ctx => {
  if (!serverBundle) {
    ctx.body = 'wait a minute'
    return
  }
  const context = { url: ctx.req.url }
  const clientManifestResp = await axios.get(
    'http://localhost:8080/vue-ssr-client-manifest.json'
  )
  const clientManifest = clientManifestResp.data
  clientManifest.initial.unshift(clientManifest.async.pop())
  clientManifest.all.unshift(clientManifest.all.pop())
  const renderer = createBundleRenderer(serverBundle, {
    runInNewContext: false,
    template,
    clientManifest
  })

  await new Promise((resolve, reject) => {
    renderer.renderToString(context, (err, html) => {
      ctx.body = html
      resolve()
    })
  })
})

module.exports = ssrRouter
