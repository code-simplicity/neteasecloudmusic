<template>
  <div class="mv-detail container">
    <div class="left">
      <!-- xgplayer  -->
      <div v-if="destroy" ref="video"></div>
      <div class="video-footer">
        <h3 class="title flex-row">
          <i class="iconfont icon-shipin2"></i>{{ videoDetail.title }}
        </h3>
        <div class="tag">
          <a v-for="item of videoDetail.videoGroup" :key="item.id"
            >#{{ item.name }}</a
          >
        </div>
        <p class="flex-row">
          <span
            >发布时间：：{{
              utils.dateFormat(videoDetail.publishTime, 'YYYY-MM-DD')
            }}</span
          >
          <span v-if="videoDetail.playTime"
            >播放次数：{{ utils.tranNumber(videoDetail.playTime, 1) }}</span
          >
        </p>
        <div class="follow">
          <div
            class="box"
            :class="videoDetailInfo.isLike ? 'active' : ''"
            @click="likeResource"
          >
            <i class="iconfont icon-xihuan icon-like"></i>
            {{ videoDetail.praisedCount }}
          </div>
          <div
            class="box"
            :class="isVideoSubLike ? 'active' : ''"
            @click="getVideoSub"
          >
            <i class="iconfont icon-shoucang1 icon-collection"></i>
            {{ videoDetail.subscribeCount }}
          </div>
          <div class="box">
            <i class="iconfont icon-fenxiang icon-share"></i>
            {{ videoDetail.shareCount }}
          </div>
        </div>
      </div>
      <div class="comment-header">
        <div class="comment-header-title">
          <span class="comment-text">评论</span>
          <span>{{ commentTotle }}条评论</span>
        </div>
      </div>
      <CommentBox
        :currentCommentId="currentCommentId"
        @commentSubmit="commentSubmit"
        :clearContent="clearContent"
      ></CommentBox>
      <MainComment
        title="精彩评论"
        :commentList="hotComments"
        :currentCommentId="currentCommentId"
        @commentHandle="commentHandle"
        @cancelComment="cancelComment"
        @commentSubmit="commentSubmit"
        @commentLike="commentLike"
        v-if="hotComments.length > 0"
      ></MainComment>
      <MainComment
        title="最新评论"
        :commentList="comments"
        :currentCommentId="currentCommentId"
        @commentHandle="commentHandle"
        @cancelComment="cancelComment"
        @commentSubmit="commentSubmit"
        @commentLike="commentLike"
      ></MainComment>
      <!-- 评论分页 -->
      <div class="el-pagination">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          background
          :page-size="limit"
          layout="total, prev, pager, next"
          :total="commentTotle"
        >
        </el-pagination>
      </div>
    </div>
    <div class="right">
      <div class="profile module">
        <div class="card-header flex-row">
          <span>视频介绍</span>
        </div>
        <div class="content">
          <div class="author">
            <div class="avatar" @click="toUser(creator.userId)">
              <img
                :src="creator.avatarUrl"
                :alt="creator.nickname"
                :title="creator.nickname"
              />
            </div>
            <p class="name" @click="toUser(creator.userId)">
              {{ creator.nickname }}
            </p>
          </div>
          <p v-if="videoDetail.description">{{ videoDetail.description }}</p>
          <p v-else>暂无介绍</p>
        </div>
      </div>
      <div class="related module">
        <div class="card-header flex-row">
          <span>相关视频</span>
        </div>
        <ul>
          <li v-for="item of simiVideoList" :key="item.vid">
            <div class="avatar">
              <el-image
                :alt="item.title"
                :title="item.title"
                :src="item.coverUrl"
                fit="cover"
              ></el-image>
              <div class="action">
                <el-button
                  class="play flex-center"
                  title="播放"
                  v-if="!item.isLive"
                  @click="toDetail(item.vid)"
                >
                  <i class="iconfont icon-bofang1"></i
                ></el-button>
              </div>
            </div>
            <div class="info">
              <h3 class="flex-row ellipsis">
                <i class="iconfont icon-shipin2"></i>{{ item.title }}
              </h3>
              <div class="author">
                by.<span v-for="author of item.creator" :key="author.userId"
                  ><small> {{ author.userName }}</small></span
                >
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Player from "xgplayer"
import CommentBox from '@/components/MianComponent/CommentBox'
import MainComment from '@/components/MianComponent/MainComment'
import { resourceLike, sendComment, commentLike } from '@/api/service/api'
import {
  getVideoDetail, getVideoUrl, getRelatedAllVideo,
  getCommentVideo, getVideoSub, getVideoDetailInfo
} from '@/api/service/video'
export default {
  name: 'VideoDetail',
  data() {
    return {
      // 视频id
      videoId: '',
      // 评论传递的id
      currentCommentId: '',
      // 是否清空评论框内容
      clearContent: false,
      // 视频详情
      videoDetail: {},
      // 资源点赞数据
      videoDetailInfo: {},
      // 收藏成功的标志
      isVideoSubLike: false,
      // 页码
      currentPage: 1,
      // 每页数量
      limit: 20,
      // 偏移量
      offset: 0,
      // 评论总数
      commentTotle: 0,
      // 热门评论
      hotComments: [],
      // 全部评论
      comments: [],
      // 相似视频
      simiVideoList: [],
      // 创作者
      creator: {},
      // 实例化视频
      videoPlayer: null,
      destroy: true,
      // 视频地址
      videoUrl: [],
    }
  },
  components: {
    CommentBox,
    MainComment
  },

  computed: {

  },

  created() {
    let id = this.$route.query.id
    this.videoId = id
    if (id) {
      this._initialize(id)
    }
  },

  watch: {
    $route() {
      let id = this.$route.query.id || this.videoId
      if (id) {
        this._initialize(id)
      }
    }
  },
  mounted() {

  },
  methods: {

    getVideo() {
      this.videoPlayer = new Player({
        el: this.$refs.video,
        url: this.videoUrl[0].url,
        // 流式布局
        fluid: true,
        // 初始音量
        volume: 0.6,
        // 自动播放
        autoplay: true,
        // 国际化
        // lang: 'en',
        // 内联模式
        playsinline: true,
        // 是否直播
        isLive: true,
        // 跨域
        cors: true,
        // 初始化显示视频首帧
        videoInit: true,
        // 倍数
        playbackRate: [0.5, 0.75, 1, 1.5, 2],
        // 初始值
        defaultPlaybackRate: 1.0,
        // 视频下载
        download: true,
        // 画中画
        pip: true,
        // 网页全屏
        cssFullscreen: true,
        // 清晰度
        definition: true,
        errorTips: `请<spa>刷新</spa>测试哦`,
        // 清晰度切换配置
        definitionActive: 'hover',
      });
      this.videoPlayer.emit('resourceReady', [
        { name: '超清', url: this.videoUrl[0].url, },
        { name: '高清', url: this.videoUrl[0].url, },
        { name: '标清', url: this.videoUrl[0].url, }]);
    },

    // 去用户列表
    toUser(id) {
      this.$router.push({
        name: 'personal',
        query: {
          id
        }
      })
    },
    // 播放相关的mv
    toDetail(id) {
      this.$router.push({
        name: 'videodetail',
        query: {
          id
        }
      })
      // 视频id不同之后销毁dom实例，然后在加载，这样就不在一个页面显示多个内容了
      this.destroy = false
      this.$nextTick(() => {
        this.destroy = true
      })
    },

    // 获取相关视频
    async getRelatedAllVideo(id) {
      try {
        let res = await getRelatedAllVideo(id)
        if (res.code === this.constants.code_status) {
          this.simiVideoList = res.data
        }
      } catch (error) {
        console.log(error)
      }
    },

    // 每页显示的评论数量
    handleSizeChange(val) {
      this.limit = val
      this.offset = this.limit * this.currentPage
      this.getCommentVideo(this.videoId)
    },

    // 改变当前页码
    handleCurrentChange(val) {
      this.currentPage = val
      this.offset = val * this.limit
      this.getCommentVideo(this.videoId)
    },

    // 提交评论
    commentSubmit(content) {
      if (!content) {
        this.$message.error('没有输入内容呢！！！')
        return
      } else {
        this.loading = true
        let timestamp = new Date().getTime()
        let params = {
          id: this.videoId,
          type: 5,
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
            // 刷新评论
            this.getCommentVideo(this.videoId)
            this.clearContent = true
            this.loading = false
          }
        }).catch(error => {
          this.$message.error(error)
          this.loading = false
        })
      }
    },

    // 控制评论框显示
    commentHandle(id) {
      this.currentCommentId = id
    },

    // 取消评论
    cancelComment() {
      this.currentCommentId = ''
    },

    // 评论点赞
    async commentLike(id, liked) {
      let timestamp = new Date().getTime()
      let params = {
        id: this.videoId,
        cid: id,
        type: 5,
        timestamp
      }
      if (liked) {
        params.t = 0
      } else {
        params.t = 1
      }
      try {
        let res = await commentLike(params)
        if (res.code === this.constants.code_status) {
          // 获取歌单点赞的相关数据
          this.getCommentVideo(this.videoId)
        }
      } catch (error) {
        console.log(error)
      }

    },

    // 获取视频评论
    async getCommentVideo(id) {
      let timestamp = new Date().getTime()
      let params = {
        id,
        limit: this.limit,
        offset: this.offset,
        timestamp
      }
      try {
        let res = await getCommentVideo(params)
        if (res.code === this.constants.code_status) {
          // 获取评论总数
          this.commentTotle = res.total
          if (res.hotComments) {
            // 获取热门评论
            this.hotComments = res.hotComments
          } else {
            this.hotComments = []
          }
          this.comments = res.comments
        }
      } catch (error) {
        console.log(error)
      }
    },

    // 收藏mv/取消收藏
    async getVideoSub() {
      this.isVideoSubLike = true
      let t = 1
      if (this.isVideoSubLike) {
        t = 1
      } else {
        t = 2
      }
      try {
        let res = await getVideoSub(this.videoId, t)
        if (res.code === this.constants.code_status) {
          this.$message.success('收藏成功')
          this.getVideoDetailInfo(this.videoId)
          this.isVideoSubLike = false
        } else {
          this.$message.success('取消收藏成功')
          this.isVideoSubLike = true
        }
      } catch (error) {
        console.log(error)
      }
    },

    // mv资源点赞
    async likeResource() {
      let type = 5
      let t = 1
      if (this.videoDetailInfo.isLike) {
        t = 2
      } else {
        t = 1
      }
      let id = this.videoId
      try {
        let res = await resourceLike(type, t, id)
        if (res.code === this.constants.code_status) {
          this.$message.success('点赞成功')
          this.getVideoDetailInfo(this.videoId)
        } else {
          this.$message.success('取消点赞')
        }
      } catch (error) {
        console.log(error)
      }
    },

    // 获取视频点赞转发评论数数据
    async getVideoDetailInfo(id) {
      try {
        let res = await getVideoDetailInfo(id)
        if (res.code === this.constants.code_status) {
          let detail = {
            isLike: res.liked,
            likeCount: res.likedCount,
            shareCount: res.shareCount,
            commentCount: res.commentCount
          }
          this.videoDetailInfo = detail
        }
      } catch (error) {
        console.log(error)
      }
    },

    // 获取视频详情
    async getVideoDetail(id) {
      try {
        let res = await getVideoDetail(id)
        if (res.code === this.constants.code_status) {
          res.data.videoGroup.map(item => {
            if (item.name.indexOf('#') !== -1) {
              item.name = item.name.replace(/#/g, '')
            }
          })
          this.videoDetail = res.data
          this.creator = res.data.creator
          this.getVideoUrl(id)
        }
      } catch (error) {
        console.log(error)
      }
    },

    // 获取视频播放地址
    async getVideoUrl(id) {
      try {
        let res = await getVideoUrl(id)
        if (res.code === this.constants.code_status) {
          // 获取视频数据
          this.videoUrl = res.urls
          this.getVideo()
        }
      } catch (error) {
        console.log(error)
      }
    },

    // 初始化函数
    _initialize(id) {
      this.getVideoDetail(id)
      this.getVideoDetailInfo(id)
      this.getCommentVideo(id)
      this.getRelatedAllVideo(id)
    }
  },

  // 销毁vue实例
  destroyed() {
    this._initialize()
    this.getVideoUrl()
  }
}
</script>

<style lang='less' scoped>
.mv-detail {
  display: flex;
  margin-top: 10px;
  .left {
    flex: 1;
    width: 950px;
    padding: 16px;
    border-radius: 8px;
    margin-right: 10px;
    .video-footer {
      margin-top: 10px;
      .title {
        margin-bottom: 10px;
        position: relative;
        font-size: 1.4rem;
        color: @color-dark;
        i {
          margin-right: 10px;
          font-size: 1.8rem;
          margin-top: 1px;
          margin-left: -3px;
          color: @color-theme;
        }
      }
      .tag {
        margin-bottom: 8px;
        a {
          font-size: 0.9rem;
          color: @color-theme;
          margin-right: 10px;
          cursor: pointer;
        }
      }
      p {
        span {
          margin-right: 30px;
          font-size: 0.9rem;
          color: @color-dark;
        }
      }
    }
    .follow {
      display: flex;
      margin-top: 10px;
      .box {
        width: auto;
        border-radius: 16px;
        padding: 0 16px;
        background: @color-dark;
        width: 80px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: @color-blank;
        cursor: pointer;
        margin-right: 10px;
        i {
          font-size: 1.2rem;
          color: @color-blank;
          padding-right: 6px;
        }
        &.active {
          color: #fff;
          background: @color-theme;
          .icon-like {
            color: @color-dark;
          }
        }
      }
    }
    .comment-header {
      display: flex;
      justify-content: start;
      align-items: center;
      margin-bottom: 10px;
      margin-top: 10px;
      .comment-header-title {
        display: flex;
        align-items: center;
        .comment-text {
          margin-right: 40px;
          font-size: 1.2rem;
          color: @color-dark;
        }
        span {
          font-size: 1rem;
          color: @color-dark;
        }
      }
    }
    .el-pagination {
      margin-top: 10px;
      display: flex;
      justify-content: center;
    }
  }
  .right {
    width: 350px;
    flex-shrink: 0;
    .module {
      padding: 15px;
      width: 100%;
      border-radius: 8px;
      margin-bottom: 10px;
    }
    .profile {
      .author {
        display: flex;
        align-items: center;
        margin-bottom: 15px;
        margin-top: 5px;
        .avatar {
          width: 50px;
          height: 50px;
          border-radius: 20px;
          margin-right: 15px;
          cursor: pointer;
          img {
            width: 40px;
            height: 40px;
            border-radius: 20px;
          }
        }
        p {
          flex: 1;
          font-size: 1.1rem;
          cursor: pointer;
          color: @color-dark;
          &:hover {
            color: @color-theme;
          }
        }
      }
    }
    .related {
      padding-bottom: 6px;
      ul {
        li {
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          margin-bottom: 16px;
          .avatar {
            width: 100%;
            margin-right: 10px;
            flex-shrink: 0;
            position: relative;
            .action {
              display: none;
              position: absolute;
              top: 50%;
              left: 50%;
              -webkit-transform: translate(-50%, -50%);
              -ms-transform: translate(-50%, -50%);
              transform: translate(-50%, -50%);
              .play {
                width: 40px;
                height: 40px;
                padding: 0;
                border: none;
                border-radius: 50%;
                color: #fff;
                cursor: pointer;
                background-color: @color-theme;
                i {
                  font-size: 1.3rem;
                }
              }
            }
          }
          .info {
            height: 50px;
            width: calc(100% - 50px);
            flex: 1;
            display: flex;
            justify-content: center;
            flex-direction: column;
            h3 {
              width: 100%;
              font-size: 1rem;
              margin-bottom: 4px;
              margin-top: 5px;
              min-height: 20px;
              color: @color-dark;
              i {
                color: @color-theme;
                font-size: 1.5rem;
                margin-right: 5px;
              }
            }
            .author {
              font-size: 0.9rem;
              color: #a5a5c1;
              span {
                &::after {
                  content: '/';
                  margin-left: 6px;
                }
                &:last-child {
                  &::after {
                    content: '';
                  }
                }
              }
            }
          }
          &:hover {
            .action {
              display: flex;
            }
          }
        }
      }
    }
    .card-header {
      height: 20px;
      margin-bottom: 16px;
      font-weight: 600;
      color: @color-dark;
    }
  }
}
</style>
