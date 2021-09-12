import {
    playMode
} from "../utils/playConfig"

import {
    getSearch
} from '@/utils/cache'

// 数据源
const state = {
    //登录状态
    loginStatus: null,

    // 用户信息
    userInfo: null,

    // 歌手信息
    singer: {},

    //播放状态
    playing: false,

    // 播放列表的索引
    currentIndex: -1,

    // 播放列表
    playList: [],

    // 顺序播放列表
    sequenceList: [],

    // 播放模式(循环，单曲，随机)
    mode: playMode.sequence,

    // 播放历史记录列表
    historyList: [],

    // 搜索历史记录
    searchHistory: getSearch(),
}

// 统一暴露
export default state