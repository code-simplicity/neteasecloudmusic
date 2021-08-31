<template>
  <!-- vue过度 -->
  <transition name="player">
    <div class="music-player flex-row" v-show="playList.length > 0">
      <!-- <div class="music-player flex-row"> -->
      <div class="container" style="z-index: 30">
        <div class="wrapper flex-row">
          <!-- 左边内容 -->
          <div class="music-player-left flex-row">
            <div class="play-btn">
              <i class="iconfont icon-shangyiqu1" @click="pervSong"></i>
              <div class="icon-play flex-center" @click="switchPlaying">
                <i class="iconfont" :class="playIcon"></i>
              </div>
              <i class="iconfont icon-xiayiqu" @click="nextSong"></i>
            </div>
          </div>
          <!-- 中间内容 -->
          <div class="music-player-center">
            <div class="cover">
              <el-image
                style="width: 60px"
                :src="currentSong.image ? currentSong.image : defaultCover"
                fit="cover"
                @click="toPlayer(currentSong)"
              ></el-image>
            </div>
            <div class="info">
              {{ currentLyricTxt }}
              <div class="top flex-between">
                <h2 class="name">
                  {{ currentSong.name ? currentSong.name : "未选择播放歌曲" }}
                  <span>{{ currentSong.singer }}</span>
                </h2>
              </div>
              <div class="progress-wrap flex-row">
                <a-slider
                  v-model="progressBar"
                  :tip-formatter="progressFormat"
                  :disabled="currentIndex === -1"
                  @change="changeProgress"
                  @afterChange="changeProgressAfter"
                />
                <span class="time" v-if="currentSong.duration">
                  {{ formatTime(currentTime) }}
                  {{ formatTime(currentSong.duration) }}
                </span>
                <span v-else class="time">00:00 / 00:00</span>
              </div>
            </div>
          </div>
          <!-- 右边内容 -->
          <div class="music-player-right flex-row">
            <div class="volume-wrap flex-row">
              <i
                class="iconfont volume-icon"
                @click="changeMuted"
                :class="mutedIcon"
              ></i>
              <a-slider v-model="volumeNum" @change="changeVolume" />
            </div>
            <div class="tool">
              <i class="iconfont" :class="modeIcon" @click="changeMode"></i>
              <i class="iconfont icon-geci" @click="openLyric"></i>
              <i class="iconfont icon-bofangliebiao"></i>
            </div>
          </div>
          <!-- 音乐h5 -->
          <audio
            ref="audio"
            :src="currentSong.url"
            @playing="audioReady"
            @error="audioError"
            @timeupdate="updataTime"
            @ended="audioEnd"
            @pause="audioPause"
            :muted="isMuted"
          ></audio>
          <!-- 播放列表 -->
          <transition name="player">
            <div class="play-list-box shadow" v-show="showDetail">
              <div class="title flex-between">
                播放列表
                <i class="iconfont"></i>
              </div>
              <div class="list">
                <div class="item flex-row">
                  <div class="index-container flex-center">
                    <span class="num"> </span>
                    <div class="play-icon">
                      <div class="line" style="animation-delay: -1.2s"></div>
                      <div class="line"></div>
                      <div class="line" style="animation-delay: -1.5s"></div>
                      <div class="line" style="animation-delay: -0.9s"></div>
                      <div class="line" style="animation-delay: -0.6s"></div>
                    </div>
                    <i class="iconfont icon-bofang3 play-btn"> </i>
                    <i class="iconfont icon-zantingtingzhi pause-btn"></i>
                  </div>
                  <p class="ellipsis"></p>
                  <i class="iconfont"></i>
                </div>
              </div>
              <div class="foot"></div>
            </div>
          </transition>
        </div>
      </div>
      <!-- 播放详情 -歌词列表-->
      <transition name="player">
        <div class="player-page" v-show="showLyric">
          <div class="container">
            <div class="page-left">
              <div class="cover-image">
                <img
                  class="rotateIn"
                  :class="playing ? 'playing' : ''"
                  :src="currentSong.image"
                  alt=""
                />
              </div>
              <!-- <div class="ripple p1"></div>
              <div class="ripple p2"></div> -->
            </div>
            <div class="page-right">
              <h3 class="name flex-between">
                {{ currentSong.name }}
                <i @click="openLyric" class="iconfont icon-guanbi"></i>
              </h3>
              <p>{{ currentSong.singer }} -- {{ currentSong.album }}</p>
              <div class="lyric-wrap">
                <ScrollLyric
                  ref="lyricRef"
                  :currentLyric="currentLyric"
                  :currentLyricNum="currentLyricNum"
                ></ScrollLyric>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script>
// 歌词文本
import Lyric from 'lyric-parser'
import {mapActions, mapGetters, mapMutations} from 'vuex'
import {playMode} from '@/utils/playConfig'
import ScrollLyric from '@/components/MianComponent/Lyric'
// import { getLyric } from '../../../api/service/api'
import {getLyric} from '@/api/service/api'
export default {
  name: 'MusicPlayer',
  data () {
    return {
      showDetail: false,
      // 是否开启歌词
      showLyric: false,
      // 歌曲是否正在播放
      songReady: false,
      // 歌词文本
      currentLyricTxt: '',
      // 默认音乐封面
      defaultCover: require('@/assets/images/cdBackground.png'),
      // 音乐进度条
      progressBar: 0,
      // 初始时间
      currentTime: 0,
      // 当前的歌词
      currentLyric: null,
      // 进度条状态
      progressState: false,
      // 是否静音
      isMuted: false,
      // 音量
      volumeNum: 40,
      isPureMusic: false,
      // 歌词行数
      currentLyricNum: 0,
      // 播放的歌词
      playingLyric: '',
       // 准备的歌曲id
      id: '',
      canLyricPlay: false
    }
  },
  components: {
    ScrollLyric
  },
  // 计算属性
  computed: {
    ...mapGetters([
      'playList',
      'playing',
      'currentSong',
      'currentIndex',
      'mode',
      'sequenceList'
    ]),
    // 播放暂停按钮
    playIcon() {
      return this.playing ? 'icon-zanting2' : 'icon-bofang3'
    },
    // 是否静音
    mutedIcon() {
      return this.isMuted ? 'icon-jingyin1' : 'icon-shengyin1'
    },
    // 播放模式
    modeIcon() {
      return this.mode === playMode.sequence 
      ? 'icon-shunxubofang' 
      : this.mode === playMode.loop 
      ? 'icon-danquxunhuan' : 'icon-suiji'
    }
  },

  watch: {
    // 观察歌曲的变化，做出相应的视图变化
    currentSong(newSong, oldSong) {
      // 新歌曲不存在或者老歌曲不存在，获取是新歌曲和老歌曲相等，返回
      if (!newSong.id || !newSong.url || newSong.id === oldSong.id) {
        return
      }
      this.songReady = false
      this.canLyricPlay = false
      if (this.currentLyric) {
        this.currentLyric.stop()
        // 重置为null
        this.currentLyric = null
        this.currentTime = 0
        this.playingLyric = ''
        this.currentLyricNum = 0
      }
      this.$nextTick(() => {
        const audio = this.$refs.audio
        if (audio) {
          // 歌曲的地址
          audio.src = newSong.url
          // 歌曲播放
          audio.play()
          this.id = newSong.id
        }
      })
      // 假若歌曲为播放，就认为超时，做超时处理
      this.timer = setTimeout(() => {
        this.songReady = true
      }, 3000)
      clearTimeout(this.timer)
      // 获取歌曲id
      this.getLyric(newSong.id)
    },
    // 监听播放状态
    playing(isPlaying) {
      // if (!this.songReady) {
      //   return
      // }
      this.$nextTick(() => {
        const audio = this.$refs.audio
        if (audio) {
          isPlaying ? audio.play() : audio.pause()
        }
      })
    }
  },

  mounted () {
    console.log('this.$refs.audio', this.$refs);
    console.log('this.currentLyric===>', this.currentLyric)
  },
  methods: {
    // 打开歌词
    openLyric() {
      if (this.showLyric) {
        this.showLyric = false
      } else {
        this.showLyric = true
      }
    },
    // 异步获取歌词
    async getLyric(id) {
      try {
        let res = await getLyric(id)
        console.log(res)
        if (res.code === 200) {
          let lyric = res.lrc.lyric
          this.currentLyric = new Lyric(lyric, this.lyricHandle)
          if (this.isPureMusic) {
            this.playingLyric = this.currentLyric.lrc.replace(
              /\[(\d{2}):(\d{2}):(\d{2})\]/g,
              ''
            )
          } else {
            if (this.playing && this.canLyricPlay) {
              this.currentLyric.seek(this.currentTime * 1000)
            }
          }
        }
      } catch(error) {
        this.currentLyric = null
        this.playingLyric = ''
        this.currentLyricNum = 0
      }
    },
    // 歌词的回调
    lyricHandle({lineNum, txt}) {
      if (!this.$refs.lyricRef.$refs.lyricList) {
        return
      }
      this.currentLyricNum = lineNum
      this.playingLyric = txt
      if (lineNum > 10) {
        let line = this.$refs.lyricRef.$refs.lyricLine[lineNum - 10]
        if (this.$refs.lyricRef.$refs.lyricList) {
          this.$nextTick(() => {
            this.$refs.lyricRef.$refs.lyricList.scrollToElement(line, 1000)
          })
        }     
      } else {
        if (this.$refs.lyricRef.$refs.lyricList) {
          this.$nextTick(() => {
            this.$refs.lyricRef.$refs.lyricList.scrollTo(0, 0, 1000)
          })
        }
      }
    },
    // 重置当前播放歌曲序号
    resetCurrentIndex(list) {
      let index = list.findIndex(item => {
        return item.id === this.currentSong.id
      })
      this.setCurrentIndex(index)
    },
    // 切换播放模式
    changeMode() {
      const mode = (this.mode + 1) % 3
      this.setPlayMode(mode)
      let list = null
      if (mode === playMode.rendom) {
        list = this.utils.shuffle(this.sequenceList)
      } else {
        list = this.sequenceList
      }
      this.resetCurrentIndex(list)
      this.setPlayList(list)
    },
    // 拖动结束
    changeProgressAfter(val) {
      const currentTime = ((val / 100) * this.currentSong.duration) / 100
      this.$refs.audio.currentTime = currentTime * 1000
      this.currentTime = currentTime * 1000
      this.progressState = false
      console.log('val', val)
      if (!this.playing) {
        this.switchPlaying()
      }
    },
    // 改变音量
    changeVolume(val) {
      val === 0 ? (this.isMuted = true) : (this.isMuted = false)
      this.volume = val / 100
      this.$refs.audio.volume = val / 100
      console.log('changeVolume', val)
    },
    // 控制音量大小
    changeMuted() {
      this.isMuted ? this.mutedHandle(false, 40) : this.mutedHandle(true, 0)
    },
    // 是否静音
    mutedHandle(state, num) {
      this.isMuted = state
      this.volumeNum = num
      this.$refs.audio.volume = num / 100
      console.log('num', num)
    },
    // 改变进度条
    changeProgress(val) {
      this.progressState = true
      const currentTime = (val / 100) * this.currentSong.duration
      this.currentTime = currentTime
      this.progressBar = val
      console.log('changeProgress', val);
      if (this.currentLyric) {
        this.currentLyric.seek(currentTime * 1000)
      }
    },
    // 自定义格式化进度条悬浮时间
    progressFormat() {
      return this.formatTime(this.currentTime)
    },
    // 格式化时间
    formatTime(dataTime) {
      dataTime = dataTime | 0
      const m = (dataTime / 60) | 0
      const s = dataTime % 60
      return `${this.utils.formatZero(m, 2)} : ${this.utils.formatZero(s, 2)}`
    },

    // 单曲循环
    loopSong() {
      this.$refs.audio.currentTime = 0
      this.$refs.audio.play()
      this.setPlayingState(true)
      if (this.currentLyric !== '') {
        this.currentLyric.seek(0)
      }
    },

    // 播放准备完成
    audioReady() {
      clearTimeout(this.timer)
      this.songReady = true
      this.canLyricPlay = true
      console.log('播放准备成功');
      if (this.currentLyric && !this.isPureMusic) {
        this.currentLyric.seek(this.currentTime * 1000)
      }
    },
    // 播放错误
    audioError() {
      clearTimeout(this.timer)
      this.songReady = true
      console.log('播放错误');
    },
    // 播放状态更新
    updataTime(e) {
      if (!this.progressState) {
        this.currentTime = e.target.currentTime
        this.progressBar = (e.target.currentTime / this.currentSong.duration) * 100
      }
      // console.log('改变了播放时间', e);
    },
    // 播放结束
    audioEnd() {
      this.currentTime = 0
      if (this.mode === playMode.loop) {
        this.loopSong()
      } else {
        this.nextSong()
      }
    },
    // 播放暂停
    audioPause() {
      this.setPlayingState(false)
      if (this.currentLyric) {
        this.currentLyric.stop()
      }
    },
    // 上一曲
    pervSong() {
      // if (this.songReady === false) {
      //   return
      // }
      // 只有一首歌曲
      if (this.playList.length === 1) {
        // 显示播放信息
        return 
      } else {
        // 是一个专辑或者歌单
        let index = this.currentIndex - 1
        if (index === 1) {
          index = this.playList.length - 1
        }
        this.setCurrentIndex(index)
        if (!this.playing) {
          this.switchPlaying()
        }
      }
      console.log('上一曲')
    },
    // 切换播放/暂停
    switchPlaying() {
       // eslint-disable-next-line no-debugger
      // debugger
      // if (this.songReady === false) {
      //   return
      // }
      this.setPlayingState(!this.playing)
      // 切换歌词播放状态
      if (this.currentLyric) {
        this.currentLyric.togglePlay()
      }
    },
    // 下一曲
    nextSong() {
      // if (this.songReady === false) {
      //   return
      // }
      // 只有一首歌曲
      if (this.playList.length === 1) {
        // 显示播放信息,轮流播放
        this.loopSong()
        
      } else {
        // 是一个专辑或者歌单
        let index = this.currentIndex + 1
        if (index === this.playList.length) {
          index = 0
        }
        this.setCurrentIndex(index)
        console.log('index', index);
        if (!this.playing) {
          this.switchPlaying()
        }
      }
      console.log('上一曲')
    },

    ...mapMutations({
      setPlayingState: 'PLAYING_STATUS',
      setCurrentIndex: 'CURRENT_INDEX',
      setPlayMode: 'PLAY_MODE',
      setPlayList: 'PLAY_LIST'
    }),
    ...mapActions([
      'selectPlay',
      'pausePlay'
    ])
  }
}
</script>

<style lang='less' scoped>
.player-enter-active {
  transition: all 0.5s ease;
}
.player-leave-active {
  transition: all 0.3s cubic-bezier(0.5, 0.3, 0.2, 0.5);
}

.player-enter,
.player-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.music-player {
  width: 100%;
  height: 60px;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 9999;
  padding: 0 10px 0 20px;
  -webkit-box-pack: justify;
  -webkit-justify-content: space-between;
  -ms-flex-pack: justify;
  justify-content: space-between;
  padding-left: calc(100vw - 100%);
  background-color: @play-background-color;
  // 播放详情
  .player-page {
    width: 100%;
    height: 100vh;
    // background-color: @lyric-background;
    background-color: @lyric-background;
    background-image: radial-gradient(
        at 47% 33%,
        hsl(0, 39%, 63%) 0,
        transparent 59%
      ),
      radial-gradient(at 82% 65%, rgb(135, 172, 221) 0, transparent 55%);
    position: fixed;
    top: 0px;
    left: 0;
    padding-top: 100px;
    .container {
      display: flex;
      .page-left,
      .page-right {
        width: 50%;
        .cover-image {
          width: 400px;
          height: 400px;
          position: relative;
          img {
            width: 100%;
            height: 100%;
            position: relative;
            z-index: 2;
            opacity: 1;
            border-radius: 40%;
            &.playing {
              animation-duration: 6s;
              animation-delay: 6s;
              animation: loading 6s linear infinite;
            }
          }
          @keyframes rotate {
            50% {
              transform: translate(-50%, -73%) rotate(180deg);
            }
            100% {
              transform: translate(-50%, -70%) rotate(360deg);
            }
          }
          @keyframes loading {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
        }
      }
      .page-right {
        .name {
          font-size: 1.6rem;
          font-weight: bold;
          margin-bottom: 10px;
          .icon-guanbi {
            font-size: 1.6rem;
            color: @color-dark;
            &:hover {
              color: @color-theme;
            }
          }
        }
        .iconfont {
          font-size: 1.8rem;
          cursor: pointer;
          transform: rotate(90deg);
        }
        .lyric-wrap {
          width: 100%;
          min-height: 420px;
          border-radius: 8px;
          padding: 26px;
          font-size: 1rem;
          overflow: hidden;
          color: @color-blank;
          background: @lyric-background-color;
          background-image: radial-gradient(
              at 47% 33%,
              hsl(0, 0%, 84%) 0,
              transparent 59%
            ),
            radial-gradient(at 82% 65%, rgb(135, 172, 221) 0, transparent 55%);
          margin-top: 30px;
        }
      }
    }
  }
  // 播放列表
  .play-list-box {
    width: 345px;
    height: 550px;
    position: absolute;
    float: right;
    right: 5px;
    bottom: 30px;
    border-radius: 3px;
    padding: 30px;
    overflow: hidden;
    .title {
      margin: 10px 0 20px;
      font-weight: 500;
      font-size: 16px;
      i {
        font-size: 20px;
        cursor: pointer;
        &:hover {
          color: @color-theme;
        }
      }
    }
    .list {
      overflow-y: scroll;
      max-height: calc(100% - 90px);
      .item {
        padding: 8px 0;
        height: 40px;
        .index-container {
          width: 30px;
          margin-right: 20px;
          flex-shrink: 0;
          .num {
            font-size: 14px;
            color: #4a4a4a;
          }
          .play-icon {
            display: none;
            height: 16px;
            min-width: 18px;
            overflow: hidden;
            .line {
              width: 2px;
              height: 100%;
              margin-left: 2px;
              background-color: #ff410f;
              animation: play 0.9s linear infinite alternate;
            }
          }
          .play-btn {
            color: @color-theme;
            font-size: 28px;
            display: none;
            text-align: left;
            cursor: pointer;
          }
          .pause-btn {
            color: @color-theme;
            font-size: 30px;
            display: none;
            text-align: left;
            cursor: pointer;
          }
        }
        p {
          cursor: pointer;
          flex: 1;
          margin-right: 20px;
          &.active {
            color: @color-theme;
          }
        }
        i {
          font-size: 16px;
          cursor: pointer;
          &:hover {
            color: @color-theme;
          }
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
            .num {
              display: none;
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
  }
  // 播放器左边内容
  .music-player-left {
    margin-right: 16px;
    width: 150px;
    .play-btn {
      height: 40px;
      display: flex;
      align-items: center;
      i {
        cursor: pointer;
        &:active {
          opacity: 0.8;
        }
      }
      .icon-shangyiqu1 {
        font-size: 1.8rem;
        color: @color-font-size-White;
        &:hover {
          color: @color-theme;
        }
      }
      .icon-xiayiqu {
        font-size: 1.8rem;
        color: @color-font-size-White;
        &:hover {
          color: @color-theme;
        }
      }
      .icon-prev,
      .icon-next {
        font-size: 20px;
        color: #fa2800;
      }
      .icon-play {
        width: 40px;
        height: 40px;
        background: linear-gradient(110deg, #fa2800, #fb8974);
        border-radius: 50%;
        margin: 0 20px;
        i {
          font-size: 1.8rem;
          color: @color-font-size-White;
          &:hover {
            color: @color-theme;
          }
        }
      }
    }
  }
  // 播放器中间内容
  .music-player-center {
    height: 72px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
    .cover {
      width: 50px;
      height: 50px;
      margin-right: 10px;
      border-radius: 4px;
      cursor: pointer;
      el-image {
        width: 60px;
        height: 40px;
      }
    }
    .info {
      width: 100%;
      height: 72px;
      margin: 0 20px 0 10px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      color: @color-font-size-White;
      .top {
        margin-top: 12px;
        .name {
          font-size: 1.2rem;
          font-weight: bold;
          margin-right: 10px;
          color: @color-font-size-White;
          span {
            font-size: 0.8rem;
            color: @color-font-size-White;
            font-weight: 200;
            margin-left: 16px;
          }
        }
      }
      .progress-wrap {
        width: 100%;
        margin-bottom: 20px;
        span {
          font-size: 14px;
        }
        .ant-slider {
          margin: 12px 5px 0 5px;
        }
        .time {
          margin-left: 10px;
          width: 20%;
          font-weight: 600;
          color: @color-font-size-White;
        }
      }
    }
  }
  // 播放器右边内容
  .music-player-right {
    height: 72px;
    .volume-wrap {
      width: 150px;
      margin-right: 10px;
      .volume-icon {
        // font-size: 23px;
        // font-weight: 700;
        cursor: pointer;
        margin-right: 10px;
      }
      .ant-slider {
        margin: 14px 5px 0 4px;
      }
      .icon-shengyin1 {
        font-size: 1.3rem;
        color: @color-font-size-White;
        cursor: pointer;
        margin-right: 16px;
      }
      .icon-jingyin1 {
        font-size: 1.3rem;
        color: @color-font-size-White;
        cursor: pointer;
        margin-right: 16px;
      }
    }
    .tool {
      i {
        font-size: 1.4rem;
        margin: 0 16px;
        cursor: pointer;
      }
      .icon-shunxubofang {
        font-size: 1.4rem;
        color: @color-font-size-White;
        &:hover {
          color: @color-theme;
        }
      }
      .icon-danquxunhuan {
        font-size: 1.4rem;
        color: @color-font-size-White;
        &:hover {
          color: @color-theme;
        }
      }
      .icon-suiji {
        font-size: 1.4rem;
        color: @color-font-size-White;
        &:hover {
          color: @color-theme;
        }
      }
      .icon-geci {
        font-size: 1.4rem;
        color: @color-font-size-White;
        &:hover {
          color: @color-theme;
        }
      }
      .icon-bofangliebiao {
        font-size: 1.4rem;
        color: @color-font-size-White;
        &:hover {
          color: @color-theme;
        }
      }
    }
  }
}
</style>
