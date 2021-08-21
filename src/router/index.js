import Vue from 'vue'
import VueRouter from 'vue-router'
import {
  routes
} from './routes'

Vue.use(VueRouter)

// 采取统一暴露的方式
export default new VueRouter({
  routes,
  // 路由滚动
  scrollBehavior () {
    return {
      x: 0,
      y: 0
    }
  }
})
