class Hotel {
  constructor(router, session, storage) {
    this.router = router
    this.session = session
    this.storage = storage

    this.router.register('get', '/hotel/get', this.getHotel.bind(this))
    this.router.register('get', '/hotel/init', this.init.bind(this))
  }

  async getHotel(ctx, next) {
    const hotels = await this.storage.hotel.findAll()

    const data = hotels.map(hotel => {
      const value = hotel.dataValues

      value.label = value.label.split(';')
      return value
    })



    ctx.body = { code: 0, data }
  }

  async init(ctx) {
    const initData = [
      {
        image: 'https://dimg04.c-ctrip.com/images/0202r12000ac7t5ec4523_R_600_400_R5_D.jpg',
        name: '零点依九酒店(上海火车站店)',
        address: '上海火车站地区 | 距市中心直线2.9公里',
        distance: 2.9,
        label: ['免费停车', '健身室', '行李寄存', '会议厅', '快速入住', '退房闪住'].join(';'),
        comment: '不错',
        comments_num: 594,
        score: 4.5,
        price_old: 539,
        price_new: 394,
        preference: '铂金贵宾价 | 门店首单 三折优惠145',
        star: 3,
        like: 1,
      },
      {
        image: 'https://dimg04.c-ctrip.com/images/0202r12000ac7t5ec4523_R_600_400_R5_D.jpg',
        name: '上海吉臣维景酒店',
        address: '静安寺/南京西路 | 距市中心直线4.2公里',
        distance: 4.2,
        label: ['免费停车', '健身室', '酒吧', '咖啡厅', '行李寄存', '商务中心', '会议室', '闪住'].join(';'),
        comment: '很好',
        comments_num: 4569,
        score: 4.7,
        price_old: 628,
        price_new: 397,
        preference: '铂金贵宾价 | 超级周末3项 优惠231',
        star: 4,
        like: 2
      },
      {
        image: 'https://dimg04.c-ctrip.com/images/0202r12000ac7t5ec4523_R_600_400_R5_D.jpg',
        name: '唯庭世纪酒店(上海火车站南广场)',
        address: '上海火车站地区 | 距市中心直线2.8公里',
        distance: 2.8,
        label: ['免费停车', '健身室', '酒吧', '咖啡厅', '行李寄存', '商务中心', '会议室', '闪住'].join(';'),
        comment: '很好',
        comments_num: 2109,
        score: 4.7,
        price_old: 418,
        price_new: 408,
        preference: '铂金贵宾价 | 超级周末3项 优惠231',
        star: 4,
        like: 2
      },
      {
        image: 'https://dimg04.c-ctrip.com/images/1mc6h12000awrvbbrE40B_R_600_400_R5_D.jpg',
        name: '上海浦东机场川沙CitiGO欢阁酒店',
        address: '上海火车站地区 | 距市中心直线3.6公里',
        distance: 3.6,
        label: ['免费停车', '健身室', '酒吧', '咖啡厅', '行李寄存', '商务中心', '会议室', '闪住'].join(';'),
        comment: '超棒',
        comments_num: 3335,
        score: 4.9,
        price_old: 352,
        price_new: 330,
        preference: '铂金贵宾价 | 超级周末3项 优惠231',
        star: 4,
        like: 1
      },
      {
        image: 'https://dimg04.c-ctrip.com/images/0202r12000a5mlrkw605A_R_600_400_R5_D.jpg',
        name: '原舍青荚民宿(浦东星火店)',
        address: '上海火车站地区 | 距市中心直线2.4公里',
        distance: 2.4,
        label: ['免费停车', '健身室', '酒吧', '咖啡厅', '行李寄存', '商务中心', '会议室', '闪住'].join(';'),
        comment: '超棒',
        comments_num: 42,
        score: 5.0,
        price_old: 539,
        price_new: 394,
        preference: '铂金贵宾价 | 超级周末3项 优惠145',
        star: 4,
        like: 1
      },
      {
        image: 'https://dimg04.c-ctrip.com/images/0204h12000958dysc0098_R_600_400_R5_D.jpg',
        name: '花筑奢·上海顾村度假庄园',
        address: '上海火车站地区 | 距市中心直线8公里',
        distance: 8,
        label: ['免费停车', '健身室', '酒吧', '咖啡厅', '行李寄存', '商务中心', '会议室', '闪住'].join(';'),
        comment: '好',
        comments_num: 562,
        score: 4.6,
        price_old: 666,
        price_new: 399,
        preference: '铂金贵宾价 | 超级周末3项 优惠231',
        star: 4,
        like: 1
      },
      {
        image: 'https://dimg04.c-ctrip.com/images/02020120008a4qty8F521_R_600_400_R5_D.jpg',
        name: '上海瑞廷西郊S酒店',
        address: '上海火车站地区 | 距市中心直线6.1公里',
        distance: 6.1,
        label: ['免费停车', '健身室', '酒吧', '咖啡厅', '行李寄存', '商务中心', '会议室', '闪住'].join(';'),
        comment: '好',
        comments_num: 2343,
        score: 4.7,
        price_old: 620,
        price_new: 589,
        preference: '铂金贵宾价 | 超级周末3项 优惠231',
        star: 4,
        like: 1
      },
      {
        image: 'https://dimg04.c-ctrip.com/images/20030k000000ce6b07B86_R_600_400_R5_D.jpg',
        name: '锦江之星风尚(上海浦东机场镇店)',
        address: '浦东机场 | 距市中心直线26.3公里',
        distance: 26.3,
        label: ['免费停车', '健身室', '酒吧', '咖啡厅', '行李寄存', '商务中心', '会议室', '闪住'].join(';'),
        comment: '很好',
        comments_num: 2709,
        score: 4.7,
        price_old: 332,
        price_new: 215,
        preference: '铂金贵宾价 | 超级周末3项 优惠117',
        star: 3,
        like: 1
      },
      {
        image: 'https://dimg04.c-ctrip.com/images/0204h12000958dysc0098_R_600_400_R5_D.jpg',
        name: '零点依精致酒店(上海静安大融城店)',
        address: '大宁国际 | 距市中心直线7公里',
        distance: 7,
        label: ['免费停车', '健身室', '酒吧', '咖啡厅', '行李寄存', '商务中心', '会议室', '闪住'].join(';'),
        comment: '好',
        comments_num: 61,
        score: 4.6,
        price_old: 359,
        price_new: 297,
        preference: '铂金贵宾价 | 超级周末3项 优惠62',
        star: 3,
        like: 1
      }
    ]



    await this.storage.hotel.destroy({
      truncate: true
    });

    for (let hotel of initData) {
      await this.storage.hotel.create(hotel)
    }

    ctx.body = { code: 0, message: '' }
  }

}

exports.Hotel = Hotel