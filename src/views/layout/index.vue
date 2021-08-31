<template>
  <div class="layout">
      <div class="layoutView">
          <router-view></router-view>
      </div>
  </div>
</template>

<script>
export default {
  name: 'Layout',
  data () {
    return {

    }
  },
  components: {

  },
  mounted () {

  },
  methods: {

  }
}
</script>

<style lang="less" scoped>
.layout {
    width: 100%;
    min-height: calc(100vh - 50px);
    width: auto;
    z-index: 999;
    min-width: 1024px;
    padding-top: 54px;
    .layoutView {
        min-height: 100%;
        padding: 10px 0;
    }
}
</style>
