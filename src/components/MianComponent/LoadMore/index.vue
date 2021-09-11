<template>
  <div class="load-more">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'LoadMore',
  data() {
    return {

    }
  },
  components: {

  },
  mounted() {
    // 滚动事件的触发
    let self = this
    window.onscroll = function () {
      // 判断当前滚动底部的位置加上可视范围的高度是否大于浏览器本是的高度
      if (self.getScrollTop() + self.getClientHeight() >= self.getScrollHeight()) {
        self.$emit('scroll-state', true)
      }
    }
  },
  methods: {
    // 获取滚动条当前的位置，用于加载
    getScrollTop() {
      let scrollTop = 0
      if (document.documentElement && document.documentElement.scrollTop) {
        scrollTop = document.documentElement.scrollTop
      } else if (document.body) {
        scrollTop = document.body.scrollTop
      }
      return scrollTop
    },

    // 获取当前浏览器可见范围的高度
    getClientHeight() {
      let clientHeight = 0
      if (document.body.clientHeight && document.documentElement.clientHeight) {
        clientHeight = Math.min(
          document.body.clientHeight,
          document.documentElement.clientHeight
        )
      } else {
        clientHeight = Math.max(
          document.body.clientHeight,
          document.documentElement.clientHeight
        )
      }
      return clientHeight
    },

    //获取文档完整的高度
    getScrollHeight() {
      return Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight
      )
    }
  }
}
</script>

<style lang='less' scoped>
</style>
