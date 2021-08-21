<template>
  <div id="app">
    <main-header></main-header>
    <router-view></router-view>
    <main-footer></main-footer>
  </div>
</template>

<script>
import MainHeader from './components/MianComponent/MainHeader/index.vue'
import MainFooter from './components/MianComponent/MainFooter/index.vue'
export default {
  name: 'App',
  components: {
    MainHeader,
    MainFooter
  }
}
</script>

<style lang="less">

</style>
