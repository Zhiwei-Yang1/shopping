const { pickBy, isNil } = require("lodash")
const { Op } = require("sequelize")

class Room {
  constructor(router, session, storage) {
    this.router = router
    this.session = session
    this.storage = storage

    this.router.register('post', '/room/get', this.getRoom.bind(this))
    this.router.register('get', '/room/init', this.init.bind(this))
  }

  getBooleanValueOrUndefined(key, value) {
    if (key === value) {
      return true
    }
    return undefined
  }

  async getRoom(ctx) {
    const body = ctx.request.body
    const {
      hotelid,
      room_type,
      rooms,
      room,
      price,
      breakfast,
      service,
      paytype,
      easy,
      wifi
    } = body


    const condition = pickBy({
      hotelid: hotelid ? Number(hotelid) : '',
      big_bed_room: this.getBooleanValueOrUndefined(room_type, 'big_bed_room'),
      rooms: this.getBooleanValueOrUndefined(rooms, 'rooms'),
      computer: this.getBooleanValueOrUndefined(room, 'computer'),
      balcony: this.getBooleanValueOrUndefined(room, 'balcony'),
      bathtub: this.getBooleanValueOrUndefined(room, 'bathtub'),
      intelligence_toilet: this.getBooleanValueOrUndefined(room, 'intelligence_toilet'),
      wifi: this.getBooleanValueOrUndefined(wifi, 'wifi'),
      breakfast: this.getBooleanValueOrUndefined(breakfast, 'breakfast'),
      double_breakfast: this.getBooleanValueOrUndefined(breakfast, 'double_breakfast'),
      washer: this.getBooleanValueOrUndefined(room, 'washer'),
      air_condition: this.getBooleanValueOrUndefined(room, 'washer'),
      paytype: paytype ? Number(paytype) : '',
      easy: easy ? Number(easy) : '',
      price: price ? { [Op.between]: JSON.parse(price) } : '',
      service: service ? Number(service) : ''

    }, (value) => !isNil(value) && value !== '')


    const result = await this.storage.room.findAll({ where: condition })

    let result_rooms = {}

    for (let roomValues of result) {
      let room = roomValues.dataValues

      const exist = result_rooms[room.roomid] || {
        roomid: room.roomid,
        name: room.name,
        breakfast: room.breakfast,
        address: room.address,
        bed: room.bed,
        area: room.area,
        price: room.price,
        smook: room.smook,
        image: room.image,
        items: []
      }

      exist.items.push({
        name: room.name,
        address: room.address,
        bed: room.bed,
        area: room.area,
        price: room.price,
        smook: room.smook,
        image: room.image
      })

      result_rooms[room.roomid] = exist
    }



    ctx.body = { code: 0, data: Object.values(result_rooms) }
  }

  async init(ctx) {
    const hotels = await this.storage.hotel.findAll()

    const initData = [
      {
        name: '欢享大床房',
        address: '中国，上海，徐汇区，广元西路319号',
        bed: '一张1.8米大床',
        area: '23m',
        big_bed_room: true,
        washer: true,
        computer: true,
        air_condition: true,
        intelligence_toilet: false,
        breakfast: false,
        double_breakfast: false,
        service: 1,
        paytype: 1,
        easy: true,
        wifi: true,
        rooms: false,
        balcony: false,
        bathtub: false,
        window: true,
        smook: true,
        price: 450,
        roomid: 1,
        image: '',
      }, {
        name: '欢享大床房',
        address: '中国，上海，徐汇区，广元西路319号',
        bed: '一张1.8米大床',
        area: '23m',
        big_bed_room: true,
        washer: true,
        computer: true,
        air_condition: true,
        intelligence_toilet: false,
        breakfast: true,
        double_breakfast: false,
        paytype: 1,
        service: 1,
        easy: true,
        wifi: true,
        rooms: false,
        balcony: false,
        bathtub: false,
        window: true,
        smook: true,
        price: 500,
        roomid: 1,
        image: '',
      }, {
        name: '套房大床房',
        address: '中国，上海，徐汇区，广元西路319号',
        bed: '一张1.8米大床',
        area: '23m',
        big_bed_room: true,
        washer: true,
        computer: true,
        air_condition: true,
        intelligence_toilet: false,
        breakfast: false,
        double_breakfast: false,
        paytype: 1,
        service: 1,
        easy: true,
        wifi: true,
        rooms: true,
        balcony: false,
        bathtub: false,
        window: true,
        smook: true,
        price: 450,
        roomid: 2,
        image: '',
      }, {
        name: '套房大床房',
        address: '中国，上海，徐汇区，广元西路319号',
        bed: '一张1.8米大床',
        area: '23m',
        big_bed_room: true,
        washer: true,
        computer: true,
        air_condition: true,
        intelligence_toilet: false,
        breakfast: true,
        double_breakfast: false,
        paytype: 1,
        service: 1,
        easy: true,
        wifi: true,
        rooms: true,
        balcony: false,
        bathtub: false,
        window: true,
        smook: true,
        price: 500,
        roomid: 2,
        image: '',
      },

    ]

    await this.storage.room.destroy({
      truncate: true
    });

    for (let hotel of hotels) {
      const { hotelid } = hotel.dataValues

      for (let room of initData) {
        room.hotelid = hotelid

        console.log(room)

        await this.storage.room.create(room)
      }
    }

    ctx.body = { code: 0, message: '' }
  }


}

exports.Room = Room