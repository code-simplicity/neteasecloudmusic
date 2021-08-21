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
