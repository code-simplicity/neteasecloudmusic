<template>
  <div>
    <Carousel></Carousel>
    <div class="container">
      <PopularRecommend></PopularRecommend>
      <RecommendNewSong></RecommendNewSong>
      <DaySong></DaySong>
    </div>
  </div>
</template>

<script>
import Carousel from './components/Carousel'
import PopularRecommend from './components/PopularRecommend'
import RecommendNewSong from './components/RecommendNewSong'
import DaySong from './components/DaySong'
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
    DaySong
  },
  mounted() {

  },
  methods: {

  }
}
</script>

<style lang="less" scoped>
</style>
