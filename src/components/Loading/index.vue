<template>
  <div class="loading flex-column">
    <div class="loading-box"></div>
    <span v-if="loadingText != ''">{{ loadingText }}</span>
  </div>
</template>

<script>
export default {
  name: 'Loading',
  data() {
    return {

    }
  },
  props: {
    loadingText: {
      type: String,
      default: '玩命加载中，别着急，我也是很努力的~'
    }
  },

  components: {

  },
  mounted() {

  },
  methods: {

  }
}
</script>

<style lang='less' scoped>
.loading {
  span {
    margin-top: -40px;
    font-size: 1.1rem;
    color: #000;
  }
  .loading-box {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin: 4em;
    display: inline-block;
    position: relative;
    vertical-align: middle;
    background: @color-theme;
  }
}
.loading-box,
.loading-box::before,
.loading-box::after {
  animation: loader 2s infinite ease-in-out;
}
.loading-box,
.loading-box::before,
.loading-box::after {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  position: absolute;
  top: 0;
  left: 0;
}
@keyframes loader {
  from {
    transform: scale(0);
    opacity: 1;
  }
  to {
    transform: scale(1);
    opacity: 0;
  }
}
</style>
