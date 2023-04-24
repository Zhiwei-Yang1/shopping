export const navItems = [
  { label: '房间', key: 'room' },
  { label: '政策', key: 'policy' }
];

export const roomItems = [
  {
    label: '房型',
    name: 'room_type',
    options: [{ label: '大床房', value: 'big_bed_room' }]
  },
  {
    label: '特色房型',
    name: 'rooms',
    options: [{ label: '套房', value: 'rooms' }]
  },
  {
    label: '客房设施',
    name: 'room',
    options: [
      { label: '洗衣机', value: 'washer' },
      { label: '电脑', value: 'computer' },
      { label: '阳台', value: 'balcony' },
      { label: '空调', value: 'air_condition' },
      { label: '智能马桶', value: 'intelligence_toilet' },
      { label: '浴缸', value: 'bathtub' },
    ]
  },
  {
    label: '价格范围',
    name: 'price',
    options: [
      { value: '[0, 150]', label: '￥150以下' },
      { value: '[150, 300]', label: '￥150 -￥300' },
      { value: '[300, 450]', label: '￥300 -￥450' },
      { value: '[450, 600]', label: '￥450 -￥600' },
      { value: '[600, 750]', label: '￥600-￥750' },
      { value: '[750, 900]', label: '￥750-￥900' }
    ]
  },
  {
    label: '早餐',
    name: 'breakfast',
    options: [
      { value: 'breakfast', label: '有早餐' },
      { value: 'double_breakfast', label: '双份早餐' }
    ]
  },
  {
    label: '携程服务',
    name: 'service',
    options: [
      { value: 1, label: '立即确认' },
      { value: 2, label: '可订' }
    ]
  },
  {
    label: '支付方式',
    name: 'paytype',
    options: [
      { value: 1, label: '在线支付' },
      { value: 2, label: '到店支付' },
      { value: 3, label: '闪住' }
    ]
  },
  {
    label: 'EASY住',
    name: 'easy',
    options: [
      { label: '预约开票', value: 1 },
      { label: '酒店开票', value: 2 }
    ]
  },
  {
    label: '宽带',
    name: 'wifi',
    options: [{ label: '免费Wifi上网', value: true }]
  }
];
