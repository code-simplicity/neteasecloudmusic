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
          <router-link :to="{ name: 'leaderboard' }" tag="a"
            >排行榜</router-link
          >
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
          <el-avatar class="mian-avatar" :src="userInfo.avatarUrl"></el-avatar>
          <el-dropdown trigger="hover" @command="handleCommand">
            <span class="mian-username el-dropdown-link">
              {{ userInfo.nickname }}
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item icon="el-icon-user" command="myHomePage"
                >我的主页</el-dropdown-item
              >
              <el-dropdown-item icon="el-icon-message" command="myMessage">
                >我的消息</el-dropdown-item
              >
              <el-dropdown-item icon="el-icon-setting" command="personalSetting"
                >个人设置</el-dropdown-item
              >
              <el-dropdown-item icon="el-icon-medal" command="myRank"
                >我的等级</el-dropdown-item
              >
              <el-dropdown-item
                divided
                icon="el-icon-switch-button"
                command="logout"
                >退出登录</el-dropdown-item
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
import {logout} from '../../../api/service/user'
import {mapGetters, mapActions} from 'vuex'
export default {
  name: 'MainHeader',
  data () {
    return {

    }
  },
  components: {

  },
  // 计算属性
  computed: {
    ...mapGetters(['loginStatus', 'userInfo'])
  },
  
  mounted () {

  },
  methods: {
   async handleCommand(command) {
      switch(command) {
        case 'myHomePage': {
            this.$router.push({
            name: 'home'
          })
          break
        }
        case 'myMessage': {
          this.$router.push({
            name: 'myMessage'
          })
          break
        }
        case 'personalSetting': {
          this.$router.push({
            name: 'personalSetting'
          })
          break
        }
        case 'myRank': {
          this.$router.push({
              name: 'myRank'
          })
          break
        }
        case 'logout': {
          const res = await logout()
          console.log(res);
          if (res.code === 200) {
            this.$message.success('成功退出登录!')
            this.$router.push({
              name: 'login'
            })
            localStorage.setItem('loginStatus', false)
            localStorage.setItem('token', '')
            localStorage.setItem('userInfo', '')
          }
          break
        }
        default:
          break
      }
    },
    // 实现登录
    login() {
      this.$router.push({
        name: 'login'
      })
    },
    // mapActions,响应状态的改变
    ...mapActions([])
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
    list-style:none;
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
        margin-left: 20px;
      }
    }
    .mian-username {
      padding-left: 10px;
      color: @color-font-size-White;
      &:hover {
        color: @color-theme;
      }
    }
  }
}
</style>
