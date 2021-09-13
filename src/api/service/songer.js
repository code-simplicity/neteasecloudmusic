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

/**
 * 获取相似歌手
 * 说明 : 调用此接口 , 传入歌手 id, 可获得相似歌手
 * @param {*} id 歌手 id
 * @returns 
 */
export const getSimiArtist = id => api.get(`/simi/artist?id=${id}`, {})

/**
 * 获取热门歌单分类
 * @returns 
 */
export const playListHot = () => api.get(`/playlist/hot`, {})

/**
 * 歌单分类
 * @returns 
 */
export const playListCatlist = () => api.get(`/playlist/catlist`, {})

/**
 * 歌单 ( 网友精选碟 )
 * 说明 : 调用此接口 , 可获取网友精选碟歌单
 * @param {*} params order: 可选值为 'new' 和 'hot', 分别对应最新和最热 , 默认为 'hot'
 * @param {*} params cat: tag, 比如 " 华语 "、" 古风 " 、" 欧美 "、" 流行 ", 默认为 "全部",可从歌单分类接口获取(/playlist/catlist)
 * @param {*} params limit: 取出歌单数量 , 默认为 50
 * @param {*} params offset: 偏移数量 , 用于分页 , 如 :( 评论页数 -1)*50, 其中 50 为 limit 的值
 * @returns 
 */
export const getPlayList = params => api.get(`/top/playlist`, {
    params
})

/**
 * 获取每日推荐的歌曲
 * @returns 
 */
export const getRecommendSongs = () => api.get(`recommend/songs`, {})