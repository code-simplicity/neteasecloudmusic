<template>
  <div class="songer-box">
    <ul class="singer-list">
      <li @click="toSinger(item)" v-for="item of songItem" :key="item.id">
        <div class="cover">
          <div class="avatar">
            <el-image
              :key="item.img1v1Url"
              :src="item.img1v1Url"
              fit="cover"
              lazy
            >
              <div
                class="image-slot flex-center flex-column"
                slot="placeholder"
              >
                <i class="iconfont"></i>
                <p>加载中<span class="dot">...</span></p>
              </div>
              <div slot="error" class="image-slot flex-center">
                <i class="iconfont"></i>
              </div>
            </el-image>
          </div>
        </div>
        <div class="info">
          <p class="name">{{ item.name }}</p>
          <p class="count" v-if="item.musicSize">单曲数{{ item.musicSize }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'SongerItem',
  data() {
    return {

    }
  },
  props: {
    songItem: {
      type: Array
    }
  },
  components: {

  },
  mounted() {

  },
  methods: {
    // 跳转到歌手详情界面
    toSinger(item) {
      this.$router.push({
        name: 'singerdetail',
        query: {
          id: item.id
        }
      })
    }
  }
}
</script>

<style lang='less' scoped>
.songer-box {
  // display: flex;
  .singer-list {
    display: flex;
    flex-wrap: wrap;
    margin-top: 30px;
    margin: 30px -15px 0;
    list-style: none;
    padding: 0;
    margin: 0;
    li {
      padding: 0 16px 30px;
      flex: 0 0 12.5%;
      max-width: 12.5%;
      .cover {
        position: relative;
        z-index: 2;
        padding-top: 100%;
        border-radius: 10%;
        background-color: #d2d3d2;
        cursor: pointer;
        .avatar {
          width: 100%;
          height: 100%;
          border-radius: 10%;
          position: absolute;
          top: 0;
          left: 0;
          overflow: hidden;
          .el-image {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 100%;
          }
          &:after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border-radius: 10%;
            -webkit-box-shadow: 1px 1px 0 rgba(0, 0, 0, 0.05) inset,
              -1px -1px 0 rgba(0, 0, 0, 0.05) inset;
            box-shadow: inset 1px 1px 0 rgba(0, 0, 0, 0.05),
              inset -1px -1px 0 rgba(0, 0, 0, 0.05);
          }
        }
      }
      .info {
        margin-top: 16px;
        text-align: center;
        cursor: pointer;
        .name {
          font-weight: 600;
          font-size: 1rem;
          line-height: 18px;
          word-break: break-word;
          &:hover {
            color: @color-theme;
          }
        }
        .count {
          font-size: 0.9rem;
          margin-top: 10px;
          color: @color-theme;
        }
      }
    }
  }
}
</style>
