const path = require('path')
const Koa = require('koa')
const koaStatic = require('koa-static')

const app = new Koa()

const isProd = process.env.NODE_ENV === 'production'

let ssrRouter
if (isProd) {
  ssrRouter = require('./router/ssr')
} else {
  ssrRouter = require('./router/dev-ssr')
}

app.use(koaStatic(path.join(__dirname, '../dist/')))
app.use(ssrRouter.routes()).use(ssrRouter.allowedMethods())

app.listen(3000)
