// 定义接口地址
import api from './Interface'

/**
 * 获取歌手专辑
 * 说明 : 调用此接口 , 传入歌手 id, 可获得歌手专辑内容
 * @param {*} params id: 歌手 id
 * @param {*} params limit: 取出数量 , 默认为 50
 * @param {*} params offset: 偏移数量 , 用于分页 , 如 :( 页数 -1)*50, 其中 50 为 limit 的值 , 默认 为 0
 * @returns 
 */
export const getArtistAlbum = params => api.get(`/artist/album`, {
    params
})