// 引入字符串变量
import {
    LOGIN_STATUS,
    USER_INFO
} from './mutation-type'

const mutations = {
    // 是否登录
    [LOGIN_STATUS](state, {
        loginStatus
    }) {
        state.loginStatus = loginStatus

    },
    // 用户信息
    [USER_INFO](state, {
        userInfo
    }) {
        state.userInfo = userInfo
    }
}

export default mutations