import api from './Interface'

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

/**
 * 获取 mv 点赞转发评论数数据
 * 说明 : 调用此接口 , 传入 mvid ( 在搜索音乐的时候传 type=1004 获得 ) , 可获取对应 MV 点赞转发评论数数据
 * @param {*} mvid mvid: mv 的 id
 * @returns 
 */
export const getMvDetailInfo = mvid => api.get(`/mv/detail/info?mvid=${mvid}`, {})

/**
 * 收藏/取消收藏 MV
 * 说明 : 调用此接口,可收藏/取消收藏 MV
 * @param {*} mvid : MV id
 * @param {*} t t : 1 为收藏,其他为取消收藏
 * @returns 
 */
export const mvSub = (mvid, t) => api.get(`/resource/like?mvid=${mvid}&t=${t}`, {})

/**
 * mv 评论
 * 说明 : 调用此接口 , 传入音乐 id 和 limit 参数 , 可获得该 mv 的所有评论 ( 不需要 登录 )
 * @param {*} params id: mv id
 * @param {*} params limit: 取出评论数量 , 默认为 20
 * @param {*} params offset: 偏移数量 , 用于分页 , 如 :( 评论页数 -1)*20, 其中 20 为 limit 的值
 * @param {*} params before: 分页参数,取上一页最后一项的 time 获取下一页数据(获取超过5000条评论的时候需要用到)
 * @returns 
 */
export const getMvComment = params => api.get(`/comment/mv`, {
    params
})

/**
 * 相似mv
 * @param {*} mvid mv id
 * @returns 
 */
export const simiNv = mvid => api.get(`/simi/mv?mvid=${mvid}`, {})