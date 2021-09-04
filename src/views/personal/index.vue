<template>
  <div class="personal-wrap">
    <div
      class="banner layer"
      :style="{
        backgroundImage: 'url(' + userProfile.backgroundUrl + ')',
      }"
    ></div>
    <div class="personal-main container">
      <div class="center shadow">
        <div class="card-header flex-between">
          <div class="flex-row">
            听歌排行
            <span class="songs-num"
              >累积听歌{{ userDetail.listenSongs }}首</span
            >
          </div>
          <div class="tab flex-row">
            <span>最近一周</span>
            <span class="line"></span>
            <span>所有时间</span>
          </div>
        </div>
        <div>
          <SongDetailsList
            :songListShow="songListShow"
            :songs="songs"
            :isPerson="isPerson"
          ></SongDetailsList>
        </div>
      </div>
      <div class="right">
        <div class="user-box shadow">
          <div
            class="background layer"
            :style="{
              backgroundImage: 'url(' + userProfile.backgroundUrl + ')',
            }"
          ></div>
          <div class="card flex-row">
            <div class="avatar">
              <el-image :src="userProfile.avatarUrl" fit="cover"></el-image>
            </div>
            <div class="info flex-between">
              <p class="name">{{ userProfile.nickname }}</p>
              <div v-if="userInfo.userId === userProfile.userId">
                <el-button type="primary">签到</el-button>
                <el-button type="primary">已签到</el-button>
              </div>
            </div>
          </div>
          <p class="desc">{{ userProfile.signature }}</p>
          <div class="profile">
            <div class="tag">
              <el-tag type="warning" effect="dark">等级：</el-tag>
              <i class="iconfont icon-dengji1">{{ userDetail.level }}</i>
            </div>
            <div class="tag">
              <el-tag type="danger" effect="dark">年龄：</el-tag>
              <span>{{ age }}</span>
              <i
                v-if="userProfile.gender === 1"
                class="iconfont icon-man sex-icon men"
              ></i>
              <i
                v-if="userProfile.gender === 2"
                class="iconfont icon-woman sex-icon women"
              ></i>
            </div>
            <div class="tag">
              <el-tag type="success" effect="dark"> 地区：</el-tag>
              <span>{{ provinceName }} - {{ cityName }}</span>
            </div>
          </div>
          <ul class="follow">
            <li>
              动态
              <span>{{ userProfile.eventCount }}</span>
            </li>
            <li>
              关注
              <span>{{ userProfile.newFollows }}</span>
            </li>
            <li>
              粉丝 <span>{{ userProfile.followeds }}</span>
            </li>
          </ul>
          <div class="user-setting flex-center">
            <router-link class="active" to="/">编辑资料</router-link>
          </div>
        </div>
        <div class="right-list">
          <div class="my-songs module shadow">
            <div class="card-header flex-row">
              <span>我创建的歌单</span>
            </div>
          </div>
          <div class="my-songs collect module shadow">
            <div class="card-header flex-row">
              <span>我收藏的歌单</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'
import SongDetailsList from '@/components/MianComponent/SongDetailsList'
import { getUserDetail } from '@/api/service/api'
import { getUserRecord } from '@/api/service/user'
import { createSong } from '@/model/song'
export default {
  name: 'Personal',
  data() {
    return {
      // 歌曲
      songs: [],
      // 用户资料
      userProfile: {},
      isPerson: true,
      // 省或者直辖市
      provinceName: '',
      cityName: '',
      // 用户大致信息
      userDetail: {},
      // 类型
      type: 1,
      // 关闭组件的底部标题
      songListShow: false
    }
  },
  components: {
    SongDetailsList
  },
  computed: {
    ...mapGetters(['userInfo']),
    age() {
      return this.utils.getAstro(this.userProfile.birthday)
    }
  },

  watch: {
    $route(newVal) {
      console.log(newVal.query.id)
      // 判断是登录者的id还是账户的id
      if (newVal.query.id) {
        this.getUserDetail(newVal.query.id)
      } else {
        this.getUserDetail(this.userInfo.userId)
      }
      this._initialize()
    }
  },

  mounted() {
    let userId = this.$route.query.id
    // 判断是路由携带过来的id还是状态中存储的id
    if (userId) {
      this.getUserDetail(userId)
    } else {
      this.getUserDetail(this.userInfo.userId)
    }
  },

  methods: {
    // 获取用户播放记录
    async getUserRecord() {
      try {
        let res = await getUserRecord(this.userProfile.userId, this.type)
        if (res.code === this.constants.code_status) {
          // 判断是一周的播放记录还是全部的播放记录
          console.log('res ==>', res)
          if (this.type === 1) {
            this.songs = this._normalizeSongs(res.weekData)
          } else {
            this.songs = this._normalizeSongs(res.allData)
          }
          console.log('getUserRecord', this.songs);
        }
      } catch (error) {
        console.log(error)
      }
    },

    // 格式化歌曲
    _normalizeSongs(list) {
      let rest = []
      list.map(item => {
        item.song.playCount = item.playCount
        item.song.score = item.score
        if (item.song.id) {
          rest.push(createSong(item.song))
        }
      })
      return rest
    },

    // 获取用户登录的地区接口
    getArea() {
      axios.get('https://restapi.amap.com/v3/config/district', {
        params: {
          key: '4d07c1959663fb732d792f9ea06d95ba',
          keywords: this.userProfile.province,
          subdistrict: 2,
          extensions: 'base'
        }
      }).then(response => {
        // 调用该接口之后成功，返回相关的值，并且将相关的值赋予，这个时候就可以获取到省份了
        if (response.data.status === '1' && response.data.info === 'OK') {
          let districts = response.data.districts[0]
          let subDistricts = response.data.districts[0].districts
          this.provinceName = districts.name
          console.log('getArea', response.data.districts[0])
          subDistricts.map(item => {
            if (item.adcode === this.userProfile.city) {
              this.cityName = item.name
            }
          })
        }
      }).catch(error => {
        console.log(error)
      })
    },

    // 获取用户信息
    async getUserDetail(id) {
      try {
        let res = await getUserDetail(id)
        if (res.code === this.constants.code_status) {
          this.userProfile = res.profile
          this.userDetail = res
          // 初始化加载初始化函数
          this._initialize()
        }
      } catch (error) {
        console.log(error)
      }
    },

    // 初始化函数
    _initialize() {
      this.getArea()
      this.getUserRecord()
    }
  }
}
</script>

<style lang='less' scoped>
.personal-wrap {
  margin-top: 10px;
  .banner {
    width: 100%;
    height: 350px;
  }
  .personal-main {
    display: flex;
    align-items: flex-start;
    .right {
      width: 400px;
      position: relative;
      margin-top: 20px;
      flex-shrink: 0;
      .user-box {
        background: #fff;
        border-radius: 8px;
        padding-bottom: 30px;
        .background {
          width: 100%;
          height: 140px;
          position: relative;
          border-radius: 8px 8px 0 0;
          background-size: cover;
          &::after {
            border-radius: 8px 8px 0 0;
          }
        }
        .card {
          width: 100%;
          margin-top: -20px;
          padding: 0 15px 0 30px;
          .avatar {
            width: 70px;
            height: 70px;
            flex-shrink: 0;
            z-index: 2;
            position: relative;
            .el-image {
              width: 100%;
              height: 100%;
              border-radius: 8px;
            }
          }
          .info {
            width: 100%;
            padding-top: 20px;
            margin-left: 10px;
            .name {
              font-weight: 600;
              font-size: 1rem;
            }
          }
        }
        .desc {
          font-size: 0.9rem;
          padding: 0 40px;
          margin-top: 10px;
          color: crimson;
        }
        .profile {
          padding: 0 36px;
          margin-top: 10px;
          .tag {
            display: flex;
            align-items: center;
            margin-bottom: 6px;
            position: relative;
            font-size: 0.9rem;
            .icon-dengji1 {
              font-size: 1.4rem;
              position: relative;
              top: 1px;
              color: #f4606c;
              margin-left: 10px;
            }
            span {
              padding-left: 10px;
            }
            .sex-icon {
              font-size: 0.9rem;
              margin-left: 10px;
              font-weight: bold;
              &.men {
                color: #4192eb;
              }
              &.women {
                color: #f4606c;
              }
            }
          }
        }
        .follow {
          list-style: none;
          display: flex;
          margin: 0 40px;
          padding-top: 16px;
          border-top: 1px solid #272766;
          li {
            width: 33%;
            text-align: center;
            font-size: 0.9rem;
            color: @color-blank;
            span {
              display: block;
            }
          }
        }
        .user-setting {
          width: 100%;
          padding: 0 40px;
          margin-top: 30px;
          .active {
            display: block;
            width: 50%;
            text-align: center;
            margin: 0 3% 10 3%;
            padding: 10px 0;
            background: #ff416c;
            background: linear-gradient(to right, #ff4b2b, #ff416c);
            color: #fff;
            border-radius: 5px;
            font-size: 14px;
          }
        }
      }
    }
    .center {
      flex: 1;
      background: #fff;
      position: relative;
      margin-top: 20px;
      margin-right: 20px;
      border-radius: 8px;
      padding: 16px;
      .card-header {
        // border-left: 2px solid @color-theme;
        height: 20px;
        padding-left: 1rem;
        margin-bottom: 0px;
        font-weight: 500;
        font-size: 1.1rem;
        .songs-num {
          font-weight: 400;
          font-size: 0.9rem;
          margin-left: 10px;
        }
        .tab {
          span {
            font-size: 0.9rem;
            cursor: pointer;
            &:hover {
              color: @color-theme;
            }
          }
          .line {
            width: 2px;
            height: 13px;
            background: @color-blank;
            display: block;
            margin: 0 10px;
          }
        }
      }
    }
  }
}
</style>
