<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="16" :push="4">
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column
            v-for="item in tableColumn"
            :key="item.id"
            :prop="item.prop"
            :label="item.label"
            :width="item.width"
            :formatter="item.faformatter"
          >
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="100">
            <template slot-scope="scope">
              <el-button
                @click="handleClick(scope.row)"
                type="text"
                size="small"
                >查看</el-button
              >
              <el-button type="text" size="small">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'MyTable2',
  props: ['tableData'],
  data () {
    return {
      tableColumn: [
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
      ]
    }
  },
  components: {

  },
  mounted () {

  },
  methods: {

  }
}
</script>

<style lang="less" scoped>
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
