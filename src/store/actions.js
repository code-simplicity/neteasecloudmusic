import * as types from './mutation-type'
import {
    playMode
} from '@/utils/playConfig'
import utils from '@/utils/utils'

import {
    saveHistory,
    deleteHistory,
    clearHistory,
    saveSearch,
    deleteSearch,
    clearSearch,
} from '@/utils/cache'

function findIndex(list, song) {
    return list.findIndex(item => {
        return item.id === song.id
    })
}

// 选择播放
export const selectPlay = function ({
    commit,
    state
}, {
    list,
    index
}) {
    commit(types.SEQUENCE_LIST, list)
    if (state.mode === playMode.random) {
        let randomList = utils.shuffle(list)
        commit(types.PLAY_LIST, randomList)
        index = findIndex(randomList, list[index])
    } else {
        commit(types.PLAY_LIST, list)
    }
    commit(types.CURRENT_INDEX, index)
    commit(types.PLAYING_STATUS, true)
}

// 播放全部
export const playAll = function ({
    commit
}, {
    list
}) {
    commit(types.PLAY_MODE, playMode.sequence)
    commit(types.SEQUENCE_LIST, list)
    commit(types.PLAY_LIST, list)
    commit(types.CURRENT_INDEX, 0)
    commit(types.PLAYING_STATUS, true)
}

// 暂停播放
export const pausePlay = function ({
    commit
}) {
    // 播放状态变为false
    commit(types.PLAYING_STATUS, false)
}

// 移除播放
export const movePlay = function ({
    commit
}) {
    // 停止播放
    commit(types.PLAYING_STATUS, false)
    // 播放列表置空
    commit(types.PLAY_LIST, [])
    // 顺序播放列表置空
    commit(types.SEQUENCE_LIST, [])
    // 播放索引置-1
    commit(types.CURRENT_INDEX, -1)
}

// 保存最近播放的歌曲列表
export const saveHistoryList = function ({
    commit
}, song) {
    commit(types.HISTORY_LIST, saveHistory(song))
}

// 删除最近播放的历史记录
export const deleteHistoryList = function ({
    commit
}, song) {
    commit(types.HISTORY_LIST, deleteHistory(song))
}

// 清除所有播放列表
export const clearHistoryList = function ({
    commit
}) {
    commit(types.HISTORY_LIST, clearHistory())
}

// // 响应用户信息
// export const userInfo = function ({
//     commit
// }, userInfo) {
//     commit(types.USER_INFO, userInfo(userInfo))
// }

// // 响应登录状态
// export const loginStatus = function ({
//     commit
// }, state) {
//     commit(types.LOGIN_STATUS, loginStatus(state))
// }

// 保存搜索历史记录
export const saveSearchHistory = function ({
    commit
}, query) {
    commit(types.SEARCH_HISTORY, saveSearch(query))
}

// 删除一个搜索记录
export const deleteSearchHistory = function ({
    commit
}, query) {
    commit(types.SEARCH_HISTORY, deleteSearch(query))
}

// 清除所有的搜索历史记录
export const clearSearchHistory = function ({
    commit
}) {
    commit(types.SEARCH_HISTORY, clearSearch())
}