// 用户登录接口
import api from './Interface'

/**
 * 手机登录接口
 * @param {*} params phone 手机号码
 * @param {*} params md5_password md5加密密码
 * @returns
 */
export const loginWithPhone = params => api.get(`/login/cellphone`, {
  params,
  withCredentials: true
})

/**
 * 邮箱登录
 * @param {*} params email 163 网易邮箱
 * @param {*} params md5_password md5加密密码
 * @returns 
 */
export const loginWithEmail = params => api.get(`/login`, {
  params
})

//刷新登录
export const loginRefresh = () => api.get(`/login/refresh`, {})

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

/**
 * 关注/取消关注用户
 * 说明 : 登录后调用此接口 , 传入用户 id, 和操作 t,可关注/取消关注用户
 * @param {*} id  用户 id
 * @param {*} t 1为关注,其他为取消关注
 * @returns 
 */
export const follow = (id, t) => api.get(`/follow?id=${id}&t=${t}`, {})

/**
 * 二维码key生成接口
 * 说明: 调用此接口可生成一个key
 * @returns 给个时间戳
 */
export const getLoginQrKey = params => api.get(`/login/qr/key`, {
  params,
  withCredentials: true,
})

/**
 * 二维码生成接口
 * 说明: 调用此接口传入上一个接口生成的key可生成二维码图片的base64和二维码信息,
 * 可使用base64展示图片,或者使用二维码信息内容自行使用第三方二维码生成库渲染二维码
 * @param {*} params key 由第一个接口生成
 * @param {*} params qrimg 传入后会额外返回二维码图片base64编码
 * @returns 
 */
export const getLoginQrImage = params => api.get(`/login/qr/create`, {
  params,
  withCredentials: true,
})

/**
 * 二维码检测扫码状态接口
 * 说明: 轮询此接口可获取二维码扫码状态,800为二维码过期,801为等待扫码,802为待确认,803为授权登录成功(803状态码下会返回cookies)
 * @param {*} params key 由第一个接口生成
 * @returns 
 */
export const loginQrCheck = params => api.get(`/login/qr/check`, {
  params,
  withCredentials: true,
})

// 获取用户信息（登录之后）
export const getUserAccount = () => api.get(`/user/account`, {})