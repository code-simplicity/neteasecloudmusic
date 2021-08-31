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
            :class="currentLyricNum === index ? 'active' : ''"
            v-for="(item, index) in currentLyric.lines"
            :key="index"
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
      console.log('this====>', this.currentLyric);
      console.log('currentLyricNum', this.currentLyricNum);
    },
    methods: {

    }
}
</script>

<style lang="less" scoped>
.lyric-box {
  .lyric {
    display: inline-block;
    vertical-align: top;
    width: 100%;
    height: 400px;
    overflow: hidden;
    .lyric-wrapper {
      width: 100%;
      margin: 0 auto;
      overflow: hidden;
      .lyric-text {
        margin: 6px 2px;
        line-height: 24px;
        font-size: 1rem;
        font-weight: 400;
        &.active {
          color: @color-theme;
        }
        &:after {
          color: #000000;
        }
      }
    }
  }
}
</style>
