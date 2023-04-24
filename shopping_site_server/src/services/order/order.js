const { pickBy, isNil } = require('lodash')

class Order {
  constructor(router, session, storage) {
    this.router = router
    this.session = session
    this.storage = storage


    this.router.register('post', '/order/create', this.createOrder.bind(this))
    this.router.register('get', '/order/get', this.getOrders.bind(this))
    this.router.register('post', '/order/update', this.update.bind(this))
    this.router.register('get', '/order/delete', this.deleteOrder.bind(this))
  }

  async update(ctx, next) {
    const body = ctx.request.body

    const {
      pay_type,
      price,
      start_date,
      end_date,
      custom_name,
      room_num,
      address,
      name,
      custom_phone,
      custom_email,
      arrive_at,
      orderid,
      status
    } = body

    const order = await this.storage.order.findOne({ where: { orderid } })

    if (order) {
      const data = pickBy({
        pay_type,
        room_num,
        start_date: start_date ? String(start_date) : '',
        end_date: end_date ? String(end_date) : '',
        price,
        arrive_at,
        custom_name,
        custom_phone,
        custom_email,
        address,
        name,
        status
      }, (data) => !isNil(data) && data !== '')

      await this.storage.order.update(data, { where: { orderid } })

      ctx.body = { code: 0, message: '更新成功' }
    }

  }

  async deleteOrder(ctx) {
    const query = ctx.request.query

    const { orderid } = query

    await this.storage.order.destroy({ where: { orderid } })

    ctx.body = { code: 0, messaeg: '操作成功' }

  }



  async createOrder(ctx, next) {
    const body = ctx.request.body

    const {
      pay_type,
      price,
      start_date,
      end_date,
      custom_name,
      room_num,
      address,
      name,
      custom_phone,
      custom_email,
      arrive_at,
      room_name
    } = body

    const user = ctx.session.user

    const data = pickBy({
      userid: user.userid,
      pay_type,
      room_num,
      start_date: start_date ? String(start_date) : '',
      end_date: end_date ? String(end_date) : '',
      price,
      arrive_at,
      custom_name,
      custom_phone,
      custom_email,
      address,
      name,
      room_name,
      status: 0
    }, (data) => !isNil(data) && data !== '')

    const order = await this.storage.order.create(data)

    ctx.body = { code: 0, data: order }

  }

  async getOrders(ctx) {
    const user = ctx.session.user
    const query = ctx.request.query

    const { orderid, name, username, status } = query

    const condition = pickBy({ orderid, name, username, status }, (value) => !isNil(value) && value !== '')
    const where = { where: { ...condition } }
    let list
    if (user.isAdmin) {
      list = await this.storage.order.findAll(where)
    } else {
      where.where.userid = user.userid
      list = await this.storage.order.findAll(where)
    }

    console.log(list)


    const body = { code: 0, data: list.map(order => order.dataValues) }

    ctx.body = body
  }
}

exports.Order = Order