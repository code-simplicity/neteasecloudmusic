<template>
  <div class="r-playlist">
    <div
      class="r-playlist-item"
      v-for="item of songMusic"
      :key="item.id"
      :class="numClass"
      :title="item.name"
      @click="toDetail(item)"
    >
      <div class="wrapper">
        <div class="cover">
          <div class="image">
            <el-image
              :key="item.picUrl || item.coverImgUrl + '?param=300y300'"
              :src="item.picUrl || item.coverImgUrl + '?param=300y300'"
              lazy
            >
              <div
                slot="placeholder"
                class="image-slot flex-center flex-column"
              >
                <i class="iconfont"></i>
                <p>加载中<span class="dot">...</span></p>
              </div>
              <div slot="error" class="image-slot flex-center">
                <i class="el-icon-picture-outline"></i>
              </div>
            </el-image>
          </div>
          <div class="count">
            <i class="iconfont icon-bofangliang" :title="item.playCount"></i>
            <span class="playcount">{{
              utils.tranNumber(item.playCount, 0)
            }}</span>
            <span class="play-music-status"
              ><i class="iconfont icon-bofang"></i
            ></span>
          </div>
        </div>
      </div>
      <div class="info">
        <h2 class="name ellipsis-two">
          {{ item.name }}
        </h2>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  name: 'PopularPlayList',
  data() {
    return {

    }
  },
  props: {
    songMusic: {
      type: Array
    },
    num: {
      type: Number,
      default: 8
    }
  },
  components: {

  },
  // 计算属性获取vuex状态
  computed: {
    numClass() {
      return this.num == 2 ? 'two' : 'eight'
    },
    ...mapGetters('player', ['currentIndex', 'playing', 'currentSong']),
  },
  mounted() {

  },
  methods: {
    // // 播放歌单
    // playAllSong() {
    //   this.playAll({
    //     list: this.songMusic
    //   })
    // },

    // 查看推荐详情
    toDetail(item) {
      let query = {
        id: item.id
      }
      this.$router.push({
        name: 'playlistdetail',
        query
      })
    },

    ...mapActions('player', ['playAll'])
  }
}
</script>

<style lang="less" scoped>
.r-playlist {
  display: flex;
  flex-wrap: wrap;
  margin: 0 -12px;
  .r-playlist-item {
    flex: 0 0 20%;
    max-width: 20%;
    // margin-bottom: 20px;
    height: 100%;
    padding: 0 15px 20px 15px;
    cursor: pointer;
    &.two {
      flex: 0 0 50%;
      max-width: 50%;
    }
    .wrapper {
      width: 100%;
      height: 100%;
      justify-content: start;
      // padding-right: 10px;
      border-radius: 5px;
      position: relative;
      &:before,
      &:after {
        content: '';
        width: 100%;
        height: 100%;
        background: rgba(194, 194, 194, 0.2);
        position: absolute;
        top: 0;
        transition: all 0.4s;
      }
      &:before {
        right: 6px;
        transform: scale(0.85);
        transform-origin: 100% 50%;
        z-index: 2;
        border-radius: 2px;
        opacity: 0.9;
      }
      &:after {
        right: 1px;
        transform: scale(0.73);
        transform-origin: 100% 50%;
        z-index: 1;
        border-radius: 2px;
        opacity: 0.5;
      }
      .cover {
        position: relative;
        z-index: 2;
        padding-top: 100%;
        border-radius: 8px;
        background-color: #d9d9d9;
        .image {
          position: absolute;
          top: 0;
          left: 0;
          overflow: hidden;
          width: 100%;
          height: 100%;
          border-radius: 8px;
          &:after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border-radius: 2px;
            -webkit-box-shadow: 1px 1px 0 rgba(0, 0, 0, 0.05) inset,
              -1px -1px 0 rgba(0, 0, 0, 0.05) inset;
            box-shadow: inset 1px 1px 0 rgba(0, 0, 0, 0.05),
              inset -1px -1px 0 rgba(0, 0, 0, 0.05);
          }
          img {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 100%;
          }
        }
        .count {
          position: absolute;
          width: 100%;
          left: 0;
          bottom: 0;
          height: 28px;
          // background-position: 0 -577px;
          background: url('../../../assets/images/coverall.png') no-repeat;
          background-size: cover;
          color: #ccc;
          font-size: 12px;
          font-weight: 700;
          line-height: 24px;
          display: flex;
          align-items: center;
          // justify-content: center;
          .arrow {
            display: block;
            width: 0;
            height: 0;
            border-style: solid;
            border-width: 4px 0 4px 6px;
            border-color: transparent transparent transparent @color-dark;
            margin-right: 5px;
          }
          &:after {
            content: '';
            position: absolute;
            right: -14px;
            top: 0;
            width: 14px;
            height: 24px;
            background-size: cover;
          }
          .icon-bofangliang {
            float: left;
            margin: 0 10px;
            color: @color-dark;
            font-size: 0.9rem;
          }
          .playcount {
            float: left;
            color: @color-dark;
            font-size: 0.9rem;
          }
          .play-music-status {
            margin-left: auto;
            right: 0;
            padding-right: 8px;
            .icon-bofang {
              font-size: 1rem;
              color: @color-dark;

              &:hover {
                color: @color-theme;
              }
            }
          }
        }
      }
    }
    .info {
      margin-top: 15px;
      .name {
        font-size: 1em;
        color: @color-dark;
      }
    }
  }
}
</style>
