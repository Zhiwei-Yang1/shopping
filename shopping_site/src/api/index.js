import axios from 'axios'

axios.interceptors.response.use((response) => {
    if (response.data.code === 1000) {
        window.location = '/login'
    }

    return response.data
})

// 注册接口
export const reqRegister = (user) => axios({ method: 'post', url: '/user/register', data: user })
// 登陆接口
export const reqLogin = (data) => axios({ method: 'post', url: '/user/login', data })

export const getUserInfo = () => axios({ method: 'get', url: '/user/info' })

export const searchUser = (params) => axios({ method: 'get', url: '/user/search', params })

export const updateUser = (user) => axios({ method: 'post', url: '/user/update', data: user })

export const deleteUser = (userid) => axios({ method: 'get', url: '/user/delete', params: { userid } })

//订单
export const createOrder = (order) => axios({ method: 'post', url: '/order/create', data: order })

export const updateOrder = (order) => axios({ method: 'post', url: '/order/update', data: order })

export const deleteOrder = (orderid) => axios({ method: 'get', url: '/order/delete', params: { orderid } })

export const searchOrder = (params) => axios({ method: 'get', url: '/order/get', params })

// hotel
export const getHotels = () => axios({ method: 'get', url: "/hotel/get" })

// room
export const getRooms = (data) => axios({ method: 'post', url: "/room/get", data })


window.__init__hotel__ = () => axios({ method: 'get', url: '/hotel/init' })
window.__init__room__ = () => axios({ method: 'get', url: '/room/init' })