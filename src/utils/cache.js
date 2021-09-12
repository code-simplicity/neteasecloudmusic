// 缓存
import storage from 'good-storage'

// 历史记录的字段
const HISTORY_KEY = '__history__'
// 历史记录的最大长度
const HISTORY_MAX_LENGTH = 50

const SEARCH_KEY = '__search__'
// 搜索保存的最大历史记录
const SEARCH_MAX = 20

// 插入数组的方法
function insertArray(array, val, compare, maxLen) {
    // 获取数组下标
    const index = array.findIndex(compare)
    if (index === 0) {
        return
    }
    if (index > 0) {
        array.splice(index, 1)
    }
    array.unshift(val)
    if (maxLen && array.length > maxLen) {
        // 删除最后一个元素，并且返回行的数组长度
        array.pop()
    }
}

// 删除历史记录
function deleteFromArray(array, compare) {
    const index = array.findIndex(compare)
    if (index > -1) {
        array.splice(index, 1)
    }
}
// 添加最近播放列表
export function saveHistory(song) {
    let songs = storage.get(HISTORY_KEY, [])
    insertArray(songs, song, (item) => {
        return song.id === item.id
    }, HISTORY_MAX_LENGTH)
    storage.set(HISTORY_KEY, songs)
    return songs
}

// 删除最近播放历史记录
export function deleteHistory(song) {
    let songs = storage.get(HISTORY_KEY, [])
    deleteFromArray(songs, (item) => {
        return song.id === item.id
    })
    storage.set(HISTORY_KEY, songs)
    return songs
}

// 全部清除最近播放列表
export function clearHistory() {
    storage.remove(HISTORY_KEY)
    return []
}

// 存储历史搜索数据
export function saveSearch(query) {
    let searches = storage.get(SEARCH_KEY, [])
    insertArray(searches, query, item => {
        return item === query
    }, SEARCH_MAX)
    storage.set(SEARCH_KEY, searches)
    return searches
}

// 读取搜索历史记录
export function getSearch() {
    return storage.get(SEARCH_KEY, [])
}

// 删除单个历史记录
export function deleteSearch(query) {
    let searches = storage.get(SEARCH_KEY, [])
    deleteFromArray(searches, item => {
        return item === query
    })
    storage.set(SEARCH_KEY, searches)
    return searches
}

// 清除所有搜索历史记录
export function clearSearch() {
    storage.remove(SEARCH_KEY)
    return []
}