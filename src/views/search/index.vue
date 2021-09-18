<template>
  <div class="search-wrap">
    <div class="banner layer">
      <div class="search-content">
        <div class="search-box flex-row">
          <el-input
            v-model="keywords"
            placeholder="音乐/视频/电台/mv"
            class="search"
            type="text"
            maxlength="128"
            clearable
          ></el-input>
          <i class="iconfont icon-soushuo search-icon" @click="search(1)"></i>
        </div>
        <div
          class="search-list"
          :class="!isKeywords ? 'hot' : ''"
          style="display: none"
        >
          <div
            class="item"
            v-if="searchResult.songs && searchResult.songs.length > 0"
          >
            <div class="title flex-row">
              <i class="iconfont icon-danqu"></i>单曲
            </div>
            <ul>
              <li v-for="item of searchResult.songs" :key="item.id">
                {{ item.name }}
              </li>
            </ul>
          </div>
          <div
            class="item"
            v-if="searchResult.singers && searchResult.singers.length > 0"
          >
            <div class="title flex-row">
              <i class="iconfont icon-geshou"></i>歌手
            </div>
            <ul>
              <li v-for="item of searchResult.artists" :key="item.id">
                {{ item.name }}
              </li>
            </ul>
          </div>
          <div
            class="item"
            v-if="searchResult.albums && searchResult.albums.length > 0"
          >
            <div class="title flex-row">
              <i class="iconfont icon-zhuanji-copy"></i>专辑
            </div>
            <ul>
              <li v-for="item of searchResult.albums" :key="item.id">
                {{ item.name }}
              </li>
            </ul>
          </div>
          <div
            class="item"
            v-if="searchResult.videos && searchResult.videos.length > 0"
          >
            <div class="title flex-row">
              <i class="iconfont icon-shipin"></i>视频
            </div>
            <ul>
              <li v-for="item of searchResult.mvs" :key="item.id">
                {{ item.name }}
              </li>
            </ul>
          </div>
          <div
            class="item"
            v-if="searchResult.playList && searchResult.playList.length > 0"
          >
            <div class="title flex-row">
              <i class="iconfont icon-gedanshenhe"></i>歌单
            </div>
            <ul>
              <li v-for="item of searchResult.playlists" :key="item.id">
                {{ item.name }}
              </li>
            </ul>
          </div>
        </div>
        <h3>
          搜索<span>'{{ keywords }}'</span>，找到<span>{{ num }}</span
          >{{ result }}
        </h3>
      </div>
    </div>
    <div class="search-main container">
      <div class="tab flex-row">
        <div :class="searchType === 1 ? 'active' : ''" @click="changeType(1)">
          单曲
        </div>
        <div
          :class="searchType === 100 ? 'active' : ''"
          @click="changeType(100)"
        >
          歌手
        </div>
        <div :class="searchType === 10 ? 'active' : ''" @click="changeType(10)">
          专辑
        </div>
        <div
          :class="searchType === 1014 ? 'active' : ''"
          @click="changeType(1014)"
        >
          视频
        </div>
        <div
          :class="searchType === 1000 ? 'active' : ''"
          @click="changeType(1000)"
        >
          歌单
        </div>
      </div>
      <!-- 内容显示 -->
      <div class="content">
        <SongDetailsList
          v-if="searchType === 1"
          :songListShow="songListShow"
          :songs="songs"
          :isPerson="isPerson"
        ></SongDetailsList>
        <SongerItem v-if="searchType === 100" :songItem="singers"></SongerItem>
        <AlbumList v-if="searchType === 10" :albums="albums"></AlbumList>
        <MVList :mvs="videos" v-if="searchType === 1014"></MVList>
        <PopularPlayList
          :songMusic="playList"
          v-if="searchType === 1000"
        ></PopularPlayList>
      </div>
    </div>
  </div>
</template>

<script>
import SongDetailsList from '@/components/MianComponent/SongDetailsList'
import MVList from '@/components/MianComponent/MVList'
import PopularPlayList from '@/components/Home/PopularPlayList'
import SongerItem from '@/components/MianComponent/SongerItem'
import AlbumList from '@/components/MianComponent/AlbumList'
import { search, getSongDetail, searchSuggest } from '@/api/service/api'
import { createSong } from '@/model/song'
import { createVideo } from '@/model/video'
export default {
  name: 'Search',
  data() {
    return {
      // 关键字
      keywords: '',
      // 搜索结果
      searchResult: {},
      // 搜索类型
      searchType: 1,
      // 歌曲
      songs: [],
      // 关闭组件的顶部标题
      songListShow: false,
      // 返回的数量
      limit: 100,
      // 默认偏移
      offset: 0,
      // 歌手
      singers: [],
      // 专辑
      albums: [],
      // 视频
      videos: [],
      // 歌单
      playList: [],
      isPerson: true,
      // 搜索结果后缀
      result: '单曲',
      // 搜索结果
      num: 0

    }
  },
  components: {
    SongDetailsList,
    MVList,
    PopularPlayList,
    SongerItem,
    AlbumList
  },

  computed: {
    isKeywords() {
      return this.keywords.split(' ').join('').length === 0
    }
  },

  watch: {
    // 观察关键字的值，做出对应的操作
    keywords(newVal, oldVal) {
      console.log(newVal, oldVal)
      if (this.timer) {
        // 清除定时器
        clearTimeout(this.timer)
      }
      if (!this.keywords || this.keywords.split(' ').join('').length === 0) {
        this.searchResult = {}
        return
      }
      this.timer = setTimeout(() => {
        this.searchSuggest()
        this.search(this.type)
      }, 500)
    },

    // 获取路由携带过来的关键字
    $route(newObj, oldObj) {
      if (newObj.query.keywords !== oldObj.query.keywords) {
        this.keywords = newObj.query.keywords
        this.search(1)
      }
    }
  },

  mounted() {
    let keywords = this.$route.query.keywords
    if (keywords) {
      this.keywords = keywords
      this.search(1)
    }
  },
  methods: {

    // 搜索建议
    async searchSuggest() {
      try {
        let res = await searchSuggest(this.keywords)
        if (JSON.stringify(res.result) !== '{}') {
          this.searchResult = res.result
        }
        console.log('searchSuggest', res)
      } catch (error) {
        console.log(error)
      }
    },

    // 搜索
    search(type) {
      let params = {
        keywords: this.keywords,
        limit: this.limit,
        offset: this.offset,
        type
      }
      search(params).then(res => {
        if (res.code === this.constants.code_status) {
          switch (type) {
            case 1: {
              // 暂存歌曲
              let list = res.result.songs
              console.log('list', list)
              // 截断
              let sliceArr = []
              list.map(item => {
                sliceArr.push(item.id)
              })
              // 获取歌曲详情
              this.getSongDetail(sliceArr)
              this.result = '首单曲'
              this.num = res.result.songs.length
              break
            }
            case 100: {
              // 歌手
              this.singers = res.result.artists
              this.result = '个歌手'
              this.num = res.result.artists.length
              break
            }
            case 10: {
              // 专辑
              this.albums = res.result.albums
              this.result = '首专辑'
              this.num = res.result.albums.length
              break
            }
            case 1014: {
              // 视频
              this.videos = this._normalizeVideos(res.result.videos)
              this.result = '个视频'
              this.num = res.result.videos.length
              break
            }
            case 1000: {
              // 歌单
              this.playList = res.result.playlists
              this.result = '个歌单'
              this.num = res.result.playlists.length
              break
            }
            default: {
              let list = res.result.songs
              let sliceArr = []
              list.map(item => {
                sliceArr.push(item.id)
              })
              this.getSongDetail(sliceArr)
              break
            }
          }
        }
      }).catch(error => {
        console.log(error)
      })
    },

    // 获取歌曲列表
    async getSongDetail(list) {
      let timestamp = new Date().valueOf()
      // 将歌曲以逗号隔开
      let ids = list.join(',')
      try {
        let beforeRes = await getSongDetail(ids, timestamp)
        let res = beforeRes.songs
        this.songs = this._normalizeSongs(res)
        console.log('this.songs', this.songs)
      } catch (error) {
        console.log(error)
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

    // 初始化视频
    _normalizeVideos(list) {
      let res = []
      list.map(item => {
        if (item.vid) {
          res.push(createVideo({
            id: item.vid,
            nickName: item.creator.nickname,
            name: item.title,
            playCount: item.playTime,
            duration: item.durationms,
            image: item.coverUrl,
            isLive: false
          }))
        }
      })
      return res
    },

    // 改变类型
    changeType(type) {
      this.searchType = type
      this.search(type)
    }
  }
}
</script>

<style lang='less' scoped>
.search-wrap {
  margin-top: -10px;
  .banner {
    width: 100%;
    height: 250px;
    //  background: url(../../assets/images/personal.jpg);
    background-position: center;
    background-size: cover;
    background-attachment: fixed;
    .search-content {
      width: 720px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      .search-box {
        padding-left: 8px;
        border-radius: 8px;
        background: #f5f5f5;
        position: relative;
        z-index: 10;
        .el-input {
          display: inline-block;
          height: 54px;
          flex: 1;
          line-height: 54px;
          border: none;
          margin-right: 2px;
          padding-left: 10px;
          background: #f5f5f5;
        }
        .search-icon {
          font-size: 1.4rem;
          padding: 15px;
          cursor: pointer;
          color: @color-theme;
        }
      }
      .search-list {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        background: #fff;
        padding: 18px 0 15px;
        transition-property: top;
        transition-duration: 0.2s;
        transition-timing-function: ease-in-out;
        opacity: 0;
        z-index: 0;
        box-shadow: 0 10px 30px 0 rgba(65, 67, 70, 0.08);
        border-radius: 4px;
        .item {
          .title {
            height: 30px;
            padding: 0 18px;
            font-size: 0.8rem;
            color: aquamarine;
            line-height: 30px;
            i {
              font-size: 1.2rem;
              font-weight: 600;
              color: @color-theme;
              margin-right: 6px;
            }
          }
          ul {
            list-style: none;
            li {
              height: 40px;
              line-height: 40px;
              padding: 0 18px;
              font-weight: 300;
              background: #ffffff;
              transition: background 0.1s;
              cursor: pointer;
              &:hover {
                background: #f5f5f5;
              }
            }
          }
        }
      }
      h3 {
        position: absolute;
        top: 120px;
        color: #fff;
        font-size: 1rem;
        span {
          margin: 0 6px;
          font-size: 1.1rem;
          color: rgb(238, 104, 104);
        }
      }
    }
  }
  .search-main {
    opacity: 0.9;
    border-radius: 8px;
    .tab {
      display: flex;
      align-items: baseline;
      margin-top: 10px;
      margin-bottom: 40px;
      padding-top: 20px;
      margin-left: 20px;
      div {
        position: relative;
        display: inline-block;
        height: 20px;
        line-height: 20px;
        margin-right: 34px;
        font-weight: 500;
        color: @color-dark;
        z-index: 1;
        cursor: pointer;
        font-size: 1.2rem;
        &.active {
          &::after {
            position: absolute;
            content: '';
            left: 0;
            bottom: -8px;
            width: 100%;
            height: 4px;
            background: @color-theme;
            opacity: 0.8;
            z-index: -1;
          }
        }
      }
    }
    .content {
    }
  }
}
</style>
