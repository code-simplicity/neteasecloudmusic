<template>
  <div ref="video"></div>
</template>

<script>
import Player from "xgplayer"
import { getVideoUrl } from '@/api/service/video'
export default {
  name: 'XgPlayer',
  data() {
    return {
      videoPlayer: null,
      // 视频播放地址
      //   vUrl: []
    }
  },
  props: ['videoid'],
  components: {

  },
  created() {

  },
  mounted() {
    let id = this.videoid
    if (id) {
      this.getVideoUrl(id)
    }
  },
  methods: {
    getVideo(url) {
      this.videoPlayer = new Player({
        el: this.$refs.video,
        url: url[0].url,
        width: "100%",
        height: "400px",
        // 初始音量
        volume: 0.6,
        // 自动播放
        autoplay: true,
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
        // 错误提示
        errorTips: `请<span>刷新</span>试试`,
        // 清晰度切换配置
        definitionActive: 'click'
      });
      this.videoPlayer.emit('resourceReady', [{ name: '高清', url: 'url1' }, { name: '超清', url: 'url2' }]);
    },

    // 获取视频播放地址
    async getVideoUrl(id) {
      try {
        let res = await getVideoUrl(id)
        if (res.code === this.constants.code_status) {
          this.getVideo(res.urls)

          this.vUrl = res.urls
        }
      } catch (error) {
        console.log(error)
      }
    },
  }
}
</script>

<style lang='less' scoped>
</style>
