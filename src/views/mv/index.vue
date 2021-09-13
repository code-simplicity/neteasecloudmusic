<template>
  <div class="mv-box container">
    <div class="filter-tag">
      <ul class="tag-lang">
        <li
          v-for="item of areaList"
          :key="item.value"
          :class="area === item.value ? 'active' : ''"
          @click="chooseType('area', item.value)"
        >
          {{ item.label }}
        </li>
      </ul>
      <ul class="tag-lang tag-type">
        <li
          v-for="item of typeList"
          :key="item.value"
          :class="type === item.value ? 'active' : ''"
          @click="chooseType('type', item.value)"
        >
          {{ item.label }}
        </li>
      </ul>
      <ul class="tag-lang">
        <li
          v-for="item of orderList"
          :key="item.value"
          :class="order === item.value ? 'active' : ''"
          @click="chooseType('order', item.value)"
        >
          {{ item.label }}
        </li>
      </ul>
    </div>
    <div v-loading="loading">
      <MVList :mvs="mvs" type="mv"></MVList>
    </div>
    <div class="el-pagination">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        background
        :page-size="limit"
        layout=" prev, pager, next"
        :total="5000"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { getMvAll } from '@/api/service/api'
import { createVideo } from '@/model/video'
import MVList from '@/components/MianComponent/MVList'
export default {
  name: 'MV',
  data() {
    return {
      // 语种
      area: '全部',
      // 语种数组
      areaList: [
        {
          value: '全部',
          label: '全部'
        },
        {
          value: '内地',
          label: '内地'
        },
        {
          value: '港台',
          label: '港台'
        },
        {
          value: '欧美',
          label: '欧美'
        },
        {
          value: '日本',
          label: '日本'
        },
        {
          value: '韩国',
          label: '韩国'
        }
      ],
      // 分类
      type: '全部',
      typeList: [
        {
          value: '全部',
          label: '全部'
        },
        {
          value: '官方版',
          label: '官方版'
        },
        {
          value: '原生',
          label: '原生'
        },
        {
          value: '现场版',
          label: '现场版'
        },
        {
          value: '网易出品',
          label: '网易出品'
        }
      ],
      // 排序
      order: '上升最快',
      orderList: [
        {
          value: '上升最快',
          label: '上升'
        },
        {
          value: '最热',
          label: '最热'
        },
        {
          value: '最新',
          label: '最新'
        }
      ],
      // 请求参数
      params: {
        // 语种
        area: '全部',
        // 分类
        type: '全部',
        // 排序
        order: '上升最快',
        // 返回数量
        limit: 25,
        // 偏移数量
        offset: 0,
      },
      // mv列表
      mvs: [],
      // 视频总数
      totle: 0,
      currentPage: 1,
      limit: 20,
      loading: false
    }
  },
  components: {
    MVList
  },
  mounted() {
    this.getMvAll()
  },
  methods: {

    // 每页显示的mv
    handleSizeChange(val) {
      this.limit = val
      this.params.offset = this.limit * this.currentPage
      console.log('this.params.offset', this.params.offset)
      console.log('val', val)

      this.getMvAll()
    },

    // 改变当前页码
    handleCurrentChange(val) {
      this.currentPage = val
      this.params.offset = val * this.limit
      console.log('this.params.offset', this.params.offset)
      console.log('currentPage', this.currentPage)
      this.getMvAll()
    },


    // 获取mv
    async getMvAll() {
      this.loading = true
      try {
        let res = await getMvAll(this.params)
        if (res.code === this.constants.code_status) {
          console.log(res)
          this.mvs = this._normalizeVideos(res.data)
          console.log('this.mvs', this.mvs)
          this.loading = false
        }
      } catch (error) {
        console.log(error)
      }
    },

    // 处理视频
    _normalizeVideos(list) {
      let res = []
      list.map(item => {
        res.push(
          createVideo({
            id: item.id,
            nickName: item.artistName,
            name: item.name,
            playCount: item.playCount,
            duration: item.duration,
            image: item.cover
          })
        )
      })
      return res
    },

    // 选择类型
    chooseType(type, val) {
      if (type === 'area') {
        this.area = val
        this.params.area = val
      } else if (type === 'type') {
        this.type = val
        this.params.type = val
      } else if (type === 'order') {
        this.order = val
        this.params.order = val
      }
      this.getMvAll()
    }
  }
}
</script>

<style lang='less' scoped>
.mv-box {
  margin-top: 10px;
  background: #fff;
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
        font-weight: 500;
        color: @color-blank;
        &.active {
          background: @color-theme;
          font-weight: 600;
          color: #ffffff;
        }
        &:hover {
          font-size: 1.1rem;
        }
      }
    }
    .tag-type {
      li {
        width: auto;
        padding: 0 16px;
      }
    }
  }
  .el-pagination {
    // margin-top: 10px;
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
  }
}
</style>
