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