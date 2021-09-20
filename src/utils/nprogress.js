import NProgress from 'nprogress'
import '@/assets/css/nprogress.css'

// 进度条的配置项：ease可以设置css3动画，如ease，linear；speed是进度条从开始到结束的耗时
NProgress.configure({
    // 样式为横线
    ease: 'linear',
    // 加载速度
    speed: 600
})

function start() {
    return NProgress.start() // 进度条开始
}

function done() {
    return NProgress.done() // 进度条结束
}

// 统一暴露
export default {
    start,
    done
}