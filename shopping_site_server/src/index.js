const Koa = require('koa')
const { Session } = require('./services/session/session')
const { Router } = require('./services/router/router')
const { User } = require('./services/user/user')
const { Storage } = require('./services/storage/storage')
const { Order } = require('./services/order/order')
const { Hotel } = require('./services/hotel/hotel')
const { Room } = require('./services/room/room')

class App {
  app = new Koa()

  startUp(port) {
    const session = new Session()
    const router = new Router()
    const storage = new Storage()

    const order = new Order(router, session, storage)
    const user = new User(router, session, storage)
    const hotel = new Hotel(router, session, storage)
    const room = new Room(router, session, storage)

    this.use(session)
    this.use(router)
    this.use(storage)

    this.app.listen(port)
  }

  use(service) {
    service.install(this.app)
  }
}




function main(port = 3000) {
  const app = new App()

  app.startUp(port)
}

main()