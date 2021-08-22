<template>
  <div>
    <Carousel></Carousel>
    <div class="container">
      <PopularRecommend></PopularRecommend>
      
    </div>
  </div>
</template>

<script>
import Carousel from './components/Carousel'
import PopularRecommend from './components/PopularRecommend'
export default {
  name: 'Home',
  data () {
    return {

    }
  },
  components: {
    Carousel,
    PopularRecommend
  },
  mounted () {

  },
  methods: {

  }
}
</script>

<style lang="less" scoped>
</style>
