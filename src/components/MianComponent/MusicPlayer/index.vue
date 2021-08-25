<template>
  <!-- vue过度 -->
  <transition name="palyer">
    <!-- <div class="music-palyer flex-row" v-show="playList.length > 0"> -->
    <div class="music-palyer flex-row">
      <div class="container">
        <div class="wrapper flex-row">
          <!-- 左边内容 -->
          <div class="music-palyer-left flex-row">
            <div class="play-btn">
              <i class="iconfont icon-shangyiqu1"></i>
              <div class="icon-play flex-center">
                <i class="iconfont icon-bofang3"></i>
              </div>
              <i class="iconfont icon-xiayiqu"></i>
            </div>
          </div>
          <!-- 中间内容 -->
          <div class="music-palyer-center">
            <div>
              <el-image
                style="width: 100px"
                src="https://p1.music.126.net/-H43b2tYNZF-zoB3bSJ-Cg==/109951166312143352.jpg"
                fit="cover"
              ></el-image>
            </div>
            <div class="info">
              <div class="top flex-between">
                <h2 class="name">
                  <span></span>
                </h2>
                <p class="time"></p>
                <p class="time">00:00 / 00:00</p>
              </div>
              <div class="progress-wrap flex-row">
                <el-slider v-model="value2"></el-slider>
              </div>
            </div>
          </div>
          <!-- 右边内容 -->
          <div class="music-palyer-right flex-row">
            <div class="vvolume-wrap flex-row">
              <i class="iconfont icon-shengyin"></i>
              <el-slider v-model="value3"></el-slider>
            </div>
            <div class="tool">
              <i></i>
            </div>
          </div>
          <audio></audio>
          <transition name="palyer">
            <div class="play-list-box shadow">
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
      <transition name="palyer">
        <div class="player-page">
          <div class="container">
            <div class="page-left">
              <div class="cover-image">
                <el-image
                  style="width: 100px; height: 100px"
                  src="https://p1.music.126.net/-H43b2tYNZF-zoB3bSJ-Cg==/109951166312143352.jpg"
                  :fit="fit"
                ></el-image>
              </div>
              <div class="page-right">
                <h3 class="name flex-between">
                  <i></i>
                </h3>
                <p></p>
                <div class="lyric-wrap">列表</div>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'MusicPlayer',
  data () {
    return {

    }
  },
  components: {

  },
  mounted () {

  },
  methods: {

  }
}
</script>

<style lang='less' scoped>
.palyer-enter-active {
  transition: all 0.5s ease;
}
.palyer-leave-active {
  transition: all 0.3s cubic-bezier(0.5, 0.3, 0.2, 0.5);
}

.palyer-enter,
.palyer-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.music-palyer {
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
  background-color: chartreuse;
  .player-page {
    width: 100%;
    // height: 100vh;
    height: 100px;
    background: rgb(182, 178, 178);
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
          el-image {
            width: 100%;
            height: 100%;
            border-radius: 5px;
            position: relative;
            z-index: 2;
            opacity: 1;
            overflow: hidden;
            border-radius: 5px;
            box-shadow: 5px 0 10px -5px #141414;
          }
          &::after {
            content: "";
            position: absolute;
            left: 20%;
            top: 0;
            width: 100%;
            height: 100%;
            z-index: 1;
            transition: all cubic-bezier(0.4, 0, 0.2, 1) 0.8s 0.5s;
            // background: transparent url("../../../assets/images/cd-wrap.png")
            // center no-repeat;
            background-size: contain;
          }
          &.playing {
            &::after {
              -webkit-animation: rotate 2s linear infinite;
              -moz-animation: rotate 2s linear infinite;
              -ms-animation: rotate 2s linear infinite;
              -o-animation: rotate 2s linear infinite;
              animation: rotate 2s linear infinite;
            }
          }
        }
      }
    }
  }
}
</style>
