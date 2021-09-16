import api from './Interface'

/**
 * 获取视频标签列表
 * 说明 : 调用此接口 , 可获取视频标签列表
 * @returns 
 */
export const getVideoGroupList = () => api.get(`/video/group/list`, {})

/**
 * 获取视频分类列表
 * 说明 : 调用此接口 , 可获取视频分类列表
 * @returns 
 */
export const getVideoCategoryList = () => api.get(`/video/category/list`, {})

/**
 * 获取视频标签/分类下的视频
 * 说明 : 调用此接口 , 传入标签/分类id,可获取到相关的视频,分页参数只能传入offset
 * @param {*} id videoGroup 的 id
 * @param {*} offset offset: 默认0
 * @returns 
 */
export const getVideoGroup = (id, offset) => api.get(`/video/group?id=${id}&offset=${offset}`, {})

/**
 * 获取全部视频列表
 * 说明 : 调用此接口,可获取视频分类列表,分页参数只能传入offset
 * @param {*} offset offset: 默认0
 * @returns 
 */
export const getVideoAll = (offset) => api.get(`/video/timeline/all?offset=${offset}`, {})

/**
 * 视频详情
 * 说明 : 调用此接口 , 可获取视频详情
 * @param {*} id  视频 的 id
 * @returns 
 */
export const getVideoDetail = id => api.get(`/video/detail?id=${id}`, {})

/**
 * 获取视频播放地址
 * 说明 : 调用此接口 , 传入视频 id,可获取视频播放地址
 * @param {*} id 视频 的 id
 * @returns 
 */
export const getVideoUrl = id => api.get(`/video/url?id=${id}`, {})

/**
 * 相关视频
 * 说明 : 调用此接口 , 可获取相关视频
 * @param {*} id 视频 的 id
 * @returns 
 */
export const getRelatedAllVideo = id => api.get(`/related/allvideo?id=${id}`, {})

/**
 * 视频评论
 * 说明 : 调用此接口 , 传入音乐 id 和 limit 参数 , 可获得该 视频 的所有评论 ( 不需要登录 )
 * @param {*} params id: 视频的 id
 * @param {*} params limit: 取出评论数量 , 默认为 20
 * @param {*} params offset: 偏移数量 , 用于分页 , 如 :( 评论页数 -1)*20, 其中 20 为 limit 的值
 * @param {*} params before: 分页参数,取上一页最后一项的 time 获取下一页数据(获取超过5000条评论的时候需要用到)
 * @returns 
 */
export const getCommentVideo = params => api.get(`/comment/video`, {
    params
})

/**
 * 收藏/取消收藏视频
 * @param {*} id 视频 id
 * @param {*} t  1 为收藏,其他为取消收藏
 * @returns 
 */
export const getVideoSub = (id, t) => api.get(`/video/sub?id=${id}&t=${t}`, {})

/**
 * 获取视频点赞转发评论数数据
 * 说明 : 调用此接口 , 传入 vid ( 视频id ) , 可获取对应视频点赞转发评论数数据
 * @param {*} vid 视频id
 * @returns 
 */
export const getVideoDetailInfo = vid => api.get(`/video/detail/info?vid=${vid}`, {})