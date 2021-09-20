// 配置接口定义以及拦截器
import axios from 'axios'
import config from '../config'
import qs from 'qs'
import '@/utils/nprogress'
import {
  Message
} from 'element-ui'
import router from '@/router'
import NProgress from '@/utils/nprogress'
const {
  // eslint-disable-next-line camelcase
  api_base_url
} = config

// 创建axios实例
let instance = axios.create({
  time: 1000 * 60,
  baseURL: api_base_url
})
// 请求数据返回结果为json类型
instance.defaults.responseType = 'json'
// 是否开启上传凭证， 为true获得的第三方cookies，
// 将会依旧享受同源策略，因此不能被通过document.cookie或者从头部相应请求的脚本等访问。
instance.defaults.withCredentials = true
// 格式化请求数据，返回结果为字符串
instance.defaults.transformRequest = [
  data => {
    return qs.stringify(data)
  }
]
// instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
// `validateStatus` 定义对于给定的HTTP
// 响应状态码是 resolve 或 reject  promise 。
// 如果 `validateStatus` 返回 `true` (或者设置为 `null` 或 `undefined`)，
// promise 将被 resolve; 否则，promise 将被 rejecte
instance.defaults.validateStatus = function () {
  return true
}

// 添加请求拦截器
instance.interceptors.request.use(
  config => {
    // 进度条开始
    NProgress.start()
    return config
  },
  error => {
    Message.error({
      message: '请求超时了!'
    })
    return Promise.reject(error)
  }
)

// 添加响应拦截器,做登录响应的拦截
instance.interceptors.response.use((response) => {
  let data = response.data
  let status = response.status
  // 进度条结束
  NProgress.done()
  if (status === 200) {
    return Promise.resolve(data)
  } else if (status === 301) {
    Message.error('请先登录账户')
    router.replace({
      path: 'login'
    })
  } else {
    return Promise.reject(response)
  }
}, function (error) {
  return Promise.reject(error)
})

// 请求方式
let ajaxMethod = ['get', 'post']

let api = {}
ajaxMethod.forEach(method => {
  api[method] = function (url, data, config) {
    return new Promise(function (resolve, reject) {
      instance[method](url, data, config).then((response) => {
        // 成功调用promise
        resolve(response)
      }).catch((error) => {
        //   调用promise失败
        reject(error)
      })
    })
  }
})
// 暴露
export default api