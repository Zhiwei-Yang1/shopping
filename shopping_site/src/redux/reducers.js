import { combineReducers } from "redux"
import { AUTH_SUCCESS, ERROR_MSG } from "./action-types"

const initUser = {
    userName: '',
    type: '',
    msg: '', // 错误提示信息
    redirectTo: '' // 需要重定向的路由路径
}

// 产生 user 状态的 reducer
function user(state = initUser, action) {
    switch (action.type) {
        case AUTH_SUCCESS:  // data是user
            return {...action.data, redirectTo: '/home'}
        case ERROR_MSG: // data是msg
            return {...state, msg: action.data}
        default:
            return state
    }
}


export default combineReducers({
    user,

})