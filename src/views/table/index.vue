<template>
  <div id="table">
    <el-row :gutter="20">
      <el-col :span="24" :push="12">
        <el-radio-group
          v-model="tabPosition"
          style="margin-bottom: 30px"
          @change="checkTab(tabPosition)"
        >
          <el-radio-button label="first">表格1</el-radio-button>
          <el-radio-button label="secode">表格2</el-radio-button>
        </el-radio-group>
        <!-- <el-button value="MyTeble1" type="primary" @click="checkTab(1)"
          >表格1</el-button
        >
        <el-button value="MyTable2" type="danger" @click="checkTab(2)"
          >表格2</el-button
        > -->
      </el-col>
    </el-row>
    <el-row :gutter="20" type="flex" :justify="space-between">
      <el-col :span="4" :push="4">
        <el-input v-model="input" placeholder="请输入内容"></el-input>
      </el-col>
      <el-col :span="4" :push="4">
         <el-input v-model="input" placeholder="请输入内容"></el-input>
      </el-col>
      <el-col :span="4" :push="4">
        <el-button type="primary">查询</el-button>
        <el-button >重置</el-button>
      </el-col>
    </el-row>
    <div>
      <!-- <keep-alive>
        <component :is="currentTabComponent" class="tab"></component>
      </keep-alive> -->
      <my-teble-1 v-show="show" :tableData="tableData1"></my-teble-1>
      <my-table-2 v-show="show1" :tableData="tableData2"></my-table-2>
      <div>
        <el-row :gutter="10">
          <el-col :span="16" :push="4">
            <UserPagiNation
              class="user-pagination"
              :total="total"
              :pageSize="listQuery.queryPage.pageSize"
              :pagenum="listQuery.queryPage.pageNum"
              @paginationChange="paginationChange"
            ></UserPagiNation>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import MyTeble1 from '@/views/table/components/MyTeble1'
import MyTable2 from '@/views/table/components/MyTable2'
import UserPagiNation from '@/views/table/components/pagination'
export default {
  name: 'Table',
  data () {
    return {
      tableData: [],
      tableColumn: [],
      tableData1: [{
        date: '2016-05-02',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      },
      {
        date: '2016-05-04',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1517 弄',
        zip: 200333
      },
      {
        date: '2016-05-01',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1519 弄',
        zip: 200333
      },
      {
        date: '2016-05-01',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1519 弄',
        zip: 200333
      },
      {
        date: '2016-05-03',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1516 弄',
        zip: 200333
      }],
      tableData2: [{
        date: '2016-05-02',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-04',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1517 弄',
        zip: 200333
      }, {
        date: '2016-05-01',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1519 弄',
        zip: 200333
      }, {
        date: '2016-05-03',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1516 弄',
        zip: 200333
      }],
      tableColumn1: [
        {
          prop: 'date',
          label: '日期',
          width: '150',
          key: 'date',
          formatter: ''
        },
        {
          prop: 'name',
          label: '姓名',
          width: '150',
          key: 'name',
          formatter: ''
        },
        {
          prop: 'province',
          label: '省份',
          width: '150',
          key: 'province',
          formatter: ''
        },
        {
          prop: 'city',
          label: '市区',
          width: '150',
          key: 'city',
          formatter: ''
        },
        {
          prop: 'address',
          label: '地址',
          width: '150',
          key: 'address',
          formatter: ''
        },
        {
          prop: 'zip',
          label: '邮编',
          width: '150',
          key: 'zip',
          formatter: ''
        }
      ],
      currentTabComponent: 'MyTeble1',
      show: true,
      show1: false,
      tabPosition: 'first',
      total: 0,
      // 列表总数
      listQuery: {
        // 获取列表传参集合
        queryPage: {
          pageNum: 1, // 当前页
          pageSize: 10 // 每页显示条数
        }
      }

    }
  },
  components: {
    MyTeble1,
    MyTable2,
    UserPagiNation
  },
  mounted () {

  },
  computed: {

  },
  methods: {
    checkTab (index) {
      if (index === 'first') {
        this.show = true
        this.show1 = false
        // this.currentTabComponent = 'MyTeble1'
      } else if (index === 'secode') {
        this.show = false
        this.show1 = true
        // this.currentTabComponent = 'MyTable2'
      }
    }

  }
}
</script>

<style lang="less" scoped>
#table {
  background-color: rgb(223, 238, 233);
}
.el-row {
  margin-bottom: 60px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>
