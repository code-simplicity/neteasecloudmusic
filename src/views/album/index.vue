<template>
  <div class="album container">
    <div class="left">
      <div class="top">
        <div class="avatar">
          <img :src="albumDetail.picUrl" :alt="albumDetail.picUrl" />
        </div>
        <div class="info">
          <div class="title flex-between">
            <span class="name">{{ albumDetail.name }}</span>
          </div>
          <div class="user flex-row">
            <div class="avatar">
              <img :src="albumCreator.picUrl" :alt="albumCreator.picUrl" />
            </div>
            <p class="nikename">{{ albumCreator.name }}</p>
            <p class="create-time">
              {{ utils.dateFormat(albumDetail.publishTime, 'YYYY-MM-DD') }}创建
            </p>
          </div>
          <div class="tag flex-row">发行公司：{{ albumDetail.company }}</div>
          <div class="desc">
            <p class="ellipsis-two" v-html="albumDetail.description"></p>
            <span
              class="flex-row"
              v-if="txtLength(albumDetail.description) > 50"
            >
              全部<i class="iconfont"></i>
            </span>
          </div>
        </div>
      </div>
      <div class="content">
        <SongDetailsList :songs="songs"></SongDetailsList>
        <div class="commen-header">
          <span class="comment-text">评论</span>
          <span>{{ totle }}条评论</span>
        </div>
        <CommentBox
          :currentCommentId="currentCommentId"
          @commentSubmit="commentSubmit"
          :clearContent="clearContent"
        ></CommentBox>
        <div>
          <MainComment
            title="最新评论"
            :commentList="commentList"
            :currentCommentId="currentCommentId"
            @commentHandle="commentHandle"
            @commentSubmit="commentSubmit"
            @cancelComment="cancelComment"
            @commentLike="commentLike"
          >
          </MainComment>
        </div>
        <!-- 评论分页 -->
        <div class="el-pagination">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            background
            :page-size="limit"
            layout="total, prev, pager, next"
            :total="totle"
          >
          </el-pagination>
        </div>
      </div>
    </div>
    <div class="right">
      <div class="related module">
        <div class="card-header flex-row">
          <span>热门专辑</span>
        </div>
        <ul>
          <li v-for="item of hotAlbums" :key="item.id">
            <div class="avatar">
              <img :src="item.picUrl" :alt="item.name" :title="item.name" />
            </div>
            <div class="info">
              <h2 class="ellipsis" :title="item.name">
                {{ item.name }}
                <span
                  >by. <small> {{ item.artist.name }}</small></span
                >
              </h2>
            </div>
          </li>
        </ul>
      </div>
      <div class="comment module">
        <div class="card-header flex-row">
          <span>精彩评论</span>
        </div>
        <ul>
          <li v-for="item of albumComments" :key="item.id">
            <div class="avatar">
              <img
                :src="item.user.avatarUrl"
                :alt="item.user.nickname"
                :title="item.user.nickname"
              />
            </div>
            <div class="info">
              <h2>
                {{ item.user.nickname }}
                <small> · {{ utils.formatMsgTime(item.time) }}</small>
              </h2>
              <p>{{ item.content }}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { createSong } from '@/model/song'
import SongDetailsList from '@/components/MianComponent/SongDetailsList'
import MainComment from '@/components/MianComponent/MainComment'
import CommentBox from '@/components/MianComponent/CommentBox'
import { getAlbumData, getArtistAlbum, getCommentAlbum } from '@/api/service/album'
import {
  sendComment, commentLike
} from '@/api/service/comment'
export default {
  name: 'Album',
  data() {
    return {
      // 专辑详情
      albumDetail: {},
      // 创作者信息
      albumCreator: {},
      // 专辑歌曲
      songs: [],
      // 专辑描述
      albumSubscribers: [],
      // 专辑评论
      albumComments: [],
      // 热门专辑
      hotAlbums: [],
      // 专辑id
      albumId: '',
      // 评论的id
      currentCommentId: '',
      currentPage: 1,
      limit: 20,
      totle: 0,
      offset: 0,
      // 是否清空评论框内容
      clearContent: false,
      // 最新评论列表
      commentList: [],
      // 专辑热门评论列表
      commentHotList: [],
    }
  },
  components: {
    SongDetailsList,
    MainComment,
    CommentBox
  },
  computed: {
    txtLength() {
      return function (txt) {
        if (txt) {
          return txt.length
        }
      }
    }
  },

  watch: {
    $route(newVal, oldVal) {
      console.log(newVal, oldVal)
      let id = this.$route.query.id
      if (id) {
        this._initialize(id)
      }
    }
  },
  mounted() {
    let id = this.$route.query.id
    this.albumId = id
    if (id) {
      this._initialize(id)
    }
  },
  methods: {
    // 给评论点赞
    async commentLike(id, liked) {
      let timestamp = new Date().getTime()
      let params = {
        id: this.albumId,
        cid: id,
        type: 3,
        timestamp
      }
      // 判断是已经点赞了还是取消点赞
      if (liked) {
        params.t = 0
      } else {
        params.t = 1
      }
      try {
        let res = await commentLike(params)
        if (res.code === this.constants.code_status) {
          // 获取歌单点赞的相关数据
          this.getCommentAlbum(this.albumId)
        }
      } catch (error) {
        console.log(error);
      }
    },
    // 点击评论,打开评论框
    commentHandle(id) {
      // 将父组件id传递到子组件，用于判断是否是同一个账户
      this.currentCommentId = id
    },

    // 取消评论
    cancelComment() {
      this.currentCommentId = ''
    },
    // 评论最新提交
    commentSubmit(content) {
      if (!content) {
        this.$message.error('没有输入内容啊')
        return
      } else {
        // 获取当前的时间
        let timestamp = new Date().getTime()
        let params = {
          id: this.albumId,
          type: 3,
          content: content,
          timestamp
        }
        if (this.currentCommentId === '') {
          // 发表评论
          params.t = 1
        } else {
          // 回复
          params.t = 2
          params.commentId = this.currentCommentId
        }
        sendComment(params).then(res => {
          if (res.code === this.constants.code_status) {
            this.$message.success('提交成功')
            this.cancelComment()
            // 刷新评论列表
            this.getCommentAlbum(this.albumId)
            this.clearContent = true
          }
        }).catch(error => {
          this.$message.error({
            title: error.data.dialog.title,
            message: error.data.dialog.subtitle
          })
        })
      }
    },

    // 每页显示的评论数量
    handleSizeChange(val) {
      this.limit = val
      this.offset = this.limit * this.currentPage
      this.getCommentAlbum(this.albumId)
    },

    // 改变当前页码
    handleCurrentChange(val) {
      this.currentPage = val
      this.offset = val * this.limit
      this.getCommentAlbum(this.albumId)
    },

    // 获取专辑评论
    async getCommentAlbum(id) {
      let params = {
        id,
        limit: this.limit,
        offset: this.offset
      }
      try {
        let res = await getCommentAlbum(params)
        if (res.code === this.constants.code_status) {
          this.albumComments = res.hotComments
          this.commentHotList = res.hotComments
          this.commentList = res.comments
          this.totle = res.total
        }
      } catch (error) {
        console.log(error)
      }
    },

    // 获取歌手专辑
    async getArtistAlbum() {
      let params = {
        id: this.albumCreator.id,
        limit: this.limit,
        offset: this.offset
      }
      try {
        let res = await getArtistAlbum(params)
        if (res.code === this.constants.code_status) {
          this.hotAlbums = res.hotAlbums
        }
      } catch (error) {
        console.log(error)
      }
    },

    // 获取专辑内容
    async getAlbumData(id) {
      try {
        let res = await getAlbumData(id)
        if (res.code === this.constants.code_status) {
          this.albumDetail = res.album
          this.albumCreator = res.album.artist
          this.songs = this._normalizeSongs(res.songs)
          this.getArtistAlbum()
        }
      } catch (error) {
        console.log(error)
      }
    },

    // 格式化歌曲
    _normalizeSongs(list) {
      let res = []
      list.map(item => {
        if (item.id) {
          res.push(createSong(item))
        }
      })
      return res
    },

    // 初始化函数
    _initialize(id) {
      this.getAlbumData(id)
      this.getCommentAlbum(id)
    }
  }
}
</script>

<style lang='less' scoped>
.album {
  display: flex;
  align-items: flex-start;
  .left {
    flex: 1;
    width: 950px;
    padding: 16px;
    border-radius: 8px;
    margin-right: 20px;
    .top {
      display: flex;
      .avatar {
        width: 200px;
        height: 200px;
        border-radius: 8px;
        position: relative;
        margin-right: 30px;
        flex-shrink: 0;
        .img {
          width: 100%;
          height: 100%;
          border-radius: 8px;
          position: relative;
        }
        &::before {
          content: '';
          width: 95%;
          height: 95%;
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
          width: 100%;
          font-size: 1.3rem;
          font-weight: 700;
          line-height: 24px;
          margin-bottom: 20px;
          margin-top: 10px;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
          .name {
            color: @color-dark;
          }
        }
        .user {
          margin-bottom: 16px;
          .avatar {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            position: relative;
            margin-right: 15px;
            img {
              width: 100%;
              height: 100%;
              position: relative;
              border-radius: 50%;
            }
          }
          .nikename {
            font-size: 1rem;
            margin-right: 30px;
            color: @color-dark;
          }
          .create-time {
            font-size: 1rem;
            color: @color-dark;
          }
        }
        .tag {
          color: @color-dark;
          a {
            color: #fff;
            background: @color-theme;
            margin-right: 15px;
            font-size: 12px;
            cursor: pointer;
            padding: 4px 12px;
            border-radius: 15px;
            &::after {
              // content: '，'
            }
            &:last-child {
              &::after {
                content: '';
              }
            }
          }
        }
        .desc {
          display: flex;
          flex-direction: column;
          line-height: 1.6;
          margin-top: 16px;
          p {
            line-height: 1.6;
            font-weight: 400;
            flex: 1;
            font-size: 1rem;
          }
          span {
            flex-shrink: 0;
            color: @color-dark;
            cursor: pointer;
          }
        }
      }
    }
    .content {
      margin-top: 16px;
      .commen-header {
        margin-bottom: 20px;
        span {
          color: @color-dark;
        }
      }
      .el-pagination {
        margin-top: 10px;
        display: flex;
        justify-content: center;
      }
    }
  }
  .right {
    width: 350px;
    flex-shrink: 0;
    .module {
      padding: 15px;
      width: 100%;
      border-radius: 8px;
      margin-bottom: 20px;
    }
    .related {
      padding-bottom: 5px;
      span {
        color: @color-dark;
        padding-bottom: 5px;
      }
      ul {
        li {
          display: flex;
          margin-bottom: 16px;
          cursor: pointer;
          .avatar {
            width: 60px;
            height: 60px;
            border-radius: 8px;
            margin-right: 15px;
            flex-shrink: 0;
            img {
              width: 100%;
              border-radius: 8px;
            }
          }
          .info {
            width: calc(100% - 60px);
            height: 50px;
            flex: 1;
            display: flex;
            justify-content: center;
            flex-direction: column;
            h2 {
              width: 100%;
              font-size: 1rem;
              margin-bottom: 10px;
              color: @color-dark;
            }
            span {
              font-size: 0.9rem;
              color: @color-dark;
            }
            &:hover {
              h2 {
                color: @color-theme;
              }
            }
          }
        }
      }
    }
    .comment {
      span {
        color: @color-dark;
      }
      ul {
        li {
          padding: 10px 0;
          width: 100%;
          display: flex;
          .avatar {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            margin-right: 12px;
            flex-shrink: 0;
            img {
              width: 100%;
              border-radius: 50%;
            }
          }
          .info {
            flex: 1;
            h2 {
              font-size: 15px;
              margin-right: 5px;
              margin-bottom: 10px;
              color: @color-dark;
              small {
                font-size: 12px;
                color: #a5a5c1;
                font-weight: 200;
              }
            }
            p {
              width: 100%;
              font-size: 12px;
              color: @color-dark;
              line-height: 1.6;
              padding: 5px 10px;
              background: #444444;
              margin-top: 5px;
              border-radius: 3px;
            }
          }
        }
      }
    }
  }
}
</style>
