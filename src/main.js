import Vue from 'vue'
// 引入antd-vue
import Antd from 'ant-design-vue'
import ElementUI from 'element-ui'

// 全局使用VueAwesomeSwiper
import VueAwesomeSwiper from 'vue-awesome-swiper'
import App from './App'
import router from './router'
// 引入store
import store from './store'
// 引入接口文档
// import getApi from '@/api/index'

// 引入常用的常量工具、
import constants from './utils/constant'
import utils from './utils/utils'
import 'ant-design-vue/dist/antd.css'
import 'element-ui/lib/theme-chalk/index.css'
// 引入swiper样式
import 'swiper/css/swiper.css'

import './assets/style/common.css'

// 引入iconfont
import './assets/style/iconfont.css'

// 引入animate动画库
import animate from 'animate.css'

// 引入particles.js
import particlesJs from "particles.js";

import VueParticles from 'vue-particles'


Vue.config.productionTip = false

Vue.use(Antd)
Vue.use(ElementUI)
Vue.use(VueAwesomeSwiper)
Vue.use(animate)
Vue.use(particlesJs)

Vue.use(VueParticles)


// 配置全局事件总线，这样在任何地方都可以使用了，不需要单独引入
// Vue.prototype.$api = getApi
Vue.prototype.utils = utils
Vue.prototype.constants = constants

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>',
  // 安装全局事件总线
  beforeCreate() {
    Vue.prototype.$bus = this
  }
})