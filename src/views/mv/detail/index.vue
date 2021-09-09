<template>
  <div class="mv-detail container">
    <div class="left shadow">
      <div class="video-content">
        <video-player
          class="video-player vjs-custom-skin"
          ref="videoPlayer"
          :options="playerOptions"
          :playsinline="true"
        >
        </video-player>
      </div>
      <div class="video-footer">
        <h3 class="title flex-row">
          <i class="iconfont"></i>{{ mvDetail.name }}
        </h3>
        <div class="tag">
          <a v-for="item of mvDetail.videoGroup" :key="item.id"
            >#{{ item.name }}</a
          >
        </div>
        <p class="flex-row">
          <span
            >发布时间：：{{
              utils.dateFormat(mvDetail.publishTime, 'YYYY-MM-DD')
            }}</span
          >
          <span v-if="mvDetail.playCount"
            >播放次数：{{ utils.tranNumber(mvDetail.playCount, 1) }}</span
          >
        </p>
        <div class="follow">
          <div
            class="box"
            :class="videoDetailInfo.isLike ? 'active' : ''"
            @click="likeResource"
          >
            <i class="iconfont icon-xihuan icon-like"></i>
            {{ videoDetailInfo.likeCount }}
          </div>
          <div class="box" :class="isMvSubLike ? 'active' : ''" @click="mvSub">
            <i class="iconfont icon-shoucang1 icon-collection"></i>
            {{ mvDetail.subCount }}
          </div>
          <div class="box">
            <i class="iconfont icon-fenxiang icon-share"></i>
            {{ videoDetailInfo.shareCount }}
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
      <div class="profile module shadow">
        <div class="card-header flex-row">
          <span>MV介绍</span>
        </div>
        <div class="content">
          <p v-if="mvDetail.desc">{{ mvDetail.desc }}</p>
          <p v-else>暂无介绍</p>
        </div>
      </div>
      <div class="related module shadow">
        <div class="card-header flex-row">
          <span>相关推荐</span>
        </div>
        <ul>
          <li v-for="item of simiNvList" :key="item.vid">
            <div class="avatar">
              <el-image
                :alt="item.name"
                :title="item.name"
                :src="item.cover"
                fit="cover"
              ></el-image>
              <div class="action">
                <el-button
                  class="play flex-center"
                  title="播放"
                  v-if="!item.isLive"
                  @click="toDetail(item.id)"
                >
                  <i class="iconfont icon-bofang1"></i
                ></el-button>
              </div>
            </div>
            <div class="info">
              <h3 class="flex-row ellipsis">
                <i class="iconfont icon-MV"></i>{{ item.name }}
              </h3>
              <div class="author">
                by.<span v-for="author of item.artists" :key="author.id"
                  ><small> {{ author.name }}</small></span
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
import CommentBox from '@/components/MianComponent/CommentBox'
import MainComment from '@/components/MianComponent/MainComment'
import {
  getMvUrl, getMvDetail, getMvDetailInfo, resourceLike,
  mvSub, getMvComment, sendComment, commentLike, simiNv
} from '@/api/service/api'
export default {
  name: 'MVDetail',
  data() {
    return {
      // 视频id
      videoId: '',
      // 评论传递的id
      currentCommentId: '',
      // 是否清空评论框内容
      clearContent: false,
      playerOptions: {
        autoplay: true,
        muted: false,
        language: 'en',
        playbackRates: [0.5, 1.0, 1.5, 2.0],
        // 是否视频一结束就重新开始。
        loop: false,
        preload: 'auto',
        aspectRatio: '16:9',
        sources: [{
          type: "video/mp4",
          src: ""
        }],
        notSupportedMessage: '此视频暂无法播放，请稍后再试',
        controlBar: {
          timeDivider: true,           // 当前时间和持续时间的分隔符
          durationDisplay: true,       // 显示持续时间
          remainingTimeDisplay: false, // 是否显示剩余时间功能
          fullscreenToggle: true       // 是否显示全屏按钮
        },
        poster: "../../../assets/images/mv-bg.png",
      },
      // mv详情
      mvDetail: {},
      // 资源点赞数据
      videoDetailInfo: {},
      // 收藏成功的标志
      isMvSubLike: false,
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
      // 相似mv
      simiNvList: []
    }
  },
  components: {
    CommentBox,
    MainComment
  },

  computed: {
    player() {
      return this.$refs.videoPlayer.player
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
    let id = this.$route.query.id
    if (id) {
      this.videoId = id
      this._initialize(id)
    }
  },
  methods: {

    // 播放相关的mv
    toDetail(id) {
      this.$router.push({
        name: 'MVDetail',
        query: {
          id
        }
      })
    },

    // 获取相关mv
    async simiNv(id) {
      try {
        let res = await simiNv(id)
        if (res.code === this.constants.code_status) {
          this.simiNvList = res.mvs
          console.log('this.simiNvList', this.simiNvList)
        }
      } catch (error) {
        console.log(error)
      }
    },

    // 每页显示的评论数量
    handleSizeChange(val) {
      this.limit = val
      this.offset = this.limit * this.currentPage
      this.getMvComment(this.videoId)
    },

    // 改变当前页码
    handleCurrentChange(val) {
      this.currentPage = val
      this.offset = val * this.limit
      this.getMvComment(this.videoId)
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
          type: 1,
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
            this.getMvComment(this.videoId)
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
        type: 1,
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
          this.getMvComment(this.videoId)
        }
      } catch (error) {
        console.log(error)
      }

    },

    // 获取MV评论
    async getMvComment(id) {
      let timestamp = new Date().getTime()
      let params = {
        id,
        limit: this.limit,
        offset: this.offset,
        timestamp
      }
      try {
        let res = await getMvComment(params)
        if (res.code === this.constants.code_status) {
          // 获取评论总数
          this.commentTotle = res.total
          console.log('this.commentTotle', this.commentTotle)
          if (res.hotComments) {
            // 获取热门评论
            this.hotComments = res.hotComments
          } else {
            this.hotComments = []
          }
          this.comments = res.comments
          console.log('this.hotComments', this.hotComments)
          console.log('this.comments', this.comments)
        }
      } catch (error) {
        console.log(error)
      }
    },

    // 收藏mv/取消收藏
    async mvSub() {
      this.isMvSubLike = true
      let t = 1
      if (this.isMvSubLike) {
        t = 1
      } else {
        t = 2
      }
      let mvid = this.videoId
      try {
        let res = await mvSub(mvid, t)
        if (res.code === this.constants.code_status) {
          this.$message.success('收藏成功')
          this.getMvDetailInfo(this.videoId)
          this.isMvSubLike = false
        } else {
          this.$message.success('取消收藏成功')
          this.isMvSubLike = true
        }
      } catch (error) {
        console.log(error)
      }
    },

    // mv资源点赞
    async likeResource() {
      let type = 1
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
          this.getMvDetailInfo(this.videoId)
        } else {
          this.$message.success('取消点赞')
        }
      } catch (error) {
        console.log(error)
      }
    },

    // 获取mv相关资源
    async getMvDetailInfo(id) {
      try {
        let res = await getMvDetailInfo(id)
        if (res.code === this.constants.code_status) {
          let detail = {
            isLike: res.liked,
            likeCount: res.likedCount,
            shareCount: res.shareCount,
            commentCount: res.commentCount
          }
          this.videoDetailInfo = detail
          console.log('this.videoDetailInfo', this.videoDetailInfo)
        }
      } catch (error) {
        console.log(error)
      }
    },

    // 获取mv数据
    async getMvDetail(id) {
      try {
        let res = await getMvDetail(id)
        if (res.code === this.constants.code_status) {
          res.data.videoGroup.map(item => {
            if (item.name.indexOf('#') !== -1) {
              item.name = item.name.replace(/#/g, '')
            }
          })
          this.mvDetail = res.data
          console.log('this.mvDetail', this.mvDetail)
        }
      } catch (error) {
        console.log(error)
      }
    },

    // 获取mv地址
    async getMvUrl(id) {
      try {
        let res = await getMvUrl(id)
        if (res.code === this.constants.code_status) {
          this.playerOptions.sources[0].src = res.data.url
          console.log(this.videoUrl)
        }
      } catch (error) {
        console.log(error)
      }
    },

    // 初始化函数
    _initialize(id) {
      this.getMvUrl(id)
      this.getMvDetail(id)
      this.getMvDetailInfo(id)
      this.getMvComment(id)
      this.simiNv(id)
    }
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
    .video-content {
      position: relative;
      padding-top: 56%;
      .video-player {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }
    }
    .video-footer {
      margin-top: 8px;
      .title {
        margin-bottom: 10px;
        position: relative;
        i {
          font-size: 24px;
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
          color: #999;
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
        background: rgb(214, 214, 214);
        width: 80px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: rgb(0, 0, 0);
        cursor: pointer;
        margin-right: 10px;
        i {
          font-size: 1.4rem;
          color: @color-dark;
          padding-right: 6px;
        }
        &.active {
          color: #fff;
          background: @color-theme;
          .icon-like {
            color: #fff;
          }
        }
      }
    }
    .comment-header {
      display: flex;
      justify-content: start;
      align-items: center;
      margin-bottom: 10px;
      border-bottom: 3px solid @color-theme;
      margin-top: 10px;
      .comment-header-title {
        display: flex;
        align-items: center;
        .comment-text {
          margin-right: 40px;
          font-size: 1.2rem;
        }
        span {
          font-size: 1rem;
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
    }
    .related {
      padding-bottom: 6px;
      ul {
        list-style: none;
        padding: 0;
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
      border-bottom: 2px solid @color-theme;
    }
  }
}
</style>
