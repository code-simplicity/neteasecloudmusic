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

/**
 * 获取专辑内容
 * 说明 : 调用此接口 , 传入专辑 id, 可获得专辑内容
 * @param {*} id 专辑id
 * @returns 
 */
export const getAlbumData = id => api.get(`/album?id=${id}`, {})

/**
 * 专辑评论
 * 说明 : 调用此接口 , 传入音乐 id 和 limit 参数 , 可获得该专辑的所有评论 ( 不需要 登录 )
 * @param {*} params id: 专辑 id
 * @param {*} params limit: 取出评论数量 , 默认为 20
 * @param {*} params offset: 偏移数量 , 用于分页 , 如 :( 评论页数 -1)*20, 其中 20 为 limit 的值
 * @param {*} params before: 分页参数,取上一页最后一项的 time 获取下一页数据(获取超过5000条评论的时候需要用到)
 * @returns 
 */
export const getCommentAlbum = params => api.get(`/comment/album`, {
    params
})