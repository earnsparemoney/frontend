const path = require('path')
const Koa = require('koa')
const koaStatic = require('koa-static')

const app = new Koa()

const isDev = process.env.NODE_ENV === 'development'

let proxy;
if (isDev) {
  proxy = require('koa-proxy')
  app.use(proxy({
    host: 'http://localhost:8080/',
    match: /^\/serviceWorker\.js/
  }))
}

let ssrRouter
if (!isDev) {
  ssrRouter = require('./router/ssr')
} else {
  ssrRouter = require('./router/dev-ssr')
}
app.use(koaStatic(path.join(__dirname, '../dist/')))
app.use(ssrRouter.routes()).use(ssrRouter.allowedMethods())

app.listen(3000, () => {
  console.log('listen on 3000')
})
