import {
    reqLogin,
} from '../api'

import { AUTH_SUCCESS, ERROR_MSG } from './action-types'

// 授权成功的同步 action
const authSuccess = (user) => {
    return {type: AUTH_SUCCESS, data: user}
}

// 错误提示信息的同步 action
const errorMsg = (msg) => {
    return {type: ERROR_MSG, data: msg}
}


// 登陆异步 action
export const login = (user) => {

    const {userName, passWord} = user

    // 表单的前台验证
    if(!userName) {
        return errorMsg('用户名为空！')
        // console.log('用户名为空！');
    } else if(!passWord) {
        return errorMsg('密码为空！')
    }

    return async dispatch => {
        // 发送注册的异步请求
        const response = await reqLogin(user)
        const result = response.data
        if(result.code === 0) {
            dispatch(authSuccess(result.data))
        } else {
            dispatch(errorMsg(result.msg))
        }
    }
}