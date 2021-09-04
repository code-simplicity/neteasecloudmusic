<template>
  <div id="app">
    <main-header></main-header>
    <router-view></router-view>
    <music-player></music-player>
    <main-footer></main-footer>
  </div>
</template>

<script>
import MainHeader from './components/MianComponent/MainHeader/index.vue'
import MainFooter from './components/MianComponent/MainFooter/index.vue'
import MusicPlayer from './components/MianComponent/MusicPlayer/index.vue'
export default {
  name: 'App',
  components: {
    MainHeader,
    MainFooter,
    MusicPlayer
  }
}
</script>

<style lang="less">
</style>
