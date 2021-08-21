// 定义接口地址
import api from './Interface'

/**
 * @method 获取轮播图
 */
export const getBanner = () => api.get('/banner', {})

/**
 * 热门歌单接口地址
 * @returns null
 */
export const songMusic = () => api.post('/playlist/hot', {})
