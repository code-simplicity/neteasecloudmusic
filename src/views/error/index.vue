<template>
  <div class="error-wrap flex-column">
    <Particles></Particles>
    <div class="error-box">
      <img src="../../assets/images/404.png" alt="" />
      <h4>出错了哦！！！</h4>
      <button class="button-style" @click="back">返回</button>
    </div>
  </div>
</template>

<script>
import Particles from '@/components/Particles'
export default {
  name: 'Error',
  data() {
    return {

    }
  },
  components: {
    Particles
  },
  mounted() {

  },
  methods: {
    // 返回上一次正确的路由
    back() {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang='less' scoped>
.error-wrap {
  height: calc(100vh - 68px);
  padding-top: 60px;
  .error-box {
    display: flex;
    -webkit-box-orient: vertical;
    flex-direction: column;
    flex: 1 1 auto;
    justify-content: center;
    align-items: center;
    img {
      width: 20rem;
      height: 20rem;
      margin-bottom: 1.5rem;
    }
    h4 {
      font-size: 1.5rem;
      color: @color-dark;
    }
    .button-style {
      background-color: @color-dark;
      color: @color-blank;
      font-size: 1.2rem;
      padding: 4px;
      margin-top: 20px;
      border-radius: 12px;
      cursor: pointer;
      &:hover {
        background-color: @color-theme;
        color: @color-dark;
      }
    }
  }
}
</style>
