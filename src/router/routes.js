
import Layout from '@/views/layout/index'

/**
 * 登录路由
 */
export const loginRouter = [
  {
    path: '/login',
    name: 'login',
    component: resolve => {
      require(['@/views/login/index'], resolve)
    },
    meta: {
      title: '登录',
      isLogin: true
    }
  }
]

/**
 * 主要路由
 */
export const mainRouter = [
  {
    path: '/',
    redirect: {
      name: 'home'
    },
    meta: {
      title: '首页',
      keepAlive: true
    },
    component: Layout,
    children: [
      {
        path: 'home',
        name: 'home',
        meta: {
          title: '首页',
          keepAlive: true
        },
        component: resolve => {
          require(['@/views/home/index'], resolve)
        }
      }
    ]
  }
]

// 暴露路由
export const routes = [...loginRouter, ...mainRouter]
