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
        <!-- <li>
          <router-link :to="{ name: 'recommend' }" tag="a">推荐</router-link>
        </li> -->
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
      <div class="mian-search" @click="openSearchDialog">
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
              <el-dropdown-item icon="el-icon-message" command="myMessage"
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
    <!-- 搜索 -->
    <div class="main-menu-item" :class="[searchOpen, searchClose]">
      <div class="overlay" @click="closeSearchDialog"></div>
      <div class="search-body">
        <div class="search-content">
          <div class="search-dialog-cover">
            <div class="bg-effect">
              <span class="layer"></span>
            </div>
            <div class="search-form">
              <el-input
                class="text"
                type="text"
                v-model="keywords"
                placeholder="输入音乐/视频/电台/mv等并按下回车键"
                @change="search"
                clearable
                maxlength="40"
              ></el-input>
            </div>
          </div>
          <div class="search-hot" v-show="searchHistory.length">
            <div class="title flex-row">
              <i class="iconfont icon-zuji1"></i>
              <span>历史记录</span>
              <p @click="clearSearch">清空</p>
            </div>
            <ul class="tags">
              <li v-for="item of searchHistory" :key="item">
                <a class="btn flex-row" @click="tagSearch(item)"
                  >{{ item }}
                  <span
                    class="close-dark"
                    @click.stop="deleteItem(item)"
                  ></span>
                </a>
              </li>
            </ul>
          </div>
          <div class="search-hot">
            <div class="title flex-row">
              <i class="iconfont icon-rementuijian-copy"></i>
              <span>热门搜索</span>
            </div>
            <ul class="tags" v-if="hots.length > 0">
              <li v-for="item of hots" :key="item.first">
                <a class="btn" @click="tagSearch(item.first)">{{
                  item.first
                }}</a>
              </li>
            </ul>
          </div>
        </div>
        <div class="close-btn flex-center" @click="closeSearchDialog">
          <span class="close-light"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { logout } from '../../../api/service/user'
import { getSearchHot } from '../../../api/service/api'
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'MainHeader',
  data() {
    return {
      // 关键字 
      keywords: '',
      // 热门搜索内容
      hots: [],
      // 搜索历史
      historys: [],
      // 打开搜索框
      searchOpen: '',
      // 关闭搜索框
      searchClose: ''
    }
  },
  components: {

  },
  // 计算属性
  computed: {
    ...mapGetters(['loginStatus', 'userInfo', 'searchHistory'])
  },

  mounted() {
    this.getSearchHot()
  },
  methods: {

    // 搜索
    search() {
      if (this.keywords.split(' ').join(' ').length !== 0) {
        // 关闭搜索框
        this.closeSearchDialog()
        // 跳转到搜索页面
        this.$router.push({
          name: 'search',
          query: {
            keywords: this.keywords
          }
        })
        this.saveSearchHistory(this.keywords)
      }
    },

    // 点击标签搜索
    tagSearch(keywords) {
      // 关闭搜索框
      this.closeSearchDialog()
      // 跳转到搜索页面
      this.$router.push({
        name: 'search',
        query: {
          keywords
        }
      })
    },

    // 获取热搜列表
    async getSearchHot() {
      try {
        let res = await getSearchHot()
        if (res.code === this.constants.code_status) {
          this.hots = res.result.hots
        }
      } catch (error) {
        console.log(error)
      }
    },

    // 删除单个历史搜索记录
    deleteItem(item) {
      this.deleteSearchHistory(item)
    },

    // 清空搜索历史记录
    clearSearch() {
      this.clearSearchHistory()
    },

    // 展示搜索框
    openSearchDialog() {
      this.searchOpen = 'open'
      this.searchClose = ''
    },

    // 关闭搜索框
    closeSearchDialog() {
      this.searchOpen = ''
      this.searchClose = 'close'
    },

    // 跳转路由
    async handleCommand(command) {
      switch (command) {
        case 'myHomePage': {
          this.$router.push({
            name: 'personal'
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
    ...mapActions(['saveSearchHistory', 'deleteSearchHistory', 'clearSearchHistory'])
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
    width: 60px;
    align-items: center;
    margin-right: 30px;
    a {
      width: 100%;
      display: block;
      height: 64px;
      background-position: center;
      background-repeat: no-repeat;
      background-size: 100% 100%;
      background-image: url('../../../assets/images/logo.png');
    }

    img {
      width: 130px;
    }
  }
  .nav {
    flex: 1;
    list-style: none;
    align-items: center;
    li {
      font-size: 1rem;
      height: 100%;
      padding: 0 16px;
      a {
        font-size: 1rem;
        position: relative;
        transition: all 0.4s;
        &.router-link-active {
          color: @color-dark;
          &::after {
            content: '';
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
      font-size: 1rem;
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
      font-size: 1.2rem;
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
  .main-menu-item {
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: none;
    width: 100%;
    height: 100vh;
    top: 0;
    left: 0;
    .overlay {
      width: 100%;
      height: 100vh;
      left: 0;
      top: 0;
      position: absolute;
      background: rgba(120, 129, 147, 0.22);
      opacity: 0;
      -webkit-transition: opacity 0.3s;
      transition: opacity 0.3s;
      -webkit-backface-visibility: hidden;
      -webkit-transition-duration: 0.3s;
      transition-duration: 0.3s;
    }
    .search-body {
      position: relative;
      opacity: 0;
      max-width: 790px;
      width: 100%;
      animation-duration: 0.3s;
      animation-fill-mode: forwards;
      .search-content {
        position: relative;
        border-radius: 4px;
        box-shadow: 0 10px 50px -5px rgba(8, 109, 197, 0.12);
        padding: 0;
        border: 0;
        width: 100%;
        background: #fff;
        height: auto;
        overflow: hidden;
        .search-dialog-cover {
          position: relative;
          overflow: hidden;
          padding: 3rem;
          .bg-effect {
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            filter: blur(8px);
            transform: scale(1.05);
            background-position: center;
            position: absolute;
            // background-image: ;
            background-size: cover;
            background-repeat: no-repeat;
            background-position: center;
            .layer {
              width: 100%;
              height: 100%;
              background-color: rgb(85, 85, 85);
              position: absolute;
              opacity: 1;
              top: 0;
              left: 0;
              transition: opacity 0.3s ease-in-out;
            }
          }
          .search-form {
            position: relative;
            padding: 3rem 0;
            .text {
              display: block;
              width: 100%;
              background-clip: padding-box;
              transition: border-color 0.15s ease-in-out,
                box-shadow 0.15s ease-in-out;
              font-size: 0.9375rem;
              line-height: 1.5;
              padding: 0.625rem 0.75rem;
              height: calc(1.5em + 1.71875rem + 2px);
              text-align: center;
              font-weight: normal;
              color: #fff;
              border-color: transparent;
              background-color: rgba(0, 0, 0, 0.03);
              transition: all 0.3s ease;
              border-radius: 5px;

              &:hover {
                background-color: rgba(255, 255, 255, 0.04);
                border-color: transparent;
              }

              &:focus {
                background-color: rgba(255, 255, 255, 0.04);
                border-color: transparent;
                color: #fff;
              }

              &::placeholder {
                color: #fff;
                opacity: 1;
              }
            }
          }
        }
        .search-hot {
          padding: 1.5rem 3rem;
          .title {
            margin-bottom: 18px;
            border-bottom: 1px solid @color-theme;
            i {
              color: @color-theme;
              font-size: 1.6rem;
              margin-right: 12px;
            }
            span {
              font-size: 1rem;
              flex: 1;
            }

            p {
              color: @color-theme;
              cursor: pointer;
            }
          }
          .tags {
            width: 100%;
            margin: 0 -0.25rem;
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            list-style: none;
            li {
              padding: 0.25rem;
              cursor: pointer;
              .btn {
                display: flex;
                font-weight: 400;
                color: #ffffff;
                background-color: #596460;
                text-align: center;
                vertical-align: middle;
                user-select: none;
                border: 1px solid transparent;
                font-size: 0.8rem;
                padding: 0.4rem 0.75rem;
                line-height: 1.5;
                border-radius: 0.25rem;
                transition: color 0.15s ease-in-out,
                  background-color 0.15s ease-in-out,
                  border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
                border-radius: 4px;
                .close-dark {
                  display: inline-block;
                  background-image: url('../../../assets/images/close.png');
                  background-size: contain;
                  background-position: center;
                  background-repeat: no-repeat;
                  vertical-align: middle;
                  width: 14px;
                  height: 14px;
                  margin-left: 8px;
                  opacity: 0.7;
                }
                &:hover {
                  color: @color-theme;

                  .close-dark {
                    opacity: 1;
                  }
                }
              }
            }
          }
        }
      }
      .close-btn {
        position: absolute;
        bottom: -50px;
        left: 0;
        width: 100%;
        z-index: 99;
        cursor: pointer;
        text-align: center;
        .close-light {
          display: inline-block;
          background-image: url('../../../assets/images/close.png');
          background-size: contain;
          background-position: center;
          background-repeat: no-repeat;
          vertical-align: middle;
          width: 28px;
          height: 28px;
        }
      }
    }
    &.open {
      z-index: 9999;
      .overlay {
        opacity: 1;
        pointer-events: auto;
        -webkit-backdrop-filter: blur(10px);
        backdrop-filter: blur(10px);
      }

      .search-body {
        pointer-events: auto;
        -webkit-animation-name: tips-open;
        animation-name: tips-open;
      }
    }
    &.close {
      .search-body {
        -webkit-animation-name: tips-close;
        animation-name: tips-close;
      }
    }
    @keyframes tips-open {
      0% {
        opacity: 0;
        -webkit-transform: translate3d(0, 50px, 0);
        transform: translate3d(0, 50px, 0);
      }

      100% {
        opacity: 1;
        -webkit-transform: translate3d(0, 0, 0);
        transform: translate3d(0, 0, 0);
      }
    }

    @keyframes tips-close {
      0% {
        opacity: 1;
        -webkit-transform: translate3d(0, 0, 0);
        transform: translate3d(0, 0, 0);
      }

      100% {
        opacity: 0;
        -webkit-transform: translate3d(0, 50px, 0);
        transform: translate3d(0, 50px, 0);
      }
    }
  }
}
</style>
