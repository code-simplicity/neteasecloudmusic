import Layout from '@/views/layout/index'

/**
 * 登录路由
 */
export const loginRouter = [{
  path: '/login',
  name: 'login',
  component: resolve => {
    require(['@/views/login/index'], resolve)
  },
  meta: {
    title: '登录',
    isLogin: true
  }
}]

/**
 * 主要路由
 */
export const mainRouter = [{
  path: '/',
  redirect: {
    name: 'home'
  },
  meta: {
    title: '首页',
    keepAlive: true
  },
  component: Layout,
  children: [{
      path: 'home',
      name: 'home',
      meta: {
        title: '发现音乐',
        keepAlive: true
      },
      component: resolve => {
        require(['@/views/home/index'], resolve)
      }
    },
    {
      path: 'mymusic',
      name: 'mymusic',
      meta: {
        title: '我的音乐',
        keepAlive: true
      },
      component: resolve => {
        require(['@/views/mymusic/index'], resolve)
      }
    },
    {
      path: 'recommend',
      name: 'recommend',
      meta: {
        title: '推荐',
        keepAlive: true
      },
      component: resolve => {
        require(['@/views/recommend/index'], resolve)
      }
    },
    {
      path: 'leaderboard',
      name: 'leaderboard',
      meta: {
        title: '排行榜',
        keepAlive: true
      },
      component: resolve => {
        require(['@/views/leaderboard/index'], resolve)
      }
    },
    {
      path: 'playlist',
      name: 'playlist',
      meta: {
        title: '歌单',
        keepAlive: true
      },
      component: resolve => {
        require(['@/views/playlist/index'], resolve)
      }
    },
    {
      path: 'singer',
      name: 'singer',
      meta: {
        title: '歌手',
        keepAlive: true
      },
      component: resolve => {
        require(['@/views/singer/index'], resolve)
      }
    },
    {
      path: 'mv',
      name: 'mv',
      meta: {
        title: 'MV',
        keepAlive: true
      },
      component: resolve => {
        require(['@/views/mv/index'], resolve)
      }
    },
  ]
}]

// 暴露路由
export const routes = [...loginRouter, ...mainRouter]