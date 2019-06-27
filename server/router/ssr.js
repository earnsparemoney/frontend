const Router = require('koa-router')
const { createBundleRenderer } = require('vue-server-renderer')
const {
  resolve,
  getClearClientManifest,
  isModernBrowser
} = require('../utils/utils')
const template = require('fs').readFileSync(resolve('../../public/index-server.html'), 'utf-8')
const serverBundle = require(resolve('../../dist/vue-ssr-server-bundle.json'))
const clientManifest = require(resolve('../../dist/vue-ssr-client-manifest.json'))
const clientManifestLegacy = require(resolve('../../dist/vue-ssr-client-manifest-legacy.json'))

getClearClientManifest(clientManifest)
getClearClientManifest(clientManifestLegacy)

const ssrRouter = new Router()

ssrRouter.get('/', async (ctx, next) => {
  const ua = ctx.headers['user-agent']
  let renderer
  if (isModernBrowser(ua)) {
    renderer = createBundleRenderer(serverBundle, {
      runInNewContext: false,
      template,
      clientManifest
    })
  } else {
    renderer = createBundleRenderer(serverBundle, {
      runInNewContext: false,
      template,
      clientManifest: clientManifestLegacy
    })
  }
  console.log(ctx.req.url)
  const context = { url: ctx.req.url, ua }
  const html = await renderer.renderToString(context)
  ctx.body = html
  await next()
})

module.exports = ssrRouter
