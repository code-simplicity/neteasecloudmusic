<template>
  <div class="singer-box container">
    <div class="filter-tag">
      <ul class="tag-lang">
        <li
          v-for="item of areaArr"
          :key="item.value"
          :class="area === item.value ? 'active' : ''"
          @click="chooseType('area', item.value)"
        >
          {{ item.label }}
        </li>
      </ul>
      <ul class="tag-lang tag-type">
        <li
          v-for="item of typeArr"
          :key="item.value"
          :class="type === item.value ? 'active' : ''"
          @click="chooseType('type', item.value)"
        >
          {{ item.label }}
        </li>
      </ul>
      <ul class="tag-round">
        <li
          v-for="item of initialArr"
          :key="item.value"
          :class="initial === item.value ? 'active' : ''"
          @click="chooseType('initial', item.value)"
        >
          {{ item.label }}
        </li>
      </ul>
    </div>
    <LoadMore @scroll-state="load">
      <ul class="singer-list">
        <SongerItem :songItem="singers"></SongerItem>
      </ul>
    </LoadMore>
    <div v-if="loading" class="load-bottom">
      <Loading></Loading>
    </div>
  </div>
</template>

<script>
import LoadMore from '@/components/MianComponent/LoadMore'
import SongerItem from '@/components/MianComponent/SongerItem'
import Loading from '@/components/Loading'
import { getArtistList } from '@/api/service/api'
export default {
  name: 'Singer',
  data() {
    return {
      // 语言
      area: -1,
      // 语言的数组
      areaArr: [
        {
          value: -1,
          label: '全部'
        },
        {
          value: 7,
          label: '华语'
        },
        {
          value: 96,
          label: '欧美'
        },
        {
          value: 8,
          label: '日本'
        },
        {
          value: 16,
          label: '韩国'
        },
        {
          value: 0,
          label: '其他'
        },
      ],
      // 类型
      type: -1,
      typeArr: [
        {
          value: -1,
          label: '全部'
        },
        {
          value: 1,
          label: '男歌手'
        },
        {
          value: 2,
          label: '女歌手'
        },
        {
          value: 3,
          label: '乐队'
        }
      ],
      // 字母A-Z
      // 热门
      initial: -1,
      // 字母表
      initialArr: [],
      // 请求参数
      params: {
        // 返回数量
        limit: 35,
        // 偏移量，用于分页
        offset: 0,
        // 分类
        type: -1,
        // 语种
        area: -1,
        // 字母A_Z
        initial: -1
      },
      // 歌手列表
      singers: [],
      // 是否显示加载动画
      loading: false,
      // 是否还有数据
      loadStatus: true
    }
  },
  components: {
    LoadMore,
    SongerItem,
    Loading
  },
  mounted() {
    this.getArtistList()
    this.getInitial()
  },
  methods: {
    // 记载更多
    load() {
      if (this.loadStatus) {
        setTimeout(() => {
          this.getArtistList()
        }, 1000)
      }
    },

    // 生成大写字母
    getInitial() {
      let initial = []
      // 生成26个大写字母
      for (let i = 97; i < 123; i++) {
        initial.push({
          // 字母a的Unicode值为97，大写的与小写的相差32，所以A就是i-32
          value: String.fromCharCode(i),
          label: String.fromCharCode(i - 32)
        })
      }
      // 向数组头部添加一个元素
      initial.unshift({
        value: -1,
        label: '热门'
      })
      // 往后添加一个数组元素
      initial.push({
        value: 0,
        label: '其他'
      })
      this.initialArr = initial
    },

    // 选择类型
    chooseType(type, val) {
      if (type === 'area') {
        this.area = val
        this.params.area = val
      } else if (type === 'type') {
        this.type = val
        this.params.type = val
      } else if (type === 'initial') {
        this.initial = val
        this.params.initial = val
      }
      this.params.offset = 0
      this.loadStatus = true
      this.singers = []
      this.getArtistList()
    },

    // 获取歌手列表
    async getArtistList() {
      try {
        this.loadStatus = false
        let res = await getArtistList(this.params)
        if (res.code === this.constants.code_status) {
          // 歌手连接起来
          this.singers = this.singers.concat(res.artists)
          if (res.more) {
            this.loading = true
            this.loadStatus = true
            // 页数添加
            // 页数添加
            this.params.offset += 32
          } else {
            this.loading = false
          }
        }
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style lang='less' scoped>
.singer-box {
  margin-top: 10px;
  border-radius: 8px;
  opacity: 0.9;
  li {
    list-style: none;
    &:hover {
      color: @color-theme;
      transition: all 0.4s;
    }
  }
  .filter-tag {
    margin-bottom: 20px;
    .tag-lang {
      display: flex;
      padding: 16px 0 0 10px;
      li {
        width: 62px;
        height: 30px;
        line-height: 30px;
        font-size: 0.9rem;
        text-align: center;
        border-radius: 14px;
        cursor: pointer;
        margin-right: 6px;
        list-style: none;
        color: @color-dark;
        font-weight: 500;
        &.active {
          background: @color-theme;
          font-weight: 700;
          color: #ffffff;
        }
      }
    }
    .tag-type {
      li {
        width: auto;
        padding: 0 16px;
      }
    }
    .tag-round {
      display: flex;
      flex-wrap: wrap;
      margin-top: 20px;
      padding: 0 12px;
      li {
        width: 34px;
        height: 28px;
        margin-right: 12px;
        text-align: center;
        line-height: 29px;
        border-radius: 50%;
        font-size: 1rem;
        color: @color-dark;
        cursor: pointer;
        &:first-child,
        &.last-child {
          width: 56px;
          border-radius: 14px;
        }
        &.active {
          background: @color-theme;
          font-weight: 700;
          color: #ffffff;
        }
        &:hover {
          color: @color-theme;
          transition: all 0.4s;
        }
      }
    }
  }
}
</style>
