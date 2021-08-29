// 引入字符串变量
import {
    LOGIN_STATUS,
    USER_INFO,
    PLAYING_STATUS,
    CURRENT_INDEX,
    PLAY_MODE,
    SEQUENCE_LIST,
    PLAY_LIST,
    SINGER_INFO
} from './mutation-type'

const mutations = {
    // 是否登录
    [LOGIN_STATUS](state, loginStatus) {
        state.loginStatus = loginStatus
    },
    // 用户信息
    [USER_INFO](state, userInfo) {
        state.userInfo = userInfo
    },
    // 播放状态
    [PLAYING_STATUS](state, flag) {
        state.playing = flag
    },
    // 播放索引
    [CURRENT_INDEX](state, index) {
        state.currentIndex = index
    },
    // 设置播放模式
    [PLAY_MODE](state, mode) {
        state.mode = mode
    },
    // 顺序播放
    [SEQUENCE_LIST](state, list) {
        state.sequenceList = list
    },
    // 播放列表
    [PLAY_LIST](state, list) {
        state.playList = list
    },
    // 获取歌手信息
    [SINGER_INFO](state, singer) {
        state.singerInfo = singer
    }
}

export default mutations