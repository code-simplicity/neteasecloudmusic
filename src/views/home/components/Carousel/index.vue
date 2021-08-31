<template>
  <div class="carousel">
    <swiper class="swiper" :options="swiperOption" v-if="initCarousel">
      <swiper-slide v-for="item of carousel" :key="item.imageUrl">
        <img :src="item.imageUrl" :alt="item.typeTitle" />
      </swiper-slide>
    </swiper>
    <div class="swiper-pagination" slot="pagination"></div>
    <!-- <div class="swiper-button-prev"></div> -->
    <!--左箭头。如果放置在swiper-container外面，需要自定义样式。-->
    <!-- <div class="swiper-button-next"></div> -->
    <!--右箭头。如果放置在swiper-container外面，需要自定义样式。-->
  </div>
</template>

<script>
import {getCarousel} from '../../../../api/service/api'
export default {
  name: 'Carousel',
  data () {
    return {
      carousel: [],
      swiperOption: {
        slidesPerView: 3,
        spaceBetween: 16,
        slidesPerGroup: 3,
        loop: true,
        // loopFillGroupWithBlank: true,
        // centeredSlides: true,
        // paginationClickable: true,
        grabCursor: true,
        // 获取dom元素，实现轮播
        pagination: {
          el: '.swiper-pagination'
        },
        // 自动播放
        autoplay: {
          delay: 4000,
          disableOnInteraction: false
        }
      }
    }
  },
  computed: {
    // 计算当前是否返回轮播图
    initCarousel() {
      return this.carousel.length
    }
  },
  mounted () {
    this.getCarousel()
  },
  methods: {
    // 获取轮播图
    async getCarousel() {
      try {
        let res = await getCarousel()
        console.log(res)
        this.carousel = res.banners
        this.bannerBg = res.banners[0].imageUrl
      } catch (error) {
        console.log(error)
      }
    },
  }
}
</script>

<style lang='less' scoped>
.carousel {
  top: 10px;
}
.carousel /deep/ .swiper-pagination {
  width: 100%;
  bottom: -20px;
  .swiper-pagination-bullet {
    width: 6px;
    height: 6px;
    background: #6464e9;
    opacity: 0.8;
    border-radius: 50%;
    margin: 0 5px;
    &.swiper-pagination-bullet-active {
      opacity: 1;
      width: 15px;
      border-radius: 4px;
      background: @color-theme;
    }
  }
}
.carousel {
  position: relative;
  img {
    width: 100%;
    border-radius: 8px;
  }
}
</style>
