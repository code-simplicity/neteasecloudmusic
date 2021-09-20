import {
    getSearch
} from '@/utils/cache'
import {
    saveSearch,
    deleteSearch,
    clearSearch,
} from '@/utils/cache'

// state
const state = () => ({
    // 搜索历史记录
    searchHistory: getSearch(),
})

// getters
const getters = {
    // 搜索历史记录
    searchHistory: (state) => {
        return state.searchHistory
    }
}

// actions 
const actions = {
    // 保存搜索历史记录
    saveSearchHistory({
        commit
    }, query) {
        commit('SEARCH_HISTORY', saveSearch(query))
    },

    // 删除一个搜索记录
    deleteSearchHistory({
        commit
    }, query) {
        commit('SEARCH_HISTORY', deleteSearch(query))
    },

    // 清除所有的搜索历史记录
    clearSearchHistory({
        commit
    }) {
        commit('SEARCH_HISTORY', clearSearch())
    },
}

// mutations
const mutations = {
    // 搜索历史记录
    SEARCH_HISTORY(state, history) {
        state.searchHistory = history
    }
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