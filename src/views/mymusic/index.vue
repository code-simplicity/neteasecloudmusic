<template>
  <div class="my-music container">
    <div class="left">
      <div class="my-menu">
        <div class="my-focus-songer" @click="chooseType('focus')">
          <h2 :class="mode === 'focus' ? 'active' : ''">关注的歌手</h2>
        </div>
        <div class="my-focus-songer" @click="chooseType('create')">
          <h2 :class="mode === 'create' ? 'active' : ''">创建的歌单</h2>
        </div>
        <div class="my-focus-songer" @click="chooseType('collect')">
          <h2 :class="mode === 'collect' ? 'active' : ''">收藏的歌单</h2>
        </div>
      </div>
    </div>
    <div class="right">
      <div class="focus-songer">
        <SongerItem :songItem="singers" v-if="mode === 'focus'"></SongerItem>
        <PopularPlayList
          :songMusic="myList"
          :num="num"
          v-if="mode === 'create'"
        ></PopularPlayList
        ><PopularPlayList
          :songMusic="collectList"
          :num="num"
          v-if="mode === 'collect'"
        ></PopularPlayList>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import SongerItem from '@/components/MianComponent/SongerItem'
import PopularPlayList from '@/components/Home/PopularPlayList'
import { getUserFollows, getUserPlaylist } from '@/api/service/user'
export default {
  name: 'MyMusic',
  data() {
    return {
      // 切换模式
      mode: 'focus',
      // 关注歌手的列表
      singers: [],
      // 我创建的歌单
      myList: [],
      // 每行展示多少个
      num: 4,
      // 我收藏的歌单
      collectList: []
    }
  },
  components: {
    SongerItem,
    PopularPlayList
  },
  computed: {
    ...mapGetters(['userInfo'])
  },

  mounted() {
    let id = this.userInfo.userId
    this.userId = id
    if (id) {
      this._initIaLize(id)
    }
  },
  methods: {
    // 我创建的歌单
    async getUserPlaylist(id) {
      try {
        let res = await getUserPlaylist(id)
        if (res.code === this.constants.code_status) {
          let list = res.playlist
          // 我创建的
          let myList = []
          // 我收藏的
          let collectList = []
          list.map(item => {
            // 判断是我创建的还是收藏别人的歌单
            if (item.userId === id) {
              myList.push(item)
            } else {
              collectList.push(item)
            }
          })
          this.myList = myList
          this.collectList = collectList
        }
      } catch (error) {
        console.log(error)
      }
    },
    // 获取关注的歌手
    async getUserFollows(id) {
      try {
        let res = await getUserFollows(id)
        if (res.code === this.constants.code_status) {
          this.singers = res.follow
        }
      } catch (error) {
        console.log(error)
      }
    },

    // 切换选中的值
    chooseType(type) {
      if (type === 'focus') {
        this.mode = 'focus'
      } else if (type === 'create') {
        this.mode = 'create'
      } else if (type === 'collect') {
        this.mode = 'collect'
      }
    },
    // 初始化函数
    _initIaLize(id) {
      this.getUserFollows(id)
      this.getUserPlaylist(id)
    }
  }
}
</script>

<style lang="less" scoped>
.my-music {
  display: flex;
  align-items: flex-start;
  margin-top: 16px;
  border-radius: 8px;
  .left {
    flex: 1;
    border-radius: 8px;
    margin-right: 10px;
    // overflow: hidden;
    // overflow-y: scroll;
    .my-menu {
      text-align: center;
      padding: 10px 10px;
      position: fixed;
      .my-focus-songer {
        color: @color-dark;
        margin-bottom: 10px;
        h2 {
          font-size: 1.2rem;
          cursor: pointer;
          color: @color-dark;
          margin: 0 auto;
          width: 120px;
          border-radius: 8px;
          &:hover {
            color: @color-theme;
          }
          &.active {
            color: @color-dark;
            background: @color-theme;
          }
        }
      }
    }
  }
  .right {
    padding: 20px;
    width: 86%;
    flex-shrink: 0;
    border-radius: 8px;
  }
}
</style>
