// 接口地址
// eslint-disable-next-line camelcase
let api_base_url = ''
if (process.env.NODE_ENV === 'development') {
  // eslint-disable-next-line camelcase
  api_base_url = 'http://localhost:3000'
} else if (process.env.NODE_ENV === 'production') {
  // eslint-disable-next-line camelcase
  api_base_url = 'https://netease-cloud-music-api-zeta-murex.vercel.app/'
}

// 接口地址统一暴露
export default {
  api_base_url
}
