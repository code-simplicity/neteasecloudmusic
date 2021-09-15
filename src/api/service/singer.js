// 定义接口地址
import api from './Interface'

/**
 * 获取热门歌手
 * 说明 : 调用此接口 , 可获取热门歌手数据
 * @param {*} params limit: 取出数量 , 默认为 50
 * @param {*} params offset: 偏移数量 , 用于分页 , 如 :( 页数 -1)*50, 其中 50 为 limit 的值 , 默认 为 0
 * @returns 
 */
export const getTopArtists = params => api.get(`/top/artists`, {
    params
})