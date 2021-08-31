<template>
  <div class="play-list-detail container">
    <!-- 顶部-->
    <div class="left shadow">
      <div class="top">
        <div class="avatar">
          <el-image
            class="el-image"
            :src="songDetail.url"
            fit="cover"
          ></el-image>
        </div>
        <div class="info">
          <div class="title flex-between">
            <span>123</span>
          </div>
          <div class="user flex-row">
            <div class="avatar">
              <el-image :src="url" fit="cover"></el-image>
            </div>
            <span class="username">用户名</span>
            <span class="createTime">2017-12-22 创建</span>
          </div>
          <div class="user-button">
            <el-button type="primary" size="small">
              <i class="iconfont icon-bofang1"></i>
              播放
            </el-button>
          </div>
          <div class="tag flex-row">标签：<a class="">列表</a></div>
        </div>
      </div>
      <!-- 中间内容 -->
      <div class="content" v-loading="loading"></div>
    </div>
    <div class="right"></div>
  </div>
</template>

<script>
export default {
  name: 'PlayListDetail',
  data () {
    return {
      // 加载提示
      loading: false,
      // 歌单详情
      songDetail: {}
    }
  },
  components: {

  },
  mounted () {

  },
  methods: {
    //TODO:
  }
}
</script>

<style lang='less' scoped>
.play-list-detail {
  background-color: @content-background;
  display: flex;
  align-items: flex-start;
  .left {
    flex: 1;
    width: 600px;
    padding: 20px;
    border-radius: 8px;
    margin-right: 10px;
    .top {
      display: flex;
      .avatar {
        width: 200px;
        height: 200px;
        border-radius: 8px;
        position: relative;
        margin-right: 30px;
        flex-shrink: 0;
        .el-image {
          width: 100%;
          height: 100%;
          border-radius: 8px;
          position: relative;
        }
        &::hover {
          content: "";
          width: 95%;
          height: 95%;
          background: rgba(0, 0, 0, 0.2);
          display: block;
          position: absolute;
          top: 15px;
          right: -5px;
          z-index: 0;
          border-radius: 8px;
        }
      }
      .info {
        display: flex;
        flex-direction: column;
        justify-content: center;
        .title {
          font-size: 1.6rem;
          font-weight: 600;
          line-height: 40px;
          margin-bottom: 20px;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
        }
        .user {
          margin-bottom: 15px;
          .avatar {
            width: 30px;
            height: 30px;
            border-radius: 50%;
            position: relative;
            margin-right: 20px;
            cursor: pointer;
          }
          .username {
            color: @blue;
            font-size: 1rem;
            margin-right: 40px;
            cursor: pointer;
            &:hover {
              color: @color-theme;
            }
          }
          .createTime {
            font-size: 0.9rem;
            color: @color-blank;
          }
        }
        .user-button {
          display: block;
          .icon-bofang1 {
            font-size: 0.9rem;
          }
          /deep/.el-button--small {
            font-size: 0.9rem;
          }
        }
        .tag {
          margin-top: 6px;
          // padding: 0 10px 0 0;
          // text-shadow: 0 1px #fdfdfd;
          // background-position: right -27px;
          a {
            color: @color-blank;
            background: @tag-background;
            margin-right: 15px;
            font-size: 1rem;
            cursor: pointer;
            padding: 6px 12px;
            border-radius: 16px;
            &:hover {
              color: @color-theme;
            }
            // &::after {
            //   // content: '，'
            // }
            // &:last-child {
            //   &::after {
            //     content: "";
            //   }
            // }
          }
        }
      }
    }
  }
  .right {
    width: 350px;
    flex-shrink: 0;
    background: @color-dark;
  }
}
</style>
