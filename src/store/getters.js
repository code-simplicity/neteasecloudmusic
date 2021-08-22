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