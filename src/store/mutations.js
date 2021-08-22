// 引入字符串变量
import {
    LOGIN_STATUS,
    USER_INFO,
    PALYING,
    CURRENT_INDEX
} from './mutation-type'

const mutations = {
    // 是否登录
    [LOGIN_STATUS](state, {loginStatus}) {
        state.loginStatus = loginStatus
    },
    // 用户信息
    [USER_INFO](state, {userInfo}) {
        state.userInfo = userInfo
    },
    // 播放状态
    [PALYING](state, {flag}) {
        state.playing = flag
    },
    // 播放索引
    [CURRENT_INDEX](state, {index}) {
        state.currentIndex = index
    }
}

export default mutations