// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
// 引入antd-vue
import Antd from 'ant-design-vue'
import ElementUI from 'element-ui'
import App from './App'
import router from './router'
// 引入store
import store from './store'
// 引入接口文档
// import getApi from '@/api/index'
import utils from './utils/utils'
import 'ant-design-vue/dist/antd.css'
import 'element-ui/lib/theme-chalk/index.css'

import './assets/style/common.css'

Vue.config.productionTip = false

Vue.use(Antd)
Vue.use(ElementUI)

// Vue.prototype.$api = getApi
Vue.prototype.utils = utils

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  // 安装全局事件总线
  beforeCreate () {
    Vue.prototype.$bus = this
  }
})
