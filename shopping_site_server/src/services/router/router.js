const KoaRouter = require('@koa/router')
const cors = require('@koa/cors')
const { koaBody } = require('koa-body')

class Router {
  router = new KoaRouter()

  registry = new Set()

  register(method, path, handler) {
    this.registry.add({ method, path, handler })
  }

  initContributes() {
    for (let route of this.registry) {
      const { method, path, handler } = route

      this.router[method](path, koaBody(), handler)
    }
  }

  install(app) {
    this.initContributes()

    app.use(cors())
    app.use(this.router.routes())
  }
}

exports.Router = Router