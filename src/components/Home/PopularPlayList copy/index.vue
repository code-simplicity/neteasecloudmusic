<template>
  <div class="r-playlist">
    <div
      class="r-playlist-item"
      v-for="(item, index) in songMusic"
      :key="item.id"
      :class="
        index === currentIndex && currentSong.id == item.id && playing
          ? 'playing'
          : ''
      "
    >
      <div class="wrapper flex-center">
        <div></div>
      </div>
    </div>
  </div>
</template>

<script>
import {
    mapGetters,
    mapActions
} from 'vuex'
export default {
    name: 'PopularPlayList',
    data() {
        return {

        }
    },
    props: {
        songMusic: {
            type: Array
        }
    },
    components: {

    },
    // 计算属性获取vuex状态
    comments: {
        ...mapGetters(['currentIndex', 'currentSong', 'playing'])
    },
    mounted() {

    },
    methods: {

    }
}
</script>

<style lang="less" scoped>
.r-playlist {
  display: flex;
  flex-wrap: wrap;

  .r-playlist-item {
    flex: 0 0 50%;
    max-width: 50%;
    margin-bottom: 20px;
    height: 70px;
    padding: 0 15px 30px 30px;

    .wrapper {
      width: 100%;
      height: 70px;
      justify-content: start;
      padding-right: 2%;
      border-radius: 5px;
      position: relative;
    }
  }
}
</style>
