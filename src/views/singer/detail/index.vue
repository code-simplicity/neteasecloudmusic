<template>
  <div class="singer-detail">
    <div class="singer-info">
      <div class="singer-top">
        <div class="singer-top-mask">
          <div class="singer-box flex-column flex-center">
            <div class="singer-avatar transition">
              <el-image :src="userOfSonger.img1v1Url" fit="cover"></el-image>
              <div
                class="singer-level flex-center transition"
                v-show="singerLevel"
              >
                <i class="iconfont icon-dengji1 level-icon" :class="singerLevel"
                  ><span>{{ singerLevel }}</span></i
                >
              </div>
            </div>
            <p class="singer-nickname">
              {{ userOfSonger.name }}
              <i class="iconfont" :class="gender"></i>
            </p>
            <div
              class="singer-follow flex-center transition"
              :class="userOfSonger.followed ? 'active' : ''"
              @click="followBtn"
            >
              <i class="iconfont icon-guanzhu"></i>
              {{ followText }}
            </div>
            <div
              class="singer-desc ellipsis-two"
              v-html="userOfSonger.briefDesc"
            ></div>
            <ul class="singer-info flex-center">
              <li>
                <p class="text">单曲数</p>
                <p class="num">{{ userOfSonger.musicSize }}首</p>
              </li>
              <li>
                <p class="text">专辑数</p>
                <p class="num">{{ userOfSonger.albumSize }}个</p>
              </li>
              <li>
                <p class="text">MV数</p>
                <p class="num">{{ userOfSonger.mvSize }}个</p>
              </li>
              <li v-show="userOfSonger.followeds">
                <p class="text">粉丝</p>
                <p class="num">
                  {{ this.utils.tranNumber(userOfSonger.followeds) }}
                </p>
              </li>
            </ul>
          </div>
        </div>
        <div class="bottom-trangle"></div>
      </div>
      <div class="bottom container">
        <ul class="nav flex-center">
          <li
            v-for="item of navList"
            :key="item.id"
            :class="active === item.id ? 'active' : ''"
            @click="checkType(item.id)"
          >
            {{ item.name }}
          </li>
        </ul>
        <div class="content">
          <SongDetailsList
            :songs="songs"
            :isPerson="isPerson"
            v-if="active === 1"
          ></SongDetailsList>
          <MVList :mvs="mvs" type="mv" v-if="active === 3"></MVList>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { mapGetters } from 'vuex'
import { createSong } from '@/model/song'
import { createVideo } from '@/model/video'
import SongDetailsList from '@/components/MianComponent/SongDetailsList'
import MVList from '@/components/MianComponent/MVList'
import { getArtists, getArtisMv, getArtistDesc, getArtistDetail } from '@/api/service/songer'
import { getUserInfo, follow } from '@/api/service/user'
export default {
  name: 'SingerDetail',
  data() {
    return {
      // 歌手基本信息
      singerInfo: {},
      // 歌手用户信息
      userInfo: {},
      // 歌手详情
      singerDetail: {},
      // 热门歌曲
      songs: [],
      // mv列表
      mvs: [],
      // 功能模块
      navList: [
        {
          name: '热门歌曲',
          id: 1
        },
        {
          name: '所有专辑',
          id: 2
        },
        {
          name: '相关MV',
          id: 3
        },
        {
          name: '艺人介绍',
          id: 4
        },
        {
          name: '相似歌手',
          id: 5
        }
      ],
      // 初始化显示的模块
      active: 1,
      // 分页显示条数
      limit: 20,
      // 分页偏移
      offset: 0,
      isPerson: true,
      // 歌手id
      singerId: '',
      // 歌手主要描述
      singerDesc: {},
      // 关注
      follow: false,
    }
  },
  components: {
    SongDetailsList,
    MVList
  },

  computed: {
    ...mapGetters(['singer']),
    // 歌手信息与用户信息连接起立
    userOfSonger() {
      // 拷贝对象的值，返回一个新的值
      return Object.assign(this.singerInfo, this.userInfo, this.singerDetail)
    },
    // 歌手等级
    singerLevel() {
      if (this.userOfSonger.level > 0) {
        return this.userOfSonger.level
      } else {
        return ''
      }
    },
    // 歌手性别
    gender() {
      if (this.userOfSonger.gender > 0) {
        return this.userOfSonger.gender === 1 ? 'icon-man man' : 'icon-woman woman'
      } else {
        return ''
      }
    },
    followText() {
      return this.userOfSonger.followed ? '已关注' : '关注TA'
    }
  },

  watch: {
    // 观察路由携带过来的id
    $route() {
      let id = this.$route.query.id || this.singer.id
      if (id) {
        this._initialize(id)
      }
    }
  },

  created() {
    let id = this.$route.query.id || this.singer.id
    this.artistId = id
    if (id) {
      this._initialize(id)
    }
  },

  mounted() {
    // let id = this.$route.query.id || this.singer.id
    // this.artistId = id
    // if (id) {
    //   this._initialize(id)
    // }
  },

  methods: {
    // 关注用户
    async followBtn() {
      // 默认是没有关注的
      let t = this.userOfSonger.followed ? 2 : 1
      let message = this.userOfSonger.followed ? '已取消关注' : '关注成功'
      let id = this.userOfSonger.accountId || this.singerId
      try {
        let res = await follow(id, t)
        if (res.code === this.constants.code_status) {
          this.$message({
            message,
            type: 'success'
          })
        }
        this.getArtists(this.artistId)
        console.log('userOfSonger', this.userOfSonger)

      } catch (error) {
        console.log(error)
      }
    },

    // 获取歌手描述
    async getArtistDesc(id) {
      try {
        let res = await getArtistDesc(id)
        if (res.code === this.constants.code_status) {
          if (res.introduction.length > 0) {
            res.introduction.map(item => {
              item.txt = item.txt.replace(/(\r\n|\n|\r)/gm, '<br />')
            })
          }
          this.singerDesc = res
        }
      } catch (error) {
        console.log(error)
      }
    },

    // 获取歌手MV
    async getArtisMv(id) {
      let params = {
        id: this.singerId || id,
        limit: this.userOfSonger.mvSize,
        offset: this.offset
      }
      try {
        let res = await getArtisMv(params)
        if (res.code === this.constants.code_status) {
          this.mvs = this._normalizeVideos(res.mvs)
        }
      } catch (error) {
        console.log(error)
      }
    },

    // 获取歌手基本信息以及热门50首单曲
    async getArtists(id) {
      try {
        let res = await getArtists(id)
        if (res.code === this.constants.code_status) {
          this.singerInfo = res.artist
          // 拿到userId，获取用户的粉丝
          this.getUserInfo(res.artist.accountId)
        }
        this.songs = this._normalizeSongs(res.hotSongs)

        this.getArtisMv(id)
      } catch (error) {
        console.log(error)
      }
    },

    // 切换选择框
    checkType(id) {
      this.active = id
    },

    // 获取歌手详情
    async getArtistDetail(id) {
      try {
        let res = await getArtistDetail(id)
        if (res.code === this.constants.code_status) {
          if (res.data.user) {
            this.singerDetail = res.data.user
            console.log('this.singerDetail', this.singerDetail)
          }
        }
      } catch (error) {
        console.log(error)
      }
    },

    // 获取用户和歌手的信息
    async getUserInfo(uid) {
      let userDetail = {}
      try {
        let res = await getUserInfo(uid)
        let profile = res.profile
        if (res.code === this.constants.code_status) {
          // 等级
          userDetail.level = res.level
          // 粉丝
          userDetail.followeds = profile.followeds
          // 性别
          userDetail.gender = profile.gender
          console.log('getUserInfo ==>', res)
          this.userInfo = userDetail
        }
      } catch (error) {
        console.log(error)
        userDetail.level = ''
        userDetail.followeds = ''
        userDetail.gender = ''
        this.userInfo = userDetail
      }
    },

    // 处理歌曲
    _normalizeSongs(list) {
      let res = []
      list.map(item => {
        if (item.id) {
          res.push(createSong(item))
        }
      })
      return res
    },

    // 处理视频
    _normalizeVideos(list) {
      let res = []
      list.map(item => {
        res.push(createVideo({
          id: item.id,
          nickName: item.artistName,
          name: item.name,
          playCount: item.playCount,
          duration: item.duration,
          image: item.imgurl16v9
        }))
      })
      return res
    },

    // 初始化函数
    _initialize(id) {
      this.active = 1
      this.albumOffset = 0
      this.mvOffset = 0
      this.albums = []
      this.mvs = []
      this.singerId = Number(id)
      this.getUserInfo(id)
      this.getArtists(id)
      this.getArtistDesc(id)
      this.getArtistDetail(id)
    }
  }
}
</script>

<style lang='less' scoped>
.singer-detail {
  margin-top: -20px;
  .singer-info {
    .singer-top {
      width: 100%;
      height: 500px;
      position: relative;
      // background: url(../../../assets/images/top-bg.jpg);
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
      .singer-top-mask {
        width: 100%;
        height: 100%;
        background: rgba(133, 131, 131, 0.6);
        .singer-box {
          height: 100%;
          margin: 0 auto;
          position: relative;
          padding-top: 10px;
          text-align: center;
          z-index: 2;
          .singer-avatar {
            width: 140px;
            height: 140px;
            border-radius: 10%;
            position: relative;
            overflow: hidden;
            .singer-level {
              width: 100%;
              height: 26px;
              position: absolute;
              left: 0;
              right: 0;
              bottom: 0;
              background: rgba(255, 255, 255, 0.8);
              .level-icon {
                color: @color-theme;
                font-size: 1.2rem;
                span {
                  font-size: 0.9rem;
                  font-style: italic;
                }
              }
            }
            .el-image {
              width: 140px;
              height: 140px;
              border-radius: 50%;
              background: #fff;
              border: 3px solid rgba(255, 255, 255, 0.6);
            }
            &:hover {
              box-shadow: 0px 5px 20px 0px rgba(255, 255, 255, 0.8);
            }
          }
          .singer-nickname {
            margin-top: 20px;
            font-size: 1.4rem;
            font-weight: 600;
            color: #fff;
            line-height: 24px;
            i {
              font-size: 1.3rem;
              &.man {
                color: #4192eb;
              }
              &.woman {
                color: #f4606c;
              }
            }
          }
          .singer-follow {
            margin: 16px 0 30px;
            height: 36px;
            width: 96px;
            font-size: 0.9rem;
            line-height: 36px;
            color: #fff;
            border: 1px solid rgba(255, 255, 255, 0.6);
            cursor: pointer;
            border-radius: 18px;
            &:hover {
              background: rgba(255, 255, 255, 0.1);
              border: 1px solid #fff;
            }
            i {
              margin-right: 5px;
              font-size: 1.2rem;
            }
            &.active {
              color: #fff;
              background: @color-theme;
            }
          }
          .singer-desc {
            margin: 0 auto 24px;
            width: 740px;
            height: 48px;
            font-size: 1rem;
            color: rgba(255, 255, 255, 0.8);
            line-height: 24px;
          }
          .singer-info {
            margin: 0 auto;
            width: 100%;
            list-style: none;
            li {
              margin: 0 50px;
              text-align: center;
              .num {
                margin-bottom: 8px;
                font-size: 1.4rem;
                line-height: 24px;
                color: #fff;
              }
              .text {
                font-size: 1rem;
                line-height: 14px;
                color: rgba(255, 255, 255, 0.6);
              }
            }
          }
        }
      }
      .bottom-trangle {
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 130px;
        //  background: url(../../../assets/images/arrow-lr.png);
        background-position: center;
        z-index: 1;
      }
    }
    .bottom {
      align-items: baseline;
      .nav {
        margin: 30px 0;
        list-style: none;
        li {
          margin: 0 20px;
          font-size: 1rem;
          font-weight: 500;
          cursor: pointer;
          color: #fff;
          &.active {
            color: @color-theme;
            &::after {
              display: flex;
              position: absolute;
              justify-content: center;
              align-items: center;
              content: '';
              margin: 2px auto;
              width: 4.1rem;
              height: 2px;
              background: @color-theme;
              opacity: 0.8;
              z-index: 1;
            }
          }
        }
      }
      .content {
        background: #fff;
        opacity: 0.85;
        border-radius: 8px;
        padding-top: 1px;
        padding-bottom: 10px;
      }
    }
  }
}
</style>
