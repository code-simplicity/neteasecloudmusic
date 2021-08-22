<template>
  <div class="mian-header">
    <div class="container flex-row">
      <div class="mian-logo">
        <router-link :to="{ name: 'home' }" tag="a"></router-link>
      </div>
      <ul class="nav flex-row">
        <li>
          <router-link :to="{ name: 'home' }" tag="a">发现音乐</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'mymusic' }" tag="a">我的音乐</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'recommend' }" tag="a">推荐</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'leaderboard' }" tag="a">排行榜</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'playlist' }" tag="a">歌单</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'singer' }" tag="a">歌手</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'mv' }" tag="a">MV</router-link>
        </li>
      </ul>
      <div class="mian-search">
        <i class="el-icon-search">点我搜索</i>
      </div>
      <div class="mian-user">
        <div class=""></div>
        <div class="main-is-login flex-row" v-if="loginStatus">
          <el-avatar
            class="mian-avatar"
            src="https://p1.music.126.net/T5i5Jm6GbwihfhJ0PuLW0g==/109951166297714006.jpg?param=30y30"
          ></el-avatar>
          <el-dropdown trigger="hover" @command="handleCommand">
            <span class="el-dropdown-link">
              用户名
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item icon="el-icon-user">我的主页</el-dropdown-item>
              <el-dropdown-item icon="el-icon-message"
                >我的消息</el-dropdown-item
              >
              <el-dropdown-item icon="el-icon-setting"
                >个人设置</el-dropdown-item
              >
              <el-dropdown-item icon="el-icon-medal">我的等级</el-dropdown-item>
              <el-dropdown-item icon="el-icon-switch-button"
                >退出</el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <div class="mian-no-login flex-row" @click="login" v-else>登录</div>
      </div>
    </div>
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
  height: 64px;
  transition: all 400ms ease-in-out;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 2000;
  background: @header-background-color;
  .mian-logo {
    width: 146px;
    display: flex;
    align-items: center;
    margin-right: 30px;
    a {
      width: 100%;
      display: block;
      height: 64px;
      background-position: 0px center;
      background-repeat: no-repeat;
      background-size: 100%;
      background-image: url("../../../assets/images/logo.png");
    }

    img {
      width: 130px;
    }
  }
  .nav {
    flex: 1;
    li {
      font-size: 16px;
      height: 100%;
      padding: 0 15px;
      a {
        // color: chocolate;
        position: relative;
        transition: all 0.4s;
        &.router-link-active {
          color: @color-dark;
          &::after {
            content: "";
            position: absolute;
            background: @color-dark;
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
  .mian-search {
    height: 100%;
    display: flex;
    align-items: center;
    i {
      font-size: 16px;
      color: @color-font-size-White;
      padding: 0 16px;
      cursor: pointer;
      &:hover {
        color: @color-theme;
      }
    }
  }
  .mian-user {
    display: flex;
    align-items: center;
    cursor: pointer;
    position: relative;
    padding-left: 20px;
    .mian-no-login {
      color: @color-font-size-White;
      font-size: 16px;
      &:hover {
        color: @color-theme;
      }
      .mian-avatar {
        margin-right: 10px;
      }
    }
  }
}
</style>
