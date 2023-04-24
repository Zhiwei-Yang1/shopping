export const columns = [
  {
    title: 'id',
    dataIndex: 'userid',
    key: 'useid',
  }, {
    title: '用户名',
    dataIndex: 'username',
    key: 'username',
  }, {
    title: '密码',
    dataIndex: 'password',
    key: 'password',
  }, {
    title: '手机号',
    dataIndex: 'phone',
    key: 'phone',
  }, {
    title: '邮箱',
    dataIndex: 'email',
    key: 'email',
  }, {
    title: '权限',
    dataIndex: 'isAdmin',
    key: 'isAdmin',
    render: (data) => {
      return data ? '管理员' : '普通用户'
    }
  }
]