<template>
  <div class="r-playlist">
    <div
      class="r-playlist-item"
      v-for="(item, index) in songMusic"
      :key="item.id"
      :class="
        index === currentIndex && currentSong.id == item.id && playing
          ? 'playing'
          : ''
      "
    >
      <div class="wrapper flex-center">
        <div class="index-container flex-center">
          <div class="avatar">
            <el-image
              class="avatar-img"
              :src="item.image"
              fit="cover"
            ></el-image>
          </div>
          <div class="play-icon">
            <div class="line" style="animation-delay: -1.2s"></div>
            <div class="line" style="animation-delay: -1s"></div>
            <div class="line" style="animation-delay: -0.8s"></div>
            <div class="line" style="animation-delay: -0.6s"></div>
            <div class="line" style="animation-delay: -0.4s"></div>
          </div>
          <i
            class="iconfont icon-bofang1 play-btn"
            @click="playSong(item, index)"
          ></i>
          <i class="iconfont icon-zanting2 pause-btn" @click="pauseSong"></i>
        </div>
        <div class="r-info" @click="toAlbum(item.albumId)">
          <div class="r-name">
            <span>{{ item.name }}</span>
          </div>
          <div class="r-duration">
            <span>{{ utils.formatSecondTime(item.duration) }}</span>
          </div>
          <div class="r-singer">
            <span>{{ item.singer }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  mapGetters,
  mapActions
} from 'vuex'
export default {
  name: 'NewSongList',
  data() {
    return {

    }
  },
  props: {
    songMusic: {
      type: Array
    }
  },
  components: {

  },
  // 计算属性获取vuex状态
  computed: {
    ...mapGetters('player', ['currentIndex', 'currentSong', 'playing'])
  },
  mounted() {

  },
  methods: {
    // 到专辑列表
    toAlbum(albumId) {
      this.$router.push({
        name: 'album',
        query: {
          id: albumId
        }
      })
    },
    // 播放
    playSong(item, index) {
      this.selectPlay({
        list: this.songMusic,
        index
      })
    },
    // 暂停
    pauseSong() {
      this.pausePlay()
    },
    /**
     * 'selectPlay', ==>选择播放
     *  'pausePlay', ==>暂停
     *  'playAll'==>播放全部
     */
    ...mapActions('player', ['selectPlay', 'pausePlay', 'playAll'])
  }
}
</script>

<style lang="less" scoped>
.r-playlist {
  display: flex;
  flex-wrap: wrap;
  margin-top: 10px;
  // background: #f5f5f5;
  .r-playlist-item {
    flex: 0 0 50%;
    max-width: 50%;
    margin-bottom: 20px;
    height: 70px;
    margin: 10px 0;
    padding: 0 15px 20px 30px;
    .wrapper {
      width: 100%;
      height: 70px;
      justify-content: start;
      padding-right: 2%;
      border-radius: 5px;
      position: relative;
      .index-container {
        width: 70px;
        margin-right: 20px;
        position: relative;
        .avatar {
          width: 70px;
          height: 70px;
          position: absolute;
          border-radius: 4px;
          .avatar-img {
            width: 100%;
            height: 100%;
            border-radius: 8px;
          }
        }
        .play-icon {
          display: none;
          height: 16px;
          min-width: 18px;
          overflow: hidden;
          position: relative;
          z-index: 1;
          .line {
            width: 2px;
            height: 100%;
            margin-left: 2px;
            background-color: #ff410f;
            animation: play 0.9s linear infinite alternate;
          }
        }
        .play-btn {
          color: @color-dark;
          font-size: 2rem;
          display: none;
          text-align: left;
          cursor: pointer;
          position: relative;
          &:hover {
            color: rgb(180, 182, 179);
          }
        }
        .pause-btn {
          color: @color-theme;
          font-size: 2rem;
          display: none;
          text-align: left;
          cursor: pointer;
          position: relative;
        }
      }
      .r-info {
        flex: 1;
        cursor: pointer;
        .r-name {
          font-size: 1rem;
          font-weight: 600;
          color: @color-dark;
        }
        .r-singer {
          font-size: 0.8rem;
          font-weight: 600;
          color: @color-dark;

          &:after {
            content: '/';
            margin: 0 3px;
          }
          &:last-child {
            &:after {
              content: '';
            }
          }
        }
        .r-duration {
          font-size: 1rem;
          text-align: end;
          color: @color-dark;
        }
      }
    }
    &.playing {
      div {
        color: @color-theme;
      }
      i {
        color: @color-theme;
      }
      .index-container {
        .num {
          display: none;
        }
        .play-icon {
          display: flex;
        }
        .play-btn {
          display: none;
        }
      }
    }
    &:hover {
      .index-container {
        .avatar {
          &:after {
            background-color: rgba(0, 0, 0, 0.5);
          }
        }
        .play-btn {
          display: block;
        }
      }
      &.playing {
        .index-container {
          .play-btn {
            display: none;
          }
          .play-icon {
            display: none;
          }
          .pause-btn {
            display: block;
          }
        }
      }
    }
  }
}
</style>
