<template>
  <div class="video-wrap container">
    <div class="filter shadow">
      <div class="title flex-center" @click="openFilter">
        {{ currentCat }}
        <i class="iconfont icon-zhankai"></i>
        <transition name="fade">
          <div class="filter-box shadow" v-if="showFilter">
            <ul>
              <li
                v-for="item of videoTags"
                :key="item.id"
                :class="currentCat === item.name ? 'active' : ''"
                @click="chooseType(item.id, item.name)"
              >
                {{ item.name }}
              </li>
            </ul>
          </div>
        </transition>
      </div>
      <div class="hot-tag flex-row">
        <p>分类：</p>
        <ul class="flex-center">
          <li
            v-for="item of videoCategory"
            :key="item.id"
            :title="item.name"
            :class="currentCat === item.name ? 'active' : ''"
            @click="chooseType(item.id, item.name)"
          >
            {{ item.name }}
          </li>
        </ul>
      </div>
      <div
        class="all"
        :class="currentCat === '全部' ? 'active' : ''"
        @click="chooseType('', '全部')"
      >
        全部
      </div>
    </div>
    <MVList :mvs="videos"></MVList>
    <div class="page flex-center">
      <button
        class="page-btn flex-center trainsition"
        :disabled="offset === 0"
        @click="prev"
        title="上一页"
      >
        上一页
      </button>
      <button
        class="page-btn flex-center trainsition"
        :disabled="!hasmore"
        @click="next"
        title="下一页"
      >
        下一页
      </button>
    </div>
  </div>
</template>

<script>
import MVList from '@/components/MianComponent/MVList'
import { createVideo } from '@/model/video'
import {
  getVideoGroupList, getVideoCategoryList, getVideoGroup,
  getVideoAll
} from '@/api/service/video'
export default {
  name: 'Video',
  data() {
    return {
      // 显示的文字
      currentCat: '全部',
      currentId: '',
      // 展示标签
      showFilter: false,
      // 标签
      videoTags: [],
      //  视频分类列表
      videoCategory: [],
      // 视频
      videos: [],
      // 漂移
      offset: 0,
      // 是否还有
      hasmore: true,
    }
  },
  components: {
    MVList
  },
  mounted() {
    this.getVideoGroupList()
    this.getVideoCategoryList()
    this.getVideoAll()
  },
  methods: {
    // 上一页
    prev() {
      this.offset -= 1
      if (this.currentId) {
        this.getVideoGroup(this.currentId)
      } else {
        this.getVideoAll()
      }
    },

    // 下一页
    next() {
      this.offset += 1
      if (this.currentId) {
        this.getVideoGroup(this.currentId)
      } else {
        this.getVideoAll()
      }
    },

    // 选择标签
    chooseType(id, name) {
      this.hasmore = true
      this.offset = 0
      this.currentCat = name
      if (id) {
        this.getVideoGroup(id)
      } else {
        this.getVideoAll()
      }
    },

    // 获取全部视频
    async getVideoAll() {
      try {
        let res = await getVideoAll(this.offset)
        if (res.code === this.constants.code_status) {
          this.videos = this._normalizeVideos(res.datas)
          if (res.hasmore) {
            this.hasmore = true
          } else {
            this.hasmore = false
          }
        }
      } catch (error) {
        console.log(error)
      }
    },

    // 获取视频标签/分类下的标签
    async getVideoGroup(id) {
      try {
        let res = await getVideoGroup(id, this.offset)
        if (res.code === this.constants.code_status) {
          // 处理视频
          this.videos = this._normalizeVideos(res.datas)
          if (res.hasmore) {
            this.hasmore = true
          } else {
            this.hasmore = false
          }
        }
      } catch (error) {
        console.log(error)
      }
    },

    // 获取视频分类列表
    async getVideoCategoryList() {
      try {
        let res = await getVideoCategoryList()
        if (res.code === this.constants.code_status) {
          let listTag = res.data.filter(item => {
            return item.id !== 1000
          })
          this.videoCategory = listTag
        }
      } catch (error) {
        console.log(error)
      }
    },

    // 打开菜单
    openFilter() {
      this.showFilter = !this.showFilter
    },
    // 获取视频标签
    async getVideoGroupList() {
      try {
        let res = await getVideoGroupList()
        if (res.code === this.constants.code_status) {
          // 过滤视频标签
          let listTag = res.data.filter(item => {
            return item.id !== 1000
          })
          this.videoTags = listTag
        }
      } catch (error) {
        console.log(error)
      }
    },

    // 处理视频
    _normalizeVideos(list) {
      let resArr = []
      list.map(item => {
        // 视频数据
        let res = item.data
        // 直播数据
        let liveRes = item.data.liveData
        // 视频id存在就是视频，否则就是直播
        if (res.vid) {
          resArr.push(
            createVideo({
              id: res.vid,
              nickName: res.creator.nickname,
              name: res.title,
              playCount: res.playTime,
              duration: res.durationms,
              image: res.coverUrl,
              isLive: false
            })
          )
        } else {
          resArr.push(
            createVideo({
              id: liveRes.liveRoom.liveRoomNo,
              nickName: liveRes.liveUser.nickName,
              name: liveRes.liveRoom.title,
              playCount: liveRes.liveRoom.popularity,
              duration:
                liveRes.liveRoom.liveStatus === 1 ? '正在直播' : '直播已关闭',
              image: liveRes.liveRoom.coverUrl,
              isLive: true
            })
          )
        }
      })
      return resArr
    }
  }
}
</script>

<style lang='less' scoped>
.fade.enter {
  opacity: 0;
  transform: translate3d(0, 30px, 0);
}
.fade.enter-active {
  transform: all 0.5s;
}
.fade.leave-to {
  opacity: 0;
  transform: translate3d(0, 30px, 0);
}
.fade.leave-to {
  transform: all 0.5s;
}
.video-wrap {
  margin-top: 10px;
  .filter {
    display: flex;
    width: 100%;
    height: 40px;
    align-items: center;
    margin-bottom: 20px;
    padding-right: 20px;
    border-radius: 5px 0px 5px 5px;
    .title {
      width: auto;
      height: 100%;
      padding: 0 5px 0 15px;
      background: @color-theme;
      border-radius: 5px 0px 5px 5px;
      color: @color-dark;
      cursor: pointer;
      position: relative;
      margin-right: 15px;
      &::after {
        content: '';
        width: 1px;
        height: 20px;
        margin-left: 12px;
        background: #e7e7e7;
        opacity: 0;
      }
      i {
        margin-left: 10px;
        font-size: 1.1rem;
      }
      .filter-box {
        width: 720px;
        height: 400px;
        position: absolute;
        overflow-y: scroll;
        background: rgba(255, 255, 255, 1);
        left: 0;
        top: 50px;
        z-index: 100;
        padding: 15px 10px 0 16px;
        border-radius: 8px;
        color: @color-blank;
        ul {
          display: flex;
          flex-wrap: wrap;
          li {
            font-size: 0.9rem;
            background: @color-dark;
            border-radius: 16px;
            padding: 8px 18px;
            margin: 0 10px 10px 0;
            cursor: pointer;
            color: @color-blank;
            transition: all 0.4s;
            &:hover {
              color: @color-dark;
              background: @color-theme;
            }
            &.active {
              color: @color-dark;
              background: @color-theme;
            }
          }
        }
      }
    }
    .hot-tag {
      flex: 1;
      p {
        font-size: 1rem;
        align-items: center;
        margin: 0;
        color: @color-blank;
      }
      ul {
        li {
          margin: 0 6px;
          cursor: pointer;
          padding-right: 10px;
          color: @color-blank;
          border-radius: 20px;
          padding: 0 10px;
          font-size: 1rem;
          &:hover {
            color: @color-dark;
            background: @color-theme;
          }
          &.active {
            color: @color-dark;
            background: @color-theme;
          }
        }
      }
    }
    .all {
      border-radius: 8px;
      padding: 5px 10px;
      color: @color-blank;
      font-size: 0.9rem;
      transition: all 0.4s;
      cursor: pointer;
      &:hover {
        background: @color-theme;
        color: @color-dark;
      }
      &.active {
        background: @color-theme;
        color: @color-dark;
      }
    }
  }
  .page {
    .page-btn {
      padding: 7px 10px;
      border-radius: 3px;
      background: @color-theme;
      color: #ffffff;
      margin: 0 10px;
      cursor: pointer;
      border: 0;
      &.active {
        background: @color-theme;
        color: #ffffff;
      }
      &:hover {
        background: @color-theme;
        color: #ffffff;
      }
      &:disabled {
        color: #fff;
        background-color: #fab6b6;
        border-color: #fab6b6;
      }
    }
  }
}
</style>
