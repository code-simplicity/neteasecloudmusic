<template>
  <div class="p-recommend">
    <div class="p-recommend-header">
      <span class="p-recommend-text">
        <i class="iconfont icon-rementuijian-copy"></i>
        <span>推荐歌手</span>
      </span>
      <span class="p-recommend-more" @click="toPlayList">
        <span>更多</span>
        <i class="iconfont icon-gengduo"></i>
      </span>
    </div>
    <div class="p-recommend-detail">
      <SongerItem :songItem="singers"></SongerItem>
    </div>
  </div>
</template>

<script>
import SongerItem from '@/components/MianComponent/SongerItem'
import { getTopArtists } from '@/api/service/singer'
export default {
  name: 'RecommendSinger',
  data() {
    return {
      // 推荐歌手
      singers: []
    }
  },
  components: {
    SongerItem
  },
  mounted() {
    this.getTopArtists()
  },
  methods: {
    async getTopArtists() {
      let params = {
        limit: 10
      }
      try {
        let res = await getTopArtists(params)
        if (res.code === this.constants.code_status) {
          this.singers = res.artists
        }
      } catch (error) {
        console.log(error)
      }
    },
    // 查看更多歌手
    toPlayList() {
      this.$router.push({
        name: 'singer'
      })
    }
  }
}
</script>

<style lang='less' scoped>
.p-recommend {
  margin-top: 20px;
  padding: 20px;
  border-radius: 8px;
  opacity: 0.9;
  .p-recommend-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
    .p-recommend-text {
      font-size: 1.4rem;
      float: left;
      color: @color-dark;
      .icon-rementuijian-copy {
        font-size: 1.3rem;
        color: @color-dark;
        padding-right: 10px;
      }
    }

    .p-recommend-more {
      float: right;
      color: @color-dark;
      .icon-gengduo {
        font-size: 0.8rem;
        color: @color-dark;
        padding-left: 6px;

        &:hover {
          color: #1890ff;
        }
      }
    }
  }
}
</style>
