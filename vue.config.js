// 配置vue环境
const path = require('path')

function resolve(dir) {
    return path.join(__dirname, dir)
}
// 配置模板引擎
module.exports = {
    // 部署应用时的根路径(默认'/')
    publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
    // 运行时生成的生产环境构建文件的目录,默认为dist
    outputDir: 'dist',
    // 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。
    assetsDir: '',
    // 指定生成的 index.html 的输出路径 (相对于 outputDir)。也可以是一个绝对路径。
    indexPath: 'index.html',
    // 是否在开发环境下通过 eslint-loader 在每次保存时 lint 代码。这个值会在 @vue/cli-plugin-eslint 被安装之后生效。
    lintOnSave: process.env.NODE_ENV !== 'production',
    // 是一个函数，会接收一个基于 webpack-chain 的 ChainableConfig 实例。允许对内部的 webpack 配置进行更细粒度的修改。
    chainWebpack: config => {
        config.resolve.alias
            .set('vue$', 'vue/dist/vue.esm.js')
            .set('@', resolve('src'))
            .set('assets', resolve('src/assets'))
            .set('components', resolve('src/components'))
            .set('api', resolve('src/api'))
            .set('utils', resolve('src/utils'))
            .set('store', resolve('src/store'))
            .set('router', resolve('src/router'))

        config.resolve.extensions
            .add('.js')
            .add('.vue')
            .add('.less')
    },
    // 配置less全局应用
    css: {
        loaderOptions: {
            stylus: {
                import: '~@/assets/styles/variable.less'
            }
        }
    },
    devServer: {
        port: 8082,
        open: true,
        hotOnly: true
    }
}