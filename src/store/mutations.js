// 引入字符串变量
import {
    LOGIN_STATUS,
    USER_INFO,
    PLAY_STATUS,
    CURRENT_INDEX,
    PLAY_MODE
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
    [PLAY_STATUS](state, {flag}) {
        state.playStatus = flag
    },
    // 播放索引
    [CURRENT_INDEX](state, {index}) {
        state.currentIndex = index
    },
    // 设置播放模式
    [PLAY_MODE](state,{mode}) {
        state.mode = mode
    }
}

export default mutations