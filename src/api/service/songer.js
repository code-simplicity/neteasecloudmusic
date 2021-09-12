// 定义接口地址
import api from './Interface'

/**
 * 获取歌手详情
 * 说明 : 调用此接口 , 传入歌手 id, 可获得获取歌手详情
 * @param {*} id 歌手 id
 * @returns 
 */
export const getArtistDetail = id => api.get(`/artist/detail?id=${id}`, {})

/**
 * 获取歌手单曲
 * 说明 : 调用此接口 , 传入歌手 id, 可获得歌手部分信息和热门歌曲
 * @param {*} id 歌手 id 可由搜索接口获得
 * @returns 
 */
export const getArtists = id => api.get(`artists?id=${id}`, {})

/**
 * 获取歌手 mv
 * 说明 : 调用此接口 , 传入歌手 id, 可获得歌手 mv 信息 , 具体 mv 播放地址可调 用/mv传入此接口获得的 mvid 来拿到 , 如 : /artist/mv?id=6452,/mv?mvid=5461064
 * @param {*} params 歌手 id 可由搜索接口获得
 * @param {*} params offset: 偏移数量 , 用于分页 , 如 :( 评论页数 -1)*20, 其中 20 为 limit 的值
 * @param {*} params limit: 取出评论数量 , 默认为 20
 * @returns 
 */
export const getArtisMv = params => api.get(`/artist/mv`, {
    params
})

/**
 * 获取歌手描述
 * 说明 : 调用此接口 , 传入歌手 id, 可获得歌手描述
 * @param {*} id 歌手 id
 * @returns 
 */
export const getArtistDesc = id => api.get(`/artist/desc?id=${id}`, {})

export const getSimiArtist = id => api.get(`/simi/artist?id=${id}`, {})