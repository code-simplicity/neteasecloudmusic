<template>
  <div class="daily-recommend-card" @click="toDailyDetail">
    <img :src="coverUrl" />
    <div class="containers">
      <div class="title-box">
        <div class="title">
          <span>每</span>
          <span>日</span>
          <span>推</span>
          <span>荐</span>
        </div>
      </div>
    </div>
    <button class="play-button" @click.stop="playDailyTracks">
      <i class="iconfont icon-bofang3"></i>
    </button>
  </div>
</template>

<script>

import { mapActions, mapGetters } from 'vuex'
import sample from 'lodash/sample';
import { getRecommendSongs } from '@/api/service/songer'
import { createSong } from '@/model/song'
const defaultCovers = [
  'https://p2.music.126.net/0-Ybpa8FrDfRgKYCTJD8Xg==/109951164796696795.jpg',
  'https://p2.music.126.net/QxJA2mr4hhb9DZyucIOIQw==/109951165422200291.jpg',
  'https://p1.music.126.net/AhYP9TET8l-VSGOpWAKZXw==/109951165134386387.jpg',
];
export default {
  name: 'DailyTracksCard',
  data() {
    return {
      dailySongs: []
    }
  },
  components: {

  },
  computed: {
    ...mapGetters(['currentIndex', 'currentSong', 'playing']),
    coverUrl() {
      return `${sample(defaultCovers)
        }?param=1024y1024`;
    },
  },

  mounted() {
    this.getRecommendSongs()
  },
  methods: {
    // 进去每日详情
    toDailyDetail() {
      this.$router.push({
        name: 'daysongdetail'
      })
    },

    //   获取每日推荐的歌曲
    async getRecommendSongs() {
      try {
        let res = await getRecommendSongs()
        if (res.code === this.constants.code_status) {
          this.dailySongs = this._normalizeSongs(res.data.dailySongs)
        }
      } catch (error) {
        console.log(error)
      }
    },
    // 播放全部
    playDailyTracks() {
      this.playAll({
        list: this.dailySongs
      })
    },

    // 处理歌曲
    _normalizeSongs(list) {
      let res = []
      list.map(item => {
        if (item.id) {
          res.push(createSong(item))
        }
      })
      return res
    },

    ...mapActions(['selectPlay', 'playAll'])

  }
}
</script>

<style lang='less' scoped>
.daily-recommend-card {
  border-radius: 1rem;
  height: 198px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  margin-top: 10px;
  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    animation: move 38s infinite;
    animation-direction: alternate;
    z-index: -1;
  }
  .containers {
    background: linear-gradient(to left, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.28));
    height: 198px;
    width: 100%;
    display: flex;
    align-items: center;
    border-radius: 0.94rem;
    .title-box {
      height: 148px;
      width: 148px;
      color: white;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-left: 25px;
      user-select: none;
      .title {
        height: 100%;
        width: 100%;
        font-weight: 600;
        font-size: 4rem;
        line-height: 48px;
        opacity: 0.96;
        display: grid;
        grid-template-columns: 1fr 1fr;
        justify-items: center;
        place-items: center;
      }
    }
  }

  .play-button {
    backdrop-filter: blur(8px);
    border: 1px solid rgba(255, 255, 255, 0.08);
    color: white;
    position: absolute;
    right: 1.6rem;
    bottom: 1.4rem;
    background: rgba(255, 255, 255, 0.14);
    border-radius: 50%;
    margin-bottom: 2px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 44px;
    width: 44px;
    transition: 0.2s;
    cursor: default;
    .icon-bofang3 {
      font-size: 2rem;
    }
    &:hover {
      background: @color-theme;
    }
    &:active {
      transform: scale(0.94);
    }
  }
}
@keyframes move {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-50%);
  }
}
</style>
