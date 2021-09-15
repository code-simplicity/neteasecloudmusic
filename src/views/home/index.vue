<template>
  <div>
    <Carousel></Carousel>
    <div class="container">
      <PopularRecommend></PopularRecommend>
      <RecommendNewSong></RecommendNewSong>
      <DaySong></DaySong>
      <RecommendSinger></RecommendSinger>
    </div>
  </div>
</template>

<script>
import Carousel from './components/Carousel'
import PopularRecommend from './components/PopularRecommend'
import RecommendNewSong from './components/RecommendNewSong'
import DaySong from './components/DaySong'
import RecommendSinger from './components/RecommendSinger'
export default {
  name: 'Home',
  data() {
    return {

    }
  },
  components: {
    Carousel,
    PopularRecommend,
    RecommendNewSong,
    DaySong,
    RecommendSinger
  },
  mounted() {

  },
  methods: {

  }
}
</script>

<style lang="less" scoped>
</style>
