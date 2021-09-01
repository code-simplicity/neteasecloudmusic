<template>
  <div class="play-list-detail container">
    <!-- 顶部-->
    <div class="left shadow">
      <div class="top">
        <div class="avatar">
          <el-image class="el-image"
                    src="songDetail.url"
                    fit="cover"></el-image>
        </div>
        <div class="info">
          <div class="title flex-between">
            <span>123</span>
          </div>
          <div class="user flex-row">
            <div class="avatar">
              <el-image src="url"
                        fit="cover"></el-image>
            </div>
            <span class="username">用户名</span>
            <span class="createTime">2017-12-22 创建</span>
          </div>
          <div class="user-button">
            <el-button type="primary"
                       size="small">
              <i class="iconfont icon-bofang1"></i>
              播放
            </el-button>
          </div>
          <div class="tag flex-row">标签：<a class="">列表</a></div>
          <div class="description">
            <b>介绍:</b>
            <p class="introduce"
               v-html="123"></p>
            <span class="flex-row">
              展开
              <i class="iconfont icon-shouqi"></i>
            </span>
          </div>
        </div>
      </div>
      <!-- 中间内容 -->
      <div class="content"
           v-loading="loading">
        <div class="title flex-row">
          <span class="song-list">歌曲列表</span>
          <span class="song-num">歌曲数量</span>
        </div>
        <SongDetailsList :songs="songs"></SongDetailsList>
      </div>
    </div>
    <div class="right"></div>
  </div>
</template>

<script>
import SongDetailsList from '@/components/MianComponent/SongDetailsList'
import { getPlayListDetail, getSongDetail } from '@/api/service/api'
import { createSong } from '@/model/song'
export default {
  name: 'PlayListDetail',
  data() {
    return {
      // 加载提示
      loading: false,
      // 歌单详情
      songDetail: {},
      // 歌曲列表
      songs: [],
      // 歌单创建者信息
      creator: {}
    }
  },
  components: {
    SongDetailsList
  },

  watch: {
    // 观察路由跳转携带过来的id
    $route(newId, oldId) {
      console.log(newId, oldId);
      let id = this.$route.query.id || this.singer.id
      if (id) {
        this._initIaLize(id)
      }
    }
  },
  mounted() {
    let id = this.$route.query.id
    this.artistId = id
    if (id) {
      this._initIaLize(id)
    }
  },
  methods: {
    // 获取歌单详情
    async getPlayListDetail(id, s) {
      // 获取当前时间的节点值
      let timestamp = new Date().valueOf()
      try {
        let res = await getPlayListDetail(id, s, timestamp)
        console.log('res', res);
        if (res.code === this.constants.code_status) {
          if (res.playlist.description !== null) {
            res.playlist.description = res.playlist.description.replace(
              /(\r\n|\n\r)/gm,
              '<br />'
            )
          }
          // 获取歌单详情
          this.songDetail = res.playlist
          this.creator = res.playlist.creator
          // 封装歌曲id
          let trackIds = res.playlist.trackIds
          // 数量超过一千，进行分割
          let arrLength = 1000
          let sliceArr = []
          for (let i = 0; i < trackIds.length; i += arrLength) {
            // 切割数组
            sliceArr.push(trackIds.slice(i, i + arrLength))
          }
          // 传参给该函数
          this.getSongDetail(sliceArr)
          console.log('sliceArr', sliceArr);
        }
      } catch (error) {
        console.log(error);
      }
    },

    // 获取歌曲列表
    async getSongDetail(sliceArr) {
      this.loading = true
      let before = sliceArr[0]
      let after = sliceArr[1]
      let timestamp = new Date().valueOf()
      let beforeIds = []
      let afterIds = []
      if (before) {
        before.map(item => {
          beforeIds.push(item.id)
        })
        // 格式化id，使用逗号依次隔开
        beforeIds = beforeIds.join(',')
      }
      if (after) {
        after.map(item => {
          afterIds.push(item.id)
        })
        afterIds = afterIds.join(',')
      }
      try {
        if (after) {
          let beforeRes = await getSongDetail(beforeIds, timestamp)
          let afterRes = await getSongDetail(afterIds, timestamp + 1)
          // 数组连接起来
          let res = beforeRes.songs.concat(afterRes.songs)
          this.songs = this._normaLizeSongs(res)
        } else {
          let beforeRes = await getSongDetail(beforeIds, timestamp)
          let res = beforeRes.songs
          this.songs = this._normaLizeSongs(res)
        }
        this.loading = false
      } catch (error) {
        console.log(error);
      }
    },

    // 处理歌曲
    _normaLizeSongs(res) {
      let resArr = []
      res.map(item => {
        resArr.push(createSong(item))
      })
      return resArr
    },

    // 初始化函数
    _initIaLize(id) {
      // 将获取的歌单id传出，50是详情数量
      this.getPlayListDetail(id, 50)
    }
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
    background: @color-dark;
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
          content: '';
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
        .description {
          display: flex;
          // flex-direction: column;
          line-height: 1.6;
          margin-top: 15px;
          p {
            line-height: 1.6;
            font-weight: 500;
            flex: 1;
            font-size: 1rem;
            margin-left: 10px;
          }
          span {
            flex-shrink: 0;
            cursor: pointer;
          }
        }
      }
    }
    .content {
      margin-bottom: 10px;
      .title {
        width: 100%;
        .song-list {
          margin-right: 60px;
          font-size: 1.4rem;
        }
        .song-num {
          font-size: 1rem;
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
