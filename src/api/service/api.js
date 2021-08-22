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
 * 获取歌曲详情
 * @param {*} ids  音乐id,
 * @param {*} time 时间
 * @returns 
 */
export const getSongDetail = (ids,time) => api.post(`/song/detail?ids=${time}`,{ids})
