<template>
  <div class="mv-detail container">
    <div class="left shadow">
      <div class="video-content">
        <video
          :src="videoUrl"
          controls="controls"
          controlslist="nodownload"
          autoplay
        ></video>
      </div>
      <div class="video-footer">
        <h3 class="title flex-row"><i class="iconfont"></i></h3>
        <div class="tag">
          <a>#12</a>
        </div>
        <p class="flex-row">
          <span>发布时间：</span>
          <span>播放次数：</span>
        </p>
        <div class="follow">
          <div class="box">
            <i></i>
            <i></i>
            <i></i>
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
import { getMvUrl } from '@/api/service/api'
export default {
  name: 'MVDetail',
  data() {
    return {
      // 视频地址
      videoUrl: '',
      // 视频id
      videoId: '',
      // 评论传递的id
      currentCommentId: '',
      // 是否清空评论框内容
      clearContent: false,
    }
  },
  components: {
    CommentBox
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

    // 获取mv地址
    async getMvUrl(id) {
      try {
        let res = await getMvUrl(id)
        if (res.code === this.constants.code_status) {
          this.videoUrl = res.data.url
          console.log(this.videoUrl)
        }
      } catch (error) {
        console.log(error)
      }
    },

    // 初始化函数
    _initialize(id) {
      this.getMvUrl(id)
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
      padding-top: 52%;
      video {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: #000;
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
        background: #000;
        margin-left: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: darkblue;
        cursor: pointer;
        i {
          font-size: 1.5rem;
          color: darkcyan;
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
