import {
    SEQUENCE_LIST,
    PLAY_LIST,
    PLAY_STATUS,
    CURRENT_INDEX,
    PLAY_MODE,
} from './mutation-type'
import {
    playMode
} from '@/utils/playConfig'
import {
    utils
} from '@/utils/utils'

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
    commit(PLAY_STATUS, true)
}

// 播放全部
export const playAll = function ({
    commit
}, {
    list
}) {
    commit(PLAY_MODE, playMode.sequence)
}

// 暂停播放
export const pausePlay = function ({
    commit
}) {
    // 播放状态变为false
    commit(PLAY_STATUS, false)
}

// 移除播放
export const movePlay = function ({
    commit
}) {
    // 停止播放
    commit(PLAY_STATUS, false)
    // 播放列表置空
    commit(PLAY_LIST, [])
    // 顺序播放列表置空
    commit(SEQUENCE_LIST, [])
    // 播放索引置-1
    commit(CURRENT_INDEX, -1)
}
