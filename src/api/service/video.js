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