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
export const getSongDetail = (ids, time) => api.post(`/song/detail?timestamp=${time}`, {
    ids
})

/**
 * 收藏/取消收藏歌单
 * @param {*} t : 类型,1:收藏,2:取消收藏
 * @param {*} id : 歌单 id
 * @returns 
 */
export const playlistSubscribe = (t, id) => api.get(`/playlist/subscribe?t=${t}&id=${id}`, {})

/**
 * 歌单收藏者
 * @param {*} id 歌单 id
 * @param {*} limit 取出评论数量 , 默认为 20
 * @param {*} offset 偏移数量 , 用于分页 , 如 :( 评论页数 -1)*20, 其中 20 为 limit 的值
 * @returns 
 */
export const getSubscribersList = params => api.get(`/playlist/subscribers`, {
    params
})

/**
 * 相关歌单推荐
 * @param {*} id 歌单 id
 * @returns 
 */
export const getRelatedList = id => api.get(`/related/playlist?id=${id}`, {})

/**
 * 歌单评论
 * @param {*} params id: 歌单 id
 * @param {*} params limit: 取出评论数量 , 默认为 20
 * @param {*} params offset: 偏移数量 , 用于分页 , 如 :( 评论页数 -1)*20, 其中 20 为 limit 的值
 * @param {*} params before: 分页参数,取上一页最后一项的 time 获取下一页数据(获取超过5000条评论的时候需要用到)
 * @returns 
 */
export const getCommentList = params => api.get(`/comment/playlist`, {
    params
})

/**
 * 热门评论
 * @param {*} params id: 资源 id
 * @param {*} params type: 数字 , 资源类型 ,   0: 歌曲  1: mv, 2: 歌单,  3: 专辑 , 歌单 , 4: 电台,  5: 视频                                                                                            
 * @param {*} params limit: 取出评论数量 , 默认为 20
 * @param {*} params offset: 偏移数量 , 用于分页 , 如 :( 评论页数 -1)*20, 其中 20 为 limit 的值
 * @param {*} params before: 分页参数,取上一页最后一项的 time 获取下一页数据(获取超过5000条评论的时候需要用到)
 * @returns 
 */
export const getHotCommentList = params => api.get(`/comment/hot`, {
    params
})

/**
 * 发送评论
 * @param {*} params t: 1 发送, 2 回复
 * @param {*} params type: 数字 , 资源类型 ,   0: 歌曲  1: mv, 2: 歌单,  3: 专辑 , 歌单 , 4: 电台,  5: 视频， 6：动态                                                                                         
 * @param {*} params id: 对应资源 id
 * @param {*} params content: 要发送的内容
 * @param {*} params commentId: 回复的评论id (回复评论时必填)
 * 调用例子 : /comment?t=1&type=1&id=5436712&content=test (往广岛之恋 mv 发送评论: test)
 * 注意：如给动态发送评论，则不需要传 id，需要传动态的 threadId,如：/comment?t=1&type=6&threadId=A_EV_2_6559519868_32953014&content=test
 * @returns 
 */
export const sendComment = params => api.get(`/comment`, {
    params
})

/**
 * 给评论点赞
 * @param {*} params 说明 : 调用此接口 , 传入 type, 资源 id, 和评论 id cid 和 是否点赞参数 t 即可给对 应评论点赞 ( 需要登录 )
 * @param {*} params id : 资源 id, 如歌曲 id,mv id
 * @param {*} params cid : 评论 id                                                                                 
 * @param {*} params t : 是否点赞 ,1 为点赞 ,0 为取消点赞
 * @param {*} params type: 数字 , 资源类型 ,   0: 歌曲  1: mv, 2: 歌单,  3: 专辑 , 歌单 , 4: 电台,  5: 视频， 6：动态     
 * @param {*} params commentId: 回复的评论id (回复评论时必填)
 * 调用例子 : /comment/like?id=29178366&cid=12840183&t=1&type=0 对应给 https://music.163.com/#/song?id=29178366 最热门的评论点赞
 * 注意： 动态点赞不需要传入 id 参数，需要传入动态的 threadId 参数,
 * 如：/comment/like?type=6&cid=1419532712&threadId=A_EV_2_6559519868_32953014&t=0， threadId 可通过 /event，/user/event 接口获取
 * @returns 
 */
export const commentLike = params => api.get(`/comment/like`, {
    params
})

/**
 * 获取用户详情
 * @param {*} 说明 : 登录后调用此接口 , 传入用户 id, 可以获取用户详情
 * @param {*} uid  用户 id
 * @returns 
 */
export const getUserDetail = uid => api.get(`/user/detail?uid=${uid}`, {})

/**
 * 获取mv
 * 说明 : 调用此接口 , 可获取全部 mv
 * @param {*} params area: 地区,可选值为全部,内地,港台,欧美,日本,韩国,不填则为全部
 * @param {*} params type: 类型,可选值为全部,官方版,原生,现场版,网易出品,不填则为全部
 * @param {*} params order: 排序,可选值为上升最快,最热,最新,不填则为上升最快
 * @param {*} params limit: 取出数量 , 默认为 30
 * @param {*} params offset: 偏移数量 , 用于分页 , 如 :( 页数 -1)*50, 其中 50 为 limit 的值 , 默认 为 0
 * @returns 
 */
export const getMvAll = params => api.get(`/mv/all`, {
    params
})

/**
 * 获取mv 地址
 * 说明 : 调用此接口 , 传入 mv id,可获取 mv 播放地址
 * @param {*} id 必选参数 : id: mv id
 * @returns 
 */
export const getMvUrl = id => api.get(`/mv/url?id=${id}`, {})

/**
 * 获取 mv 数据
 * 说明 : 调用此接口 , 传入 mvid ( 在搜索音乐的时候传 type=1004 获得 ) , 可获取对应 MV 数据 , 
 * 数据包含 mv 名字 , 歌手 , 发布时间 , mv 视频地址等数据 , 其中 mv 视频 网易做了防盗链处理 , 
 * 可能不能直接播放 , 需要播放的话需要调用 ' mv 地址' 接口
 * @param {*} mvid mvid: mv 的 id
 * @returns 
 */
export const getMvDetail = mvid => api.get(`/mv/detail?mvid=${mvid}`, {})