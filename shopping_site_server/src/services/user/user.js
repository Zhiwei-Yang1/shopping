const md5 = require('md5')
const { pickBy, isNil } = require('lodash')

class User {
  constructor(router, session, storage) {
    this.router = router
    this.session = session
    this.storage = storage
    this.router.register('get', '/user/info', this.getUserInfo.bind(this))
    this.router.register('post', '/user/login', this.login.bind(this))
    this.router.register('post', '/user/register', this.register.bind(this))
    this.router.register('get', '/user/search', this.search.bind(this))
    this.router.register('post', '/user/update', this.update.bind(this))
    this.router.register('get', '/user/delete', this.deleteUser.bind(this))
  }
  async deleteUser(ctx) {
    const query = ctx.request.query

    const { userid } = query

    if (userid === ctx.session.user.userid) {
      ctx.body = { code: 1, messaeg: '不能删除自己' }
    } else {
      await this.storage.user.destroy({ where: { userid } })
      ctx.body = { code: 0, messaeg: '操作成功' }
    }

  }

  async update(ctx, next) {
    const body = ctx.request.body

    const { username, password, isAdmin, email, phone, userid } = body

    if (userid) {
      const user = await this.storage.user.findOne({ where: { userid } })

      if (user) {
        await this.storage.user.update({ username, password, isAdmin, email, phone }, {
          where: {
            userid
          }
        })
      } else {
        await this.create({ username, password: md5(password), isAdmin, email, phone })
      }
    } else {
      await this.create({ username, password: md5(password), isAdmin, email, phone })
    }

    ctx.body = { code: 0, message: '更新成功！' }
  }

  async search(ctx, next) {
    const query = ctx.query

    const { id, username } = query
    const condition = { where: pickBy({ userid: id, username }, (value) => !isNil(value) && value !== '') }

    const list = await this.storage.user.findAll(condition)

    const body = { code: 0, data: list.map(user => user.dataValues) }

    ctx.body = body
  }

  async register(ctx, next) {
    const body = ctx.request.body

    const { username, password, isAdmin, email, phone } = body

    const user = await this.storage.user.findOne({ where: { username } })

    if (!user) {

      await this.create({ username, password: md5(password), isAdmin, email, phone })
      await next()

      ctx.body = { code: 0, message: '注册成功！' }
    } else {
      await next()

      ctx.body = { code: 1, message: '当前账号已被注册' }
    }

  }

  async create(user) {
    return this.storage.user.create(user)
  }

  getUserInfo(ctx, next) {
    if (!this.session.isNew(ctx)) {
      const user = ctx.session.user
      const body = user

      ctx.body = body
    } else {
      next()
    }
  }

  async login(ctx) {
    const body = ctx.request.body

    const { username, password } = body

    const user = await this.storage.user.findOne({ where: { username } })

    if (!user) {
      ctx.body = { code: 1, message: '用户不存在' }
    } else {
      if (user.dataValues.password === md5(password)) {
        const data = user.dataValues

        ctx.session.user = data
        ctx.status = 200
        ctx.body = { code: 0, data: data }
      } else {
        ctx.body = { code: 1, message: '账号或密码错误' }
      }

    }
  }


}

exports.User = User