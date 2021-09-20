<template>
  <div class="mv-box">
    <ul class="mv-list" v-if="mvs.length > 0">
      <li v-for="item of mvs" :key="item.id" :class="item.isLive ? 'live' : ''">
        <div class="cover">
          <div class="images">
            <el-image :key="item.image" :src="item.image" fit="cover" lazy>
              <div
                class="image-slot flex-center flex-column"
                slot="placeholder"
              >
                <i class="iconfont"></i>
              </div>
              <div slot="error" class="image-slot flex-center">
                <i class="el-icon-picture-outline"></i></div
            ></el-image>
          </div>
          <div class="count">
            <i class="arrow"></i>
            <span>{{ utils.tranNumber(item.playCount, 0) }}</span>
          </div>
          <div class="action">
            <el-button
              v-if="!item.isLive"
              class="play flex-center"
              title="播放"
              @click="toMVDetail(item.id, item.type)"
            >
              <i class="iconfont icon-bofang1"></i>
            </el-button>
            <el-button
              v-else
              class="play flex-center"
              title="播放"
              @click="toMVLive(item.id)"
            >
              <i class="iconfont icon-bofang1"></i
            ></el-button>
          </div>
          <div class="footer">
            <p>{{ item.nickName }}</p>
            <p>{{ item.duration }}</p>
          </div>
        </div>
        <div class="info">
          <h3 class="title ellipsis">{{ item.name }}</h3>
        </div>
      </li>
    </ul>
    <Empty v-else></Empty>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'MVList',
  data() {
    return {

    }
  },
  props: {
    mvs: {
      type: Array
    },
    type: {
      type: String
    }
  },
  components: {

  },
  mounted() {

  },
  methods: {
    // 视频详情
    toMVDetail(id) {
      this.movePlay()
      if (typeof id === 'number' || id.length < 10) {
        this.$router.push({
          name: 'MVDetail',
          query: {
            id
          }
        })
      } else {
        this.$router.push({
          name: 'videodetail',
          query: {
            id
          }
        })
      }
    },

    // 直播跳转
    toMvLive(id) {
      let url = `https://iplay.163.com/live?id=${id}`
      window.open(url, '_blank')
    },

    ...mapActions('player', ['movePlay'])
  }
}
</script>

<style lang='less' scoped>
.mv-box {
  padding: 15px 0;
  .mv-list {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    li {
      padding: 0 16px 30px 16px;
      flex: 0 0 25%;
      max-width: 25%;
      cursor: pointer;
      .cover {
        position: relative;
        z-index: 2;
        padding-top: 56%;
        border-radius: 6px;
        // background-color: #000;
        margin-bottom: 10px;
        .images {
          position: absolute;
          top: 0;
          left: 0;
          overflow: hidden;
          width: 100%;
          height: 100%;
          border-radius: 6px;
        }
        .count {
          position: absolute;
          right: 10px;
          top: 1px;
          height: 24px;
          padding-left: 8px;
          background: url('../../../assets/images/album-top.png') no-repeat 0;
          background-size: cover;
          color: #fff;
          font-size: 0.9rem;
          font-weight: 700;
          line-height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          .arrow {
            display: block;
            width: 0;
            height: 0;
            border-style: solid;
            border-width: 4px 0 4px 6px;
            border-color: transparent transparent transparent #ffffff;
            margin-right: 5px;
          }
          &:after {
            content: '';
            position: absolute;
            right: -14px;
            top: 0;
            width: 14px;
            height: 24px;
            background: url('../../../assets/images/album-top.png') no-repeat
              100%;
            background-size: cover;
          }
        }
        .action {
          display: none;
          position: absolute;
          top: 50%;
          left: 50%;
          -webkit-transform: translate(-50%, -50%);
          -ms-transform: translate(-50%, -50%);
          transform: translate(-50%, -50%);
          .play {
            width: 60px;
            height: 60px;
            padding: 0;
            border: none;
            border-radius: 50%;
            color: @color-dark;
            cursor: pointer;
            background-color: @color-dark;
            i {
              font-size: 3.4rem;
              color: @color-theme;
            }
          }
        }
        &:hover {
          .action {
            display: flex;
          }
        }
        .footer {
          width: 100%;
          height: 36px;
          background: rgba(0, 0, 0, 0.6);
          position: absolute;
          left: 0;
          bottom: 0;
          display: flex;
          justify-content: space-between;
          padding: 4px 10px;
          p {
            color: #ffffff;
          }
        }

        &.live {
          .cover {
            .foot {
              background: rgba(250, 40, 0, 0.75);
            }
          }
        }
      }
      .info {
        margin-top: 12px;
        h3 {
          font-size: 1rem;
          font-weight: 500;
          display: block;
          line-height: 1.3;
          color: @color-dark;
        }
      }
    }
  }
}
</style>
