<template>
  <div class="empty flex-column">
    <el-image :src="emptyBg" fit="cover"></el-image>
    <p>{{ emptyText }}</p>
  </div>
</template>

<script>

export default {
  name: 'Empty',
  data() {
    return {
      emptyBg: require('@/assets/images/empty.png')
    }
  },

  props: {
    emptyText: {
      typr: String,
      default: '什么都没有，别看了'
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
.empty {
  width: 100%;
  .el-image {
    width: 300px;
    height: 300px;
  }
  p {
    margin-top: 10px;
    font-size: 1.3rem;
    color: @color-dark;
  }
}
</style>
