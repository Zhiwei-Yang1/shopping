const { Sequelize, DataTypes } = require('sequelize')


class Storage {
  sequelize = new Sequelize('shopping', 'root', '123456', {
    host: 'localhost',
    dialect: 'mysql',
    logging: console.log
  })


  init() {
    this.user = this.sequelize.define('user', {
      username: DataTypes.STRING,
      password: DataTypes.STRING,
      userid: { primaryKey: true, autoIncrement: true, type: DataTypes.INTEGER },
      isAdmin: DataTypes.BOOLEAN,
      email: DataTypes.STRING,
      phone: DataTypes.STRING
    })

    this.order = this.sequelize.define('order', {
      orderid: { primaryKey: true, autoIncrement: true, type: DataTypes.INTEGER },
      userid: DataTypes.INTEGER,
      pay_type: DataTypes.INTEGER,
      room_num: DataTypes.INTEGER,
      start_date: DataTypes.STRING,
      end_date: DataTypes.STRING,
      price: DataTypes.INTEGER,
      arrive_at: DataTypes.STRING,
      custom_name: DataTypes.STRING,
      custom_phone: DataTypes.STRING,
      custom_email: DataTypes.STRING,
      address: DataTypes.STRING,
      name: DataTypes.STRING,
      room_name: DataTypes.STRING,
      status: DataTypes.INTEGER
    })

    this.hotel = this.sequelize.define('hotel', {
      hotelid: { primaryKey: true, autoIncrement: true, type: DataTypes.INTEGER },
      name: DataTypes.STRING,
      address: DataTypes.STRING,
      distance: DataTypes.INTEGER,
      comment: DataTypes.STRING,
      comments_num: DataTypes.INTEGER,
      score: DataTypes.INTEGER,
      price_old: DataTypes.INTEGER,
      price_new: DataTypes.INTEGER,
      preference: DataTypes.STRING,
      star: DataTypes.INTEGER,
      like: DataTypes.INTEGER,
      image: DataTypes.STRING,
      label: DataTypes.STRING
    })

    this.room = this.sequelize.define('room', {
      id: { primaryKey: true, autoIncrement: true, type: DataTypes.INTEGER },
      price: DataTypes.INTEGER,
      name: DataTypes.STRING,
      bed: DataTypes.STRING,
      window: DataTypes.BOOLEAN,
      smook: DataTypes.BOOLEAN,
      address: DataTypes.STRING,
      hotelid: DataTypes.INTEGER,
      image: DataTypes.STRING,
      area: DataTypes.STRING,
      roomid: DataTypes.INTEGER,
      big_bad_room: DataTypes.BOOLEAN,
      washer: DataTypes.BOOLEAN,
      computer: DataTypes.BOOLEAN,
      air_condition: DataTypes.BOOLEAN,
      intelligence_toilet: DataTypes.BOOLEAN,
      breakfast: DataTypes.BOOLEAN,
      double_breakfast: DataTypes.BOOLEAN,
      paytype: DataTypes.INTEGER,
      easy: DataTypes.BOOLEAN,
      wifi: DataTypes.BOOLEAN,
      rooms: DataTypes.BOOLEAN,
      balcony: DataTypes.BOOLEAN,
      bathtub: DataTypes.BOOLEAN,
      service: DataTypes.INTEGER
    })

    this.user.sync()
    this.order.sync()
    this.hotel.sync()
    this.room.sync()
  }

  install(app) {
    this.init()

    app.context.storage = this
  }
}

exports.Storage = Storage