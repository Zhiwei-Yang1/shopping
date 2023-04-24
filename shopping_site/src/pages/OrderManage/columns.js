export const columns = [
  {
    title: '订单号',
    dataIndex: 'orderid',
    key: 'orderid',
  }, {
    title: '酒店名',
    dataIndex: 'name',
    key: 'name',
  }, {
    title: '用户名',
    dataIndex: 'custom_name',
    key: 'custom_name',
  }, {
    title: '手机号',
    dataIndex: 'custom_phone',
    key: 'custom_phone',
  }, {
    title: '金额',
    dataIndex: 'price',
    key: 'price',
  }, {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    render: (status) => {
      const map = { 0: '待付款', 1: '待使用', 2: '待评价' }

      return map[status]
    }
  }, {
    title: '房间类型',
    dataIndex: 'room_name',
    key: 'room_name',
  }
]