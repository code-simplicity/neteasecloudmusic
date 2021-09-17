<template>
  <div class="lyric-box">
    <Scroll
      class="lyric"
      ref="lyricList"
      :data="currentLyric && currentLyric.lines"
    >
      <div class="lyric-wrapper">
        <div v-if="currentLyric">
          <p
            ref="lyricLine"
            class="lyric-text"
            v-for="(item, index) in currentLyric.lines"
            :class="currentLyricNum === index ? 'active' : ''"
            :key="index"
            @click="clickLyricPlay(item)"
          >
            {{ item.txt }}
          </p>
        </div>
        <div class="no-lyric" v-else>暂无歌词,请搜索重试</div>
      </div>
    </Scroll>
  </div>
</template>

<script>
import Scroll from '../Scroll/'
export default {
  name: 'Lyric',
  data() {
    return {

    }
  },
  props: {
    currentLyricNum: {
      type: Number
    },
    currentLyric: {
      type: Object
    }
  },
  components: {
    Scroll
  },
  mounted() {

  },
  methods: {
    // 选中某一行播放
    clickLyricPlay() {

    },

  }
}
</script>

<style lang="less" scoped>
.lyric-box {
  .lyric {
    display: inline-block;
    vertical-align: top;
    width: 100%;
    height: 460px;
    overflow: hidden;
    .lyric-wrapper {
      width: 100%;
      margin: 0 auto;
      overflow: hidden;
      .lyric-text {
        line-height: 40px;
        height: 40px;
        border-radius: 10px;
        margin: 6px 2px;
        font-size: 1.3rem;
        font-weight: 500;
        color: @color-lyric-color;
        cursor: pointer;
        text-align: center;
        &:hover {
          background: @lyric-background;
          color: @color-dark;
        }
        &.active {
          color: @color-theme;
        }
        &::after {
          color: @color-blank;
        }
      }
      .no-lyric {
        color: @color-dark;
        text-align: center;
      }
    }
  }
}
</style>
