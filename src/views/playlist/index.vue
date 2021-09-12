<template>
  <div class="play-list-wrap container">
    <div class="filter shadow">
      <div class="title flex-center" @click="openFilter">
        {{ currentName }}
        <i class="iconfont icon-zhankai"></i>
        <transition name="playlist">
          <div class="filter-box shadow" v-if="showFilter">
            <div class="item" v-for="item of categorieList" :key="item.key">
              <h2>
                <i class="iconfont" :class="item.icon"></i>{{ item.type }}
              </h2>
              <ul>
                <li
                  :class="currentName === sub.name ? 'active' : ''"
                  v-for="sub of item.list"
                  :key="sub.name"
                  :title="sub.name"
                  @click="chooseTag(sub.name)"
                >
                  {{ sub.name }}
                </li>
              </ul>
            </div>
          </div>
        </transition>
      </div>
      <div class="hot-tag flex-row">
        <p>热门标签：</p>
        <ul class="flex-center">
          <li
            v-for="item of hotCategories"
            :key="item.id"
            :title="item.name"
            :class="currentName === item.name ? 'active' : ''"
            @click="chooseTag(item.name)"
          >
            {{ item.name }}
          </li>
        </ul>
      </div>
      <div class="type">
        <div
          class="item"
          :class="sortType === 'hot' ? 'active' : ''"
          @click="chooseType('hot')"
        >
          热门
        </div>
        <div
          class="item"
          :class="sortType === 'new' ? 'active' : ''"
          @click="chooseType('new')"
        >
          最新
        </div>
      </div>
    </div>
    <PopularPlayList
      :songMusic="songMusic"
      v-loading="loading"
    ></PopularPlayList>
    <!-- 分页 -->
    <div class="el-pagination">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        background
        :page-size="limit"
        layout="total, prev, pager, next"
        :total="totle"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import PopularPlayList from '@/components/Home/PopularPlayList'
import { playListHot, playListCatlist, getPlayList } from '@/api/service/songer'
export default {
  name: 'PlayList',
  data() {
    return {
      // 歌单
      songMusic: [],
      // 是否打开选项卡
      showFilter: false,
      // 热门歌单
      hotCategories: [],
      // 全部歌单
      categorieList: [],
      // 标签的值
      currentName: '全部',
      // 最热
      sortType: 'hot',
      // 返回的数据
      limit: 42,
      // 偏移
      offset: 0,
      totle: 0,
      currentPage: 0,
      // 正在加载
      loading: false,
      // 分类列表
      typeList: [
        {
          key: 0,
          value: '语种',
          icon: 'icon-xiaoyuzhong'
        },
        {
          key: 1,
          value: '风格',
          icon: 'icon-fengge'
        },
        {
          key: 2,
          value: '场景',
          icon: 'icon-changjing'
        },
        {
          key: 3,
          value: '情感',
          icon: 'icon-qinggan'
        },
        {
          key: 4,
          value: '主题',
          icon: 'icon-ziyuan5'
        }
      ]
    }
  },
  components: {
    PopularPlayList
  },
  mounted() {
    this.playListHot()
    this.playListCatlist()
    this.getPlayList()
  },
  methods: {
    // 改变页码
    handleSizeChange(val) {
      this.limit = val
      this.offset = this.limit * this.currentPage
      this.getPlayList()
    },

    handleCurrentChange(val) {
      this.currentPage = val
      this.offset = (val - 1) * this.limit
      this.getPlayList()
    },

    // 获取歌单(网友精选)
    async getPlayList() {
      this.loading = true
      let params = {
        order: this.sortType,
        cat: this.currentName,
        limit: this.limit,
        offset: this.offset
      }
      try {
        let res = await getPlayList(params)
        if (res.code === this.constants.code_status) {
          this.songMusic = res.playlists
          this.totle = res.total
          this.loading = false
        }
      } catch (error) {
        console.log(error)
        this.loading = false
      }

    },

    // 打开选项卡
    openFilter() {
      this.showFilter = !this.showFilter
    },

    // 选择最新还是最热
    chooseType(type) {
      this.sortType = type
      this.getPlayList()
    },

    // 切换标签
    chooseTag(name) {
      this.currentName = name
      this.getPlayList()
    },

    // 获取热门歌单列表
    async playListHot() {
      try {
        let res = await playListHot()
        if (res.code === this.constants.code_status) {
          this.hotCategories = res.tags
        }
      } catch (error) {
        console.log(error)
      }
    },

    // 获取全部歌单
    async playListCatlist() {
      try {
        let res = await playListCatlist()
        if (res.code === this.constants.code_status) {
          this.categorieList = this.categoryGroup(res.sub, 'category')
          console.log(' this.categorieList', this.categorieList)
        }
      } catch (error) {
        console.log(error)
      }
    },

    // 歌单排序
    categoryGroup(list, filed) {
      // 储存初始数据
      let obj = {}
      for (let i = 0; i < list.length; i++) {
        for (let item in list[i]) {
          if (item === filed) {
            obj[list[i][item]] = {
              list: obj[list[i][filed]] ? obj[list[i][filed]].list : []
            }
          }
        }
        obj[list[i][filed]].list.push(list[i])
      }
      console.log('categoryGroup', obj)
      // 存储过滤的数据
      let arr = []
      for (let item in obj) {
        let type = ""
        let category = ''
        let icon = ''
        this.typeList.map(items => {
          if (items.key === obj[item].list[0].category) {
            type = items.value
            category = items.key
            icon = items.icon
          }
        })
        arr.push({
          type,
          category,
          icon,
          list: obj[item].list
        })
      }
      console.log('arr', arr)
      return arr
    }
  }
}
</script>

<style lang='less' scoped>
// 进入
.playlist-enter {
  opacity: 0;
  transform: translate3d(0, 30px, 0);
}
// 进入之后激活过度
.playlist-enter-active {
  transition: all 0.5s;
}
.playlist-leave-to {
  opacity: 0;
  transform: translate3d(0, 30px, 0);
}
.playlist-leave-active {
  transition: all 0.5s;
}
.play-list-wrap {
  margin-top: 10px;
  .filter {
    display: flex;
    width: 100%;
    height: 40px;
    align-items: center;
    margin-bottom: 20px;
    padding-right: 16px;
    border-radius: 5px;
    .title {
      position: relative;
      width: auto;
      height: 100%;
      background: @color-theme;
      border-radius: 5px;
      color: #fff;
      padding-left: 10px;
      cursor: pointer;
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
        font-size: 1.2rem;
        color: #fff;
      }
      .filter-box {
        height: 400px;
        width: 720px;
        overflow-y: scroll;
        background: rgb(255, 255, 255, 0.8);
        border-radius: 8px;
        color: #000;
        position: absolute;
        left: 0;
        top: 50px;
        z-index: 100;
        padding: 15px 10px 0 16px;
        .item {
          margin-bottom: 20px;
          h2 {
            display: flex;
            align-items: center;
            font-size: 1rem;
            margin-bottom: 16px;
            color: #000;
            i {
              font-size: 1.2rem;
              margin-right: 5px;
              // margin-top: -1px;
              color: #000;
            }
          }
          ul {
            list-style: none;
            display: flex;
            flex-wrap: wrap;
            li {
              font-size: 0.9rem;
              color: black;
              padding: 8px 18px;
              background: #f7f7f7;
              border-radius: 16px;
              margin: 0 10px 10px 0;
              cursor: pointer;
              transform: all 0.5s;
              &:hover {
                color: #fff;
                background: @color-theme;
              }
              &.active {
                color: #fff;
                background: @color-theme;
              }
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
      }
      ul {
        margin: 0;
        list-style: none;
        li {
          margin: 0 6px;
          cursor: pointer;
          padding-right: 10px;
          background: #808080;
          border-radius: 20px;
          color: #fff;
          padding: 0 10px;
          font-size: 1rem;
          &:hover {
            color: #fff;
            background: @color-theme;
          }
          &.active {
            color: #fff;
            background: @color-theme;
          }
        }
      }
    }
    .type {
      display: flex;
      .item {
        margin-left: 20px;
        background: #686868;
        color: #ffffff;
        padding: 5px 10px;
        font-size: 0.9rem;
        border-radius: 3px;
        transition: all 0.4s;
        cursor: pointer;
        &.active {
          background: @color-theme;
          color: #fff;
          &:hover {
            color: #fff;
          }
        }
        &:hover {
          color: @color-theme;
        }
      }
    }
  }
  .el-pagination {
    margin-top: 10px;
    display: flex;
    justify-content: center;
  }
}
</style>
