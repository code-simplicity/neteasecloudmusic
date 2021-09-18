<template>
  <!-- particles插件的封装 -->
  <div class="particles-js-box">
    <div id="particles-js"></div>
  </div>
</template>

<script>
import particlesConfig from "@/assets/js/particlesjs-config.json";
export default {
  name: 'Particles',
  data() {
    return {

    }
  },
  components: {

  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      // eslint-disable-next-line no-undef
      particlesJS("particles-js", particlesConfig)
    }
  }
}
</script>

<style lang='less' scoped>
.particles-js-box {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: -1; //这里建议层级设为-1，但-1可能会导致被其他元素遮挡
  #particles-js {
    background-color: @header-background-color;
    width: 100%;
    height: 100%;
  }
}
</style>
