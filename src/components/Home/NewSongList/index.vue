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
        <div class="index-container flex-center">
          <div class="avatar">
            <el-image
              class="avatar-img"
              :src="item.iamge"
              fit="cover"
            ></el-image>
          </div>
          <div play-icon>
            <div class="line"></div>
          </div>
        </div>
        <div class="r-info">
          <span class="r-name">{{ item.name }}</span>
          <span class="r-singer">{{ item.singer }}</span>
          <span>{{ utils.formatSecondTime(item.duration) }}</span>
        </div>
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
    name: 'NewSongList',
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
    computed: {
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
  margin-top: 10px;
  background: #f5f5f5;
  .r-playlist-item {
    flex: 0 0 50%;
    max-width: 50%;
    margin-bottom: 20px;
    height: 70px;
    margin: 10px 0;
    padding: 0 15px 20px 30px;
    .wrapper {
      width: 100%;
      height: 70px;
      justify-content: start;
      padding-right: 2%;
      border-radius: 5px;
      position: relative;
      .index-container {
        width: 70px;
        margin-right: 20px;
        position: relative;
        .avatar {
          width: 70px;
          height: 70px;
          position: absolute;
          border-radius: 4px;
          .avatar-img {
            width: 100%;
            height: 100%;
            border-radius: 8px;
          }
        }
      }
      .r-info {
        flex: 1;
        .r-name {
          font-size: 1rem;
          font-weight: 600;

        }
        .r-singer {
          font-size: 0.8rem;
          color: chocolate;
          font-weight: 600;
        }
      }
    }
  }
}
</style>
