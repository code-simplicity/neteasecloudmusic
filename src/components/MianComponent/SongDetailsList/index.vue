<template>
  <div class="detail-box container">
    <div>

    </div>
    <table class="artist-table">
      <thead>
        <tr>
          <th class="th-index">序号</th>
          <th class="th-name">歌曲</th>
          <th class="th-artist">歌手</th>
          <th class="th-album">专辑</th>
          <th class="th-duration">时长</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) of songs"
            :key="item.id"
            :class="currentSong.id == item.id && playing
              ? 'playing'
              : ''
          ">
          <td>
            <div class="index-container flex-center">
              <span class="num">{{ utils.formatZero(index + 1, 2) }}</span>
              <div class="play-icon">
                <div class="line"
                     style="animation-delay: -1.2s;"></div>
                <div class="line"></div>
                <div class="line"
                     style="animation-delay: -1.5s;"></div>
                <div class="line"
                     style="animation-delay: -0.9s;"></div>
                <div class="line"
                     style="animation-delay: -0.6s;"></div>
              </div>
              <i class="iconfont icon-bofang3 play-btn"
                 @click="playSong(item, index)"
                 title="播放"></i>
              <i class="iconfont icon-zanting2 pause-btn"
                 @click="pauseSong"
                 title="暂停"></i>
            </div>
          </td>
          <td>
            <div class="name-container">
              <div class="avatar">
                <el-image :key="item.image + '?param=100y100'"
                          :src="item.image + '?param=100y100'"
                          fit="cover"
                          lazy>
                  <div slot="placeholder"
                       class="image-slot flex-center flex-column">
                    <i class="iconfont niceicon-3"></i>
                  </div>
                  <div slot="error"
                       class="image-slot flex-center">
                    <i class="el-icon-picture-outline"></i>
                  </div>
                </el-image>
              </div>
              <p class="name ellipsis"
                 :title="item.name">{{ item.name }}</p>
            </div>
          </td>
          <td>
            <div class="artist-container">
              <p class="author ellipsis"
                 :title="item.singer">
                {{ item.singer }}
              </p>
            </div>
          </td>
          <td>
            <div class="album-container">
              <p :title="item.album"
                 class="ellipsis">{{ item.album }}</p>
            </div>
          </td>
          <td>
            <div class="duration-container">
              <p>{{ utils.formatSecondTime(item.duration) }}</p>
              <div class="song-tools">
                <i class="iconfont niceicon-heart"
                   title="喜欢"></i>
                <i class="iconfont nicexiazai"
                   title="下载"></i>
                <i class="iconfont nicedot"
                   title="更多"></i>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'SongDetailsList',
  data() {
    return {

    }
  },
  props: {
    songs: {
      type: Array
    }
  },
  computed: {
    ...mapGetters(['currentIndex', 'playing', 'currentSong'])
  },
  components: {

  },
  mounted() {

  },
  methods: {
    // 播放
    playSong(item, index) {
      this.selectPlay({
        list: this.songs,
        index
      })
    },

    // 暂停
    pauseSong() {
      this.pausePlay()
    },

    ...mapActions([
      // 点击选择播放
      'selectPlay',
      // 点击播放全部
      'playAll',
      'pausePlay'
    ])
  }
}
</script>

<style lang='less' scoped>
.detail-box {
  width: 100%;
  .artist-table {
    width: 100%;
    table-layout: fixed;
    thead {
      width: 100%;
      height: 50px;
      line-height: 50px;
      background: #f7f7f7;
      border: 1px solid #d4d4d4;
      border-top: 2px solid #c20c0c;
      color: #666666;
      th {
        padding: 0 10px;
        text-align: left;
        font-weight: 600;
        white-space: nowrap;
        overflow: hidden;
        -o-text-overflow: ellipsis;
        text-overflow: ellipsis;
        border-left: 1px solid #dadada;

        &.th-index {
          width: 15%;
          text-align: center;
        }
        &.th-name {
          width: 35%;
        }
        &.th-artist {
          width: 25%;
        }
        &.th-album {
          width: 15%;
        }
        &.th-duration {
          width: 15%;
          text-align: right;
          padding-right: 40px;
        }
      }
    }
    tbody {
      width: 100%;
      tr {
        height: 50px;
        line-height: 50px;
        transition: background-color 0.2s linear;
        td {
          padding: 0 10px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          -o-text-overflow: ellipsis;
        }
        .index-container {
          .num {
            color: @color-blank;
            font-weight: 500;
          }
          .play-icon {
            display: none;
            height: 16px;
            min-width: 18px;
            overflow: hidden;
            margin-left: 10px;
            .line {
              width: 4px;
              height: 100%;
              margin-left: 2px;
              background-color: @color-theme;
              animation: play 1s linear infinite alternate;
            }
          }
          .play-btn {
            color: @color-theme;
            font-size: 1.6rem;
            display: none;
            text-align: left;
            cursor: pointer;
            margin-left: 10px;
          }
          .pause-btn {
            color: @color-theme;
            font-size: 1.6rem;
            display: none;
            text-align: left;
            cursor: pointer;
            margin-left: 10px;
          }
        }
        .name-container {
          display: flex;
          align-items: center;
          .avatar {
            width: 40px;
            height: 40px;
            border-radius: 8px;
            flex-shrink: 0;
            margin-right: 10px;
            img {
              width: 100%;
              border-radius: 8px;
            }
          }
        }
        .duration-container {
          text-align: right;
          padding-right: 16px;
          position: relative;
          p {
            padding-right: 10px;
          }
          .song-tools {
            display: flex;
            justify-content: flex-end;
            top: 50%;
            margin-top: -25px;
            right: 10px;
            position: absolute;
            display: none;
            i {
              flex-shrink: 0;
              cursor: pointer;
              margin-right: 15px;
              font-size: 20px;
            }
          }
        }
        &:nth-child(2n) {
          background: #f7f7f7;
        }
        &.playing {
          p {
            color: @color-theme;
          }
          i {
            color: @color-theme;
          }
          .index-container {
            .num {
              display: block;
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
          background: #e6e7e9;
          .index-container {
            .num {
              display: block;
            }
            .play-btn {
              display: block;
            }
          }
          // .duration-container {
          //   p {
          //     display: none;
          //   }
          //   .song-tools {
          //     display: flex;
          //   }
          // }
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
      p {
        cursor: pointer;
      }
    }
  }
}
</style>
