<template>
  <div>
    <Carousel></Carousel>
    <div class="container">
      <PopularRecommend></PopularRecommend>
      <RecommendNewSong></RecommendNewSong>
    </div>
  </div>
</template>

<script>
import Carousel from './components/Carousel'
import PopularRecommend from './components/PopularRecommend'
import RecommendNewSong from './components/RecommendNewSong'
export default {
  name: 'Home',
  data () {
    return {

    }
  },
  components: {
    Carousel,
    PopularRecommend,
    RecommendNewSong
  },
  mounted () {

  },
  methods: {

  }
}
</script>

<style lang="less" scoped>
</style>
