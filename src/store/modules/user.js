// state
const state = () => ({
    //登录状态
    loginStatus: null,

    // 用户信息
    userInfo: null,
})

// getters
const getters = {
    // 获取登录状态
    loginStatus: (state) => {
        return state.loginStatus || JSON.parse(window.localStorage.getItem('loginStatus'))
    },

    // 获取用户信息
    userInfo: (state) => {
        return state.userInfo || JSON.parse(window.localStorage.getItem('userInfo'))
    }
}

// actions 
const actions = {

}

// mutations
const mutations = {
    // 是否登录
    LOGIN_STATUS(state, loginStatus) {
        state.loginStatus = loginStatus
    },
    // 用户信息
    USER_INFO(state, userInfo) {
        state.userInfo = userInfo
    },
}

// 统一暴露
export default {
    // 开启命名空间
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}