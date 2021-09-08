// 用户登录接口
import api from './Interface'

/**
 * 用户登录接口
 * @param {*} phone 手机号码
 * @param {*} password 密码
 * @returns
 */
export const login = (phone, password) => api.get(`/login/cellphone?phone=${phone}&password=${password}`, {
  withCredentials: true
})

/**
 * 获取用户信息
 * @param {*} uid 用户id
 */
export const getUserInfo = (uid) => api.get(`/user/detail?uid=${uid}`, {})

/**
 * 退出登录
 * @returns 
 */
export const logout = () => api.get('/logout', {})

/**
 * 获取用户播放记录
 * @param {*} 说明 : 登录后调用此接口 , 传入用户 id, 可获取用户播放记录
 * @param {*} uid 用户 id
 * @param {*} type 可选参数 : type : type=1 时只返回 weekData, type=0 时返回 allData
 * @returns 
 */
export const getUserRecord = (uid, type) => api.get(`/user/record?uid=${uid}&type=${type}`, {})

/**
 * 获取用户歌单
 * 说明 : 登录后调用此接口 , 传入用户 id, 可以获取用户歌单
 * @param {*} uid 用户 id
 * @returns 
 */
export const getUserPlaylist = (uid) => api.get(`/user/playlist?uid=${uid}`, {})

/**
 * 更新用户信息
 * 说明 : 登录后调用此接口 , 传入相关信息,可以更新用户信息
 * @param {*} params gender: 性别 0:保密 1:男性 2:女性
 * @param {*} params birthday: 出生日期,时间戳 unix timestamp
 * @param {*} params nickname: 用户昵称
 * @param {*} params province: 省份id
 * @param {*} params city: 城市id
 * @param {*} params signature：用户签名
 * 调用例子 : /user/update?gender=0&signature=测试签名&city=440300&nickname=binary&birthday=1525918298004&province=440000
 * @returns 
 */
export const userInfoUpdate = params => api.get(`/user/update`, {
  params
})

/**
 * 头像上传
 * @param {*} params imgFile : 图片文件
 * @param {*} params imgSize : 图片尺寸,默认为300
 * @param {*} params imgX : 水平裁剪偏移,方形图片可不传,默认为0 imgY : 垂直裁剪偏移,方形图片可不传,默认为0
 * @returns 
 */

export const avatarUpload = (params, config) => api.post(`/avatar/upload`, {
  params
}, {
  config
})

/**
 * 签到
 * @returns 
 */
export const dailySignin = () => api.get(`/daily_signin`, {})