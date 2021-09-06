import {
    SEQUENCE_LIST,
    PLAY_LIST,
    PLAYING_STATUS,
    CURRENT_INDEX,
    PLAY_MODE,
    HISTORY_LIST,
    USER_INFO,
    LOGIN_STATUS
} from './mutation-type'
import {
    playMode
} from '@/utils/playConfig'
import utils from '@/utils/utils'

import {
    saveHistory,
    deleteHistory,
    clearHistory
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
    commit(SEQUENCE_LIST, list)
    if (state.mode === playMode.random) {
        let randomList = utils.shuffle(list)
        commit(PLAY_LIST, randomList)
        index = findIndex(randomList, list[index])
    } else {
        commit(PLAY_LIST, list)
    }
    commit(CURRENT_INDEX, index)
    commit(PLAYING_STATUS, true)
}

// 播放全部
export const playAll = function ({
    commit
}, {
    list
}) {
    commit(PLAY_MODE, playMode.sequence)
    commit(SEQUENCE_LIST, list)
    commit(PLAY_LIST, list)
    commit(CURRENT_INDEX, 0)
    commit(PLAYING_STATUS, true)
}

// 暂停播放
export const pausePlay = function ({
    commit
}) {
    // 播放状态变为false
    commit(PLAYING_STATUS, false)
}

// 移除播放
export const movePlay = function ({
    commit
}) {
    // 停止播放
    commit(PLAYING_STATUS, false)
    // 播放列表置空
    commit(PLAY_LIST, [])
    // 顺序播放列表置空
    commit(SEQUENCE_LIST, [])
    // 播放索引置-1
    commit(CURRENT_INDEX, -1)
}

// 保存最近播放的歌曲列表
export const saveHistoryList = function ({
    commit
}, song) {
    commit(HISTORY_LIST, saveHistory(song))
}

// 删除最近播放的历史记录
export const deleteHistoryList = function ({
    commit
}, song) {
    commit(HISTORY_LIST, deleteHistory(song))
}

// 清除所有播放列表
export const clearHistoryList = function ({
    commit
}) {
    commit(HISTORY_LIST, clearHistory())
}

// 响应用户信息
export const userInfo = function ({
    commit
}, userInfo) {
    commit(USER_INFO, userInfo(userInfo))
}

// 响应登录状态
export const loginStatus = function ({
    commit
}, state) {
    commit(LOGIN_STATUS, loginStatus(state))
}