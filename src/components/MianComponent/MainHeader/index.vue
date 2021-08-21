<template>
  <div class="mian-header flex-row">
    <div class="mian-logo">
      <router-link :to="{ name: 'home' }" tag="a"></router-link>
    </div>
    <ul class="nav flex-row">
      <li>
        <router-link :to="{ name: 'home' }">发现音乐</router-link>
      </li>
      <li>
        <router-link :to="{ name: 'home' }">我的音乐</router-link>
      </li>
      <li>
        <router-link :to="{ name: 'home' }">排行榜</router-link>
      </li>
      <li>
        <router-link :to="{ name: 'home' }">歌单</router-link>
      </li>
    </ul>
    <div class="main-menu-item"></div>
  </div>
</template>

<script>
export default {
  name: 'MainHeader',
  data () {
    return {

    }
  },
  components: {

  },
  mounted () {

  },
  methods: {

  }
}
</script>

<style lang="less" scoped>
.mian-header {
  width: 100%;
  height: 76px;
  position: fixed;
  z-index: 9999;
  top: 0;
  left: 0;
  right: 0;
  background: #242424;
  .mian-logo {
    width: 160px;
    display: flex;
    align-items: center;
    margin-right: 30px;
    a {
      width: 100%;
      display: block;
      height: 64px;
      background-position: 0px center;
      background-repeat: no-repeat;
      background-size: 146px 26px;
      //   background-image: url('../../../assets/images/logo.png');
    }
    img {
      width: 130px;
    }
  }
  .nav {
    flex: 1;

    li {
      font-size: 14px;
      height: 100%;
      padding: 0 15px;

      a {
        position: relative;
        transition: all 0.4s;

        &.router-link-active {
          color: #fa2800;

          &::after {
            content: "";
            position: absolute;
            background: #fa2800;
            left: 0;
            right: 0;
            bottom: -12px;
            width: 4px;
            height: 4px;
            border-radius: 50%;
            margin: 0 auto;
            opacity: 1;
          }
        }
        &:hover {
          color: #fa2800;
        }
      }
    }
  }
}
</style>
