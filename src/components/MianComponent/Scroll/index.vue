<template>
  <div ref="wrapper">
    <slot></slot>
  </div>
</template>

<script type="text/ecmascript-6">
// 引入滑动插件
import BetterScroll from 'better-scroll'

// 定义两个常量,表示水平方向
const DIRECTION_H = 'horizontal'
// 定义两个常量,表示垂直方向
const DIRECTION_V = 'vertical'
export default {
    name: 'Scroll',
    // 接受组件传参
    props: {
        probeType: {
            type: Number,
            default: 1
        },
        click: {
            type: Boolean,
            default: false
        },
        listenScroll: {
            type: Boolean,
            default: false
        },
        data: {
            type: Array,
            default: null
        },
        pullup: {
            type: Boolean,
            default: false
        },
        beforeScroll: {
            type: Boolean,
            default: false
        },
        refreshDelay: {
            type: Number,
            default: 20
        },
        direction: {
            type: String,
            default: DIRECTION_V
        }
    },
    data() {
        return {

        }
    },
    watch: {
        data() {
            setTimeout(() => {
                this.refresh()
            }, this.refreshDelay)
        }
    },
    mounted() {
        setTimeout(() => {
            this.initScroll()
        }, 50)
    },
    methods: {
        // 歌词初始化滚动
        initScroll() {
            if (!this.$refs.wrapper) {
                return
            }
            this.scroll = new BetterScroll(this.$refs.wrapper, {
                probeType: this.probeType,
                click: this.click,
                mouseWheel: true,
                eventPassthrough: this.direction === DIRECTION_V ? DIRECTION_H : DIRECTION_V
            })
            if (this.listenScroll) {
                this.scroll.on('scroll', (pos) => {
                    this.$emit('scroll', pos)
                })
            }
            if (this.pullup) {
                this.scroll.on('scrollEnd', () => {
                    if (this.scroll.y <= (this.scroll.maxScrollY + 50)) {
                        this.$emit('scrollToEnd')
                    }
                })
            }
            if (this.beforeScroll) {
                this.scroll.on('beforeScrollStart', () => {
                    this.$emit('beforeScroll')
                })
            }
        },
        disable() {
            this.scroll && this.scroll.disable()
        },
        enable() {
            this.scroll && this.scroll.enable()
        },
        refresh() {
            this.scroll && this.scroll.refresh()
        },
        scrollTo() {
            this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
        },
        scrollToElement() {
            this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
        }
    }
}
</script>

<style lang='less' scoped>
</style>
