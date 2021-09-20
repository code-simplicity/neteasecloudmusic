// state
const state = () => ({
    // 歌手信息
    singer: {},
})

// getters
const getters = {
    // 歌手信息
    singer: (state) => {
        state.singer
    }
}

// actions 
const actions = {

}

// mutations
const mutations = {
    // 获取歌手信息
    SINGER(state, singer) {
        state.singer = singer
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