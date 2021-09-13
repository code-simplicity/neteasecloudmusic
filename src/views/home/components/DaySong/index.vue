<template>
  <div class="day-song">
    <div class="day-song-header">
      <span class="day-song-title">
        <i class="iconfont icon-rementuijian-copy"></i>
        <span>每日推荐</span>
      </span>
    </div>
    <div class="day-song-content">
      <DailyTracksCard></DailyTracksCard>
    </div>
  </div>
</template>

<script>
import DailyTracksCard from '@/components/Home/DailyTracksCard'
export default {
  name: 'DaySong',
  data() {
    return {

    }
  },
  components: {
    DailyTracksCard
  },
  mounted() {

  },
  methods: {

  }
}
</script>

<style lang='less' scoped>
.day-song {
  margin-top: 20px;
  padding: 20px;
  opacity: 0.9;
  .day-song-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .day-song-title {
      font-size: 1.4rem;
      float: left;
      color: @color-dark;
      .icon-rementuijian-copy {
        font-size: 1.3rem;
        color: red;
        padding-right: 10px;
      }
    }
  }
}
</style>
