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
          <div class="box">
            <i class="iconfont icon-xihuan icon-like"></i>
          </div>
          <div class="box">
            <i class="iconfont icon-shoucang1 icon-collection"></i>
          </div>
          <div class="box">
            <i class="iconfont icon-fenxiang icon-share"></i>
          </div>
        </div>
      </div>
      <div class="comment-header">
        <div class="comment-header-title">
          <span class="comment-text">评论</span>
          <span>{{}}条评论</span>
        </div>
      </div>
      <CommentBox
        :currentCommentId="currentCommentId"
        @commentSubmit="commentSubmit"
        :clearContent="clearContent"
      ></CommentBox>
    </div>
  </div>
</template>

<script>
import CommentBox from '@/components/MianComponent/CommentBox'
import { getMvUrl, getMvDetail } from '@/api/service/api'
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
    }
  },
  components: {
    CommentBox
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
    // 提交评论
    commentSubmit() {

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
    margin-right: 20px;
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
        margin-left: 16px;
        width: 60px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: darkblue;
        cursor: pointer;
        i {
          font-size: 1.5rem;
          color: rgb(40, 112, 112);
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
  }
}
</style>
