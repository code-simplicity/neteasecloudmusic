// 登录状态
export const loginStatus = state => {
    return (
        state.loginStatus || JSON.parse(window.localStorage.getItem('loginStatus'))
    )
}

// 用户信息
export const userInfo = state => {
    return (state.userInfo || JSON.parse(window.localStorage.getItem('userInfo')))
}

// 当前播放状态
export const playing = state => state.playing

// 当前的索引值
export const currentIndex = state => state.currentIndex

// 歌手信息
export const singerInfo = state => state.singerInfo

// 播放列表
export const playList = state => state.playList

// 顺序播放
export const sequenceList = state => state.sequenceList

// 当前播放模式(循环，单曲，随机)
export const mode = state => state.mode

// 当前播放的歌曲
export const currentSong = state => {
    return state.playList[state.currentIndex] || {}
}

// 播放历史记录
export const historyList = (state) => {
    return state.historyList
}