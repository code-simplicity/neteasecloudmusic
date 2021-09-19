<template>
  <div
    class="back-to-top"
    @mouseenter="show"
    @mouseleave="hide"
    v-show="ShowBackTop"
    @click="backTop"
  >
    <img src="../../assets/images/back-top.png" />
  </div>
</template>

<script>
import { scrollTop } from '@/utils/scrollTop'
export default {
  name: 'BackTop',
  data() {
    return {
      // 是否展示返回图标
      showToolTip: false,
      // 返回顶部
      ShowBackTop: false,
      pageY: 200,
    }
  },
  components: {

  },
  created() {
    window.addEventListener('scroll', this.calculationDisplay, true)
  },

  mounted() {
  },
  // 销毁
  beforeDestroy() {
    window.removeEventListener('scroll', this.calculationDisplay, true)
  },
  methods: {
    // 返回
    backTop() {
      scrollTop(0, 500, this.transitionName, this.currentPageYOffset)
    },

    // 判断滚动区域大于多少显示返回按钮
    calculationDisplay() {
      window.pageYOffset > this.pageY ? this.ShowBackTop = true : this.ShowBackTop = false
    },

    // 显示文字
    show() {
      return this.showToolTip = true
    },

    // 隐藏
    hide() {
      return this.showToolTip = false
    }
  }
}
</script>

<style lang='less' scoped>
.back-to-top {
  position: fixed;
  bottom: 10%;
  right: 40px;
  z-index: 6666;
  cursor: pointer;
  width: auto;
  img {
    width: 40px;
  }
}
</style>
