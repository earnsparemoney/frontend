const Router = require('koa-router')
const { createBundleRenderer } = require('vue-server-renderer')
const {
  resolve,
  getClearClientManifest
} = require('../utils/utils')
const template = require('fs').readFileSync(resolve('../../public/index.html'), 'utf-8')
const serverBundle = require(resolve('../../dist/server-build/vue-ssr-server-bundle.json'))
const clientManifest = require(resolve('../../dist/vue-ssr-client-manifest.json'))

getClearClientManifest(clientManifest)
const renderer = createBundleRenderer(serverBundle, {
  runInNewContext: false,
  template,
  clientManifest
})
const ssrRouter = new Router()

ssrRouter.get('*', async (ctx, next) => {
  const context = { url: ctx.req.url }
  const html = await renderer.renderToString(context)
  ctx.body = html
  await next()
})

module.exports = ssrRouter