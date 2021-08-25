import { playMode } from "../utils/playConfig"

// 数据源
const state = {
    //登录状态
    loginStatus: null,

    // 用户信息
    userInfo: null,

    // 歌手信息
    singerInfo: {},

    //播放状态
    playStatus: false,
    
    // 播放列表的索引
    currentIndex: -1,

    // 播放列表
    playList: [],

    // 顺序播放
    sequenceList: [],

    // 播放模式
    mode: playMode.sequence
}

// 统一暴露
export default state