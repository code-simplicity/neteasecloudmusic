/**
 * services文件api，统一出口
 */
// 获取接口api
import * as getApi from './service/api'
// 获取用户api
import * as getUserApi from './service/user'
export default {
  ...getApi,
  ...getUserApi
}
