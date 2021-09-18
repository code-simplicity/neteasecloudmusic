<template>
  <div class="leader-board container">
    <div class="module">
      <h3 class="title flex-row">
        <i class="iconfont icon-geshou"></i>
        云音乐特色榜
      </h3>
      <PopularPlayList :songMusic="cloudFeatures"></PopularPlayList>
    </div>
    <div class="module">
      <h3 class="title flex-row">
        <i class="iconfont icon-geshou"></i>全球媒体榜
      </h3>
      <PopularPlayList :songMusic="globalMedia"></PopularPlayList>
    </div>
  </div>
</template>

<script>
import PopularPlayList from '@/components/Home/PopularPlayList'
import { getToplistDetail } from '@/api/service/api'
export default {
  name: 'LeaderBoard',
  data() {
    return {
      // 排行榜列表
      songMusic: [],
    }
  },
  components: {
    PopularPlayList
  },

  computed: {
    // 云特色排行榜
    cloudFeatures() {
      return this.songMusic.slice(0, 4)
    },
    globalMedia() {
      return this.songMusic.slice(4, this.songMusic.length)
    }
  },

  mounted() {
    this.getToplistDetail()
  },
  methods: {
    // 获取所有榜单内容摘要
    async getToplistDetail() {
      try {
        let res = await getToplistDetail()
        if (res.code === this.constants.code_status) {
          this.songMusic = res.list
        }
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.leader-board {
  opacity: 0.9;
  margin-top: 10px;
  border-radius: 8px;
  padding: 10px;
  .module {
    .title {
      font-size: 1.2rem;
      position: relative;
      margin-left: 16px;
      margin-bottom: 20px;
      padding-bottom: 10px;
      cursor: pointer;
      color: @color-dark;

      i {
        font-size: 1.6rem;
        margin-right: 10px;
        color: @color-theme;
      }
    }
  }
}
</style>
