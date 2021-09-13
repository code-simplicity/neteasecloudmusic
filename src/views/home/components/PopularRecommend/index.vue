<template>
  <div class="p-recommend">
    <div class="p-recommend-header">
      <span class="p-recommend-text">
        <i class="iconfont icon-rementuijian-copy"></i>
        <span>热门推荐</span>
      </span>
      <span class="p-recommend-more" @click="toPlayList">
        <span>更多</span>
        <i class="iconfont icon-gengduo"></i>
      </span>
    </div>
    <!-- 热门歌单列表,推荐歌单 -->
    <div class="p-recommend-detail">
      <PopularPlayList :songMusic="PopularList"></PopularPlayList>
    </div>
  </div>
</template>

<script>
import PopularPlayList from '@/components/Home/PopularPlayList'
import {
  getPersonalized,
} from '@/api/service/api'
export default {
  name: 'PopularRecommend',
  data() {
    return {
      limit: 30,
      PopularList: []
    }
  },
  components: {
    PopularPlayList,
  },
  mounted() {
    this.getPersonalized()
  },
  methods: {
    //  获取推荐歌单
    async getPersonalized() {
      try {
        let res = await getPersonalized(this.limit)
        this.PopularList = res.result
        console.log('this.PopularList', this.PopularList);
      } catch (error) {
        console.log(error)
      }
    },
    // 跳转到更多
    toPlayList() {
      this.$router.push({
        name: 'playlist',
      })
    }
  }
}
</script>

<style lang="less" scoped>
.p-recommend {
  margin-top: 36px;
  padding: 20px;
  // background-color: @color-dark;
  border-radius: 8px;
  opacity: 0.9;
  .p-recommend-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    // border-bottom: 1px solid red;
    .p-recommend-text {
      font-size: 1.4rem;
      float: left;
      color: @color-dark;
      .icon-rementuijian-copy {
        font-size: 1.3rem;
        color: red;
        padding-right: 10px;
      }
    }

    .p-recommend-more {
      float: right;
      color: @color-dark;

      .icon-gengduo {
        font-size: 0.8rem;
        color: red;
        padding-left: 6px;
        &:hover {
          color: #1890ff;
        }
      }
    }
  }
  .p-recommend-detail {
    margin-top: 10px;
  }
}
</style>
