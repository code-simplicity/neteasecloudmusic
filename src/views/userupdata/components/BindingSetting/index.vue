<template>
  <!-- 绑定设置 -->
  <div class="bind-setting">
    <div class="bind-top flex-row">
      <i class="iconfont icon-shouji"></i>
      <div class="bind-phone">
        <p>手机</p>
        <span> 使用手机注册：+86 131****3657修改</span>
      </div>
      <div class="bind-btn">
        <el-button type="primary">修改密码</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BindingSetting',
  data() {
    return {

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
.bind-setting {
  display: flex;
  width: 100%;
  .bind-top {
    background: #f5f5f5;
    align-items: center;
    height: 120px;
    padding: 20px 40px;
    i {
      font-size: 4rem;
      color: #e0995e;
      margin-right: 6px;
    }
    .bind-phone {
      margin-right: 120px;
      p {
        font-size: 1.1rem;
        margin-bottom: 6px;
        color: @color-blank;
      }
    }
    .bind-btn {
      margin-right: 0;
    }
  }
}
</style>
