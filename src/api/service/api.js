// 定义接口地址
import api from './Interface'

/**
 * @method 获取轮播图
 */
export const getCarousel = () => api.get('/banner', {})

/**
 * 推荐歌单
 * @param {*} limit 默认值为30
 * @returns 
 */
export const getPersonalized = (limit) => api.get(`/personalized?limit=${limit}`, {})

/**
 * 热门歌单分类接口地址
 * @returns null
 */
export const songMusic = () => api.post('/playlist/hot', {})

/**
 * 推荐新音乐-最新专辑
 * @param {*} limit 获取推荐新音乐的数量
 * @returns 
 */
export const getNewSongs = (limit) => api.get(`/personalized/newsong?limit=${limit}`, {})

/**
 * 获取歌词
 * @param {*id参数} id 歌词
 * @returns 
 */
export const getLyric = id => api.get(`/lyric?id=${id}`, {})

/**
 * 获取歌单详情
 * @param {*歌单id} id 
 * @param {*数量} s 
 * @param {*当前的时间} time 
 * @returns 
 */
export const getPlayListDetail = (id, s, time) => api.get(`/playlist/detail?id=${id}&s=${s}&timestamp=${time}`, {})

/**
 * 获取歌曲详情
 * @param {*} ids 调用此接口 , 传入音乐 id(支持多个 id, 用 , 隔开), 可获得歌曲详情,
 * @param {*} time 时间
 * @returns 
 */
 export const getSongDetail = (ids, time) => api.post(`/song/detail?timestamp=${time}`, { ids })
