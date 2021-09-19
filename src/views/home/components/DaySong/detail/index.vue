<template>
  <div class="day-song-wrap container">
    <div class="title">每日歌曲推荐</div>
    <div class="subtitle">根据你的音乐口味生成 · 每天6:00更新</div>
    <SongDetailsList
      v-if="songs.length > 0"
      :songListShow="songListShow"
      :songs="songs"
      :isPerson="isPerson"
    ></SongDetailsList>
  </div>
</template>

<script>
import SongDetailsList from '@/components/MianComponent/SongDetailsList'
import { getRecommendSongs } from '@/api/service/songer'
import { createSong } from '@/model/song'
export default {
  name: 'DaySongDetail',
  data() {
    return {
      // 每日推荐歌曲
      songs: [],
      isPerson: true,
      // 是否展示
      songListShow: false

    }
  },
  components: {
    SongDetailsList
  },
  mounted() {
    this.getRecommendSongs()
  },
  methods: {
    // 获取每日推荐的歌曲
    async getRecommendSongs() {
      try {
        let res = await getRecommendSongs()
        if (res.code === this.constants.code_status) {
          this.songs = this._normalizeSongs(res.data.dailySongs)
        }
      } catch (error) {
        console.log(error)
      }
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
  }
}
</script>

<style lang='less' scoped>
.day-song-wrap {
  margin-top: 10px;
  border-radius: 1.25em;
  text-align: center;
  @keyframes letterSpacing4 {
    from {
      letter-spacing: 0px;
    }
    to {
      letter-spacing: 4px;
    }
  }
  @keyframes letterSpacing1 {
    from {
      letter-spacing: 0px;
    }
    to {
      letter-spacing: 1px;
    }
  }
  .title {
    font-size: 5rem;
    line-height: 1.05;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 4px;
    animation-duration: 0.8s;
    animation-name: letterSpacing4;
    color: @color-theme;
  }

  .subtitle {
    font-size: 1.3rem;
    letter-spacing: 1px;
    margin: 28px 0 54px 0;
    animation-duration: 0.8s;
    animation-name: letterSpacing1;
    text-transform: uppercase;
    color: @color-dark;
  }
}
</style>
