<template>
  <div class="detail-box container">
    <div class="detail-header">
      <div class="detail-songs-list">
        <span v-if="songListShow" class="song-list">歌曲列表</span>
        <span v-if="songListShow">{{ songs.length }}首歌</span>
      </div>
      <div class="item play-item" @click="playAllSong">
        <i class="iconfont icon-bofang3"></i>
        播放全部
      </div>
      <div
        v-if="!isPerson"
        class="collect"
        @click="collect"
        :class="subscribed ? 'active' : ''"
      >
        <i class="iconfont icon-shoucang collect-shoucang"></i>
        {{ collectText }}
      </div>
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
        <tr
          v-for="(item, index) of songer"
          :key="item.id"
          :class="currentSong.id === item.id && playing ? 'playing' : ''"
        >
          <td>
            <div class="index-container flex-center">
              <span class="num">{{ utils.formatZero(index + 1, 2) }}</span>
              <div class="play-icon">
                <div class="line" style="animation-delay: -1.2s"></div>
                <div class="line"></div>
                <div class="line" style="animation-delay: -1.5s"></div>
                <div class="line" style="animation-delay: -0.9s"></div>
                <div class="line" style="animation-delay: -0.6s"></div>
              </div>
              <i
                class="iconfont icon-bofang3 play-btn"
                @click="playSong(item, index)"
                title="播放"
              ></i>
              <i
                class="iconfont icon-zanting2 pause-btn"
                @click="pauseSong"
                title="暂停"
              ></i>
            </div>
          </td>
          <td>
            <div class="name-container">
              <div class="avatar">
                <el-image
                  :key="item.image + '?param=100y100'"
                  :src="item.image + '?param=100y100'"
                  fit="cover"
                  lazy
                >
                  <div
                    slot="placeholder"
                    class="image-slot flex-center flex-column"
                  >
                    <i class="iconfont niceicon-3"></i>
                  </div>
                  <div slot="error" class="image-slot flex-center">
                    <i class="el-icon-picture-outline"></i>
                  </div>
                </el-image>
              </div>
              <p class="name ellipsis" :title="item.name">{{ item.name }}</p>
            </div>
          </td>
          <td>
            <div class="artist-container">
              <p class="author ellipsis" :title="item.singer">
                {{ item.singer }}
              </p>
            </div>
          </td>
          <td>
            <div class="album-container">
              <p :title="item.album" class="ellipsis">{{ item.album }}</p>
            </div>
          </td>
          <td>
            <div class="duration-container">
              <p>{{ utils.formatSecondTime(item.duration) }}</p>
              <div class="song-tools">
                <i class="iconfont niceicon-heart" title="喜欢"></i>
                <i class="iconfont nicexiazai" title="下载"></i>
                <i class="iconfont nicedot" title="更多"></i>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="el-pagination" v-if="songs.length > 40">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        background
        hide-on-single-page
        :page-size="pageSize"
        layout="total, prev, pager, next"
        :total="songs.length"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'SongDetailsList',
  data() {
    return {
      pageSize: 40,
      currentPage: 1
    }
  },
  props: {
    // 歌曲列表
    songs: {
      type: Array
    },
    // 订阅
    subscribed: {
      type: Boolean
    },
    // 个人是否订阅
    isPerson: {
      type: Boolean,
      default: false
    },
    // 是否开启显示多少首歌曲
    songListShow: {
      type: Boolean
    }
  },
  computed: {
    ...mapGetters(['currentIndex', 'playing', 'currentSong']),
    // 计算歌曲长度，切割进行分页
    songer() {
      return this.songs.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize)
    },
    // 计算是否订阅，显示具体文字
    collectText() {
      return this.subscribed ? '已收藏' : '收藏'
    },
    // 收藏图标的改变
    // collectIcon() {
    //   return this.subscribed ? 'icon-shoucang-hover' : 'icon-shoucang'
    // }
  },
  components: {

  },
  watch: {

  },
  mounted() {

  },
  methods: {
    // 收藏歌单
    async collect() {
      this.$emit('playlistSubscribe')
    },

    // 播放全部
    playAllSong() {
      this.playAll({
        list: this.songs
      })
    },

    // 每页显示的数量，这里做的是一个前端的分页，因为接口那块是没有分页的
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.currentPage = 1;
      this.pageSize = val;
    },

    // 改变当前页码
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
    },

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
      'selectPlay',
      'playAll',
      'pausePlay'
    ])
  }
}
</script>

<style lang="less" scoped>
.detail-box {
  width: 100%;
  .detail-header {
    margin-top: 16px;
    display: flex;
    align-items: center;
    flex-flow: row wrap;
    align-items: center;
    margin-bottom: 10px;
    .detail-songs-list {
      display: flex;
      align-items: center;
      flex-grow: 1;
      .song-list {
        margin-right: 40px;
        font-size: 1.5rem;
      }
      span {
        font-size: 1rem;
        flex: 0 0 30%;
      }
    }
    .item {
      background: @color-theme;
      color: @color-dark;
      font-weight: 300;
      border-radius: 40px;
      padding: 6px 12px;
      cursor: pointer;
      display: flex;

      align-content: flex-start;
      justify-content: center;
      transition: all 0.4s;
      .icon-bofang3 {
        font-size: 1.1rem;
        padding-right: 6px;
      }
    }
    .collect {
      background: @lyric-background;
      color: @color-dark;
      border-radius: 40px;
      padding: 6px 12px;
      // display: flex;
      margin-left: 20px;
      font-weight: 400;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      .collect-shoucang {
        margin-right: 4px;
      }
      &.active {
        background: @color-theme;
        color: @color-font-size-White;
        .icon-shoucang {
          align-items: center;
          font-size: 1.1rem;
        }
      }
    }
  }
  .el-pagination {
    margin-top: 10px;
    float: right;
  }
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
