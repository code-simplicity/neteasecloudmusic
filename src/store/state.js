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
}

// 统一暴露
export default state