// 引入字符串变量
import * as types from './mutation-type'

const mutations = {
    // 是否登录
    [types.LOGIN_STATUS](state, loginStatus) {
        state.loginStatus = loginStatus
    },
    // 用户信息
    [types.USER_INFO](state, userInfo) {
        state.userInfo = userInfo
    },
    // 播放状态
    [types.PLAYING_STATUS](state, flag) {
        state.playing = flag
    },
    // 播放索引
    [types.CURRENT_INDEX](state, index) {
        state.currentIndex = index
    },
    // 设置播放模式
    [types.PLAY_MODE](state, mode) {
        state.mode = mode
    },
    // 顺序播放
    [types.SEQUENCE_LIST](state, list) {
        state.sequenceList = list
    },
    // 播放列表
    [types.PLAY_LIST](state, list) {
        state.playList = list
    },
    // 获取歌手信息
    [types.SINGER](state, singer) {
        state.singer = singer
    },

    // 播放历史记录
    [types.HISTORY_LIST](state, list) {
        state.historyList = list
    },

    // 搜索历史记录
    [types.SEARCH_HISTORY](state, history) {
        state.searchHistory = history
    }
}

export default mutations