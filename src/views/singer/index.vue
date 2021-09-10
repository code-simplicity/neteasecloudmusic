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
          v-for="item of initials"
          :key="item.value"
          :class="initial === item.value ? 'active' : ''"
          @click="chooseType('initial', item.value)"
        >
          {{ item.label }}
        </li>
      </ul>
    </div>
    <LoadMore @scroll-state="load">
      <ul class="singer-list"></ul>
    </LoadMore>
  </div>
</template>

<script>
import LoadMore from '@/components/MianComponent/LoadMore'
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
      initials: [],
      // 请求参数
      params: {
        // 返回数量
        limit: 40,
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
    LoadMore
  },
  mounted() {
    this.getArtistList()
  },
  methods: {
    // 记载更多
    load() {

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
        this.loadStatus = true
        let res = await getArtistList(this.params)
        if (res.code === this.constants.code_statu) {
          // 歌手连接起来
          this.singers = this.singers.concat(res.artists)
          if (res.more) {
            this.loading = true
            this.loadStatus = true
            // 页数添加
            // 页数添加
            this.params.offset += 30
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
  background: #fff;
  border-radius: 8px;
  opacity: 0.8;
  li {
    list-style: none;
    &:hover {
      color: @color-theme;
      transition: all 0.4s;
    }
  }
  .filter-tag {
    .tag-lang {
      display: flex;
      padding-top: 16px;
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
        background: rgb(168, 168, 168);
        font-weight: 400;
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
        padding: 0 15px;
      }
    }
    .tag-round {
      display: flex;
      flex-wrap: wrap;
      margin-top: 10px;
      li {
        width: 28px;
        height: 28px;
        margin-right: 12px;
        text-align: center;
        line-height: 29px;
        border-radius: 50%;
        font-size: 13px;
        color: #333333;
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
  .singer-list {
    display: flex;
    flex-wrap: wrap;
    margin-top: 30px;
    margin: 30px -15px 0;
    list-style: none;
  }
}
</style>
