import {
    playMode
} from "@/utils/playConfig"

import utils from '@/utils/utils'

import {
    saveHistory,
    deleteHistory,
    clearHistory,
} from '@/utils/cache'

function findIndex(list, song) {
    return list.findIndex(item => {
        return item.id === song.id
    })
}

// state
const state = () => ({
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
})

// getters
const getters = {
    // 当前播放状态
    playing: (state) => state.playing,

    // 当前的索引值
    currentIndex: (state) => state.currentIndex,

    // 播放列表
    playList: (state) => state.playList,

    // 顺序播放
    sequenceList: (state) => state.sequenceList,

    // 当前播放模式(循环，单曲，随机)
    mode: (state) => state.mode,

    // 当前播放的歌曲
    currentSong: (state) => {
        return state.playList[state.currentIndex] || {}
    },

    // 播放历史记录
    historyList: (state) => {
        return state.historyList
    }
}

// actions 
const actions = {
    // 选择播放
    selectPlay({
        commit,
        state
    }, {
        list,
        index
    }) {
        commit('SEQUENCE_LIST', list)
        if (state.mode === playMode.random) {
            let randomList = utils.shuffle(list)
            commit('PLAY_LIST', randomList)
            index = findIndex(randomList, list[index])
        } else {
            commit('PLAY_LIST', list)
        }
        commit('CURRENT_INDEX', index)
        commit('PLAYING_STATUS', true)
    },

    // 播放全部
    playAll({
        commit
    }, {
        list
    }) {
        commit('PLAY_MODE', playMode.sequence)
        commit('SEQUENCE_LIST', list)
        commit('PLAY_LIST', list)
        commit('CURRENT_INDEX', 0)
        commit('PLAYING_STATUS', true)
    },

    // 暂停播放
    pausePlay({
        commit
    }) {
        // 播放状态变为false
        commit('PLAYING_STATUS', false)
    },

    // 移除播放
    movePlay({
        commit
    }) {
        // 停止播放
        commit('PLAYING_STATUS', false)
        // 播放列表置空
        commit('PLAY_LIST', [])
        // 顺序播放列表置空
        commit('SEQUENCE_LIST', [])
        // 播放索引置-1
        commit('CURRENT_INDEX', -1)
    },

    // 保存最近播放的歌曲列表
    saveHistoryList({
        commit
    }, song) {
        commit('HISTORY_LIST', saveHistory(song))
    },

    // 删除最近播放的历史记录
    deleteHistoryList({
        commit
    }, song) {
        commit('HISTORY_LIST', deleteHistory(song))
    },

    // 清除所有播放列表
    clearHistoryList({
        commit
    }) {
        commit('HISTORY_LIST', clearHistory())
    },
}

// mutations
const mutations = {
    // 播放状态
    PLAYING_STATUS(state, flag) {
        state.playing = flag
    },
    // 播放索引
    CURRENT_INDEX(state, index) {
        state.currentIndex = index
    },
    // 设置播放模式
    PLAY_MODE(state, mode) {
        state.mode = mode
    },
    // 顺序播放
    SEQUENCE_LIST(state, list) {
        state.sequenceList = list
    },
    // 播放列表
    PLAY_LIST(state, list) {
        state.playList = list
    },
    // 播放历史记录
    HISTORY_LIST(state, list) {
        state.historyList = list
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