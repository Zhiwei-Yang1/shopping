const session = require('koa-session')

const CONFIG = {
  key: 'token',
  maxAge: 86400000,
  autoCommit: true,
  overwrite: true,
  httpOnly: false,
  signed: true,
  rolling: false,
  renew: false,
  secure: false,
  sameSite: null,
};



class Session {
  constructor() {

  }

  isNew(ctx) {
    if (ctx.session.isNew) {
      ctx.status = 200
      ctx.body = { code: 1000, message: '用户未登录' }
      return true
    }

    return false
  }

  install(app) {
    app.keys = ['akljhdfiiu1230497lkjhds782r']
    app.use(session(CONFIG, app))
  }
}

exports.Session = Session