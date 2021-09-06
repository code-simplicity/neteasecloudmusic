<template>
  <!-- 基本设置 -->
  <div class="user-setting">
    <div class="user-left flex-row">
      <el-form
        ref="userform"
        :model="userInfo"
        :rules="userRules"
        label-width="60px"
        label-suffix=":"
        label-positio="left"
      >
        <el-form-item label="昵称" prop="nickname">
          <el-input
            v-model="userProfile.nickname"
            placeholder="请输入昵称"
          ></el-input> </el-form-item
        ><el-form-item label="介绍" prop="signature">
          <el-input
            v-model="userProfile.signature"
            placeholder="请输入个性介绍"
            type="textarea"
            maxlength="300"
            show-word-limit
            :autosize="{ minRows: 4, maxRows: 6 }"
          ></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="gender">
          <el-radio-group v-model="userProfile.gender">
            <el-radio :label="1">男</el-radio>
            <el-radio :label="2">女</el-radio>
            <el-radio :label="0">保密</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="生日" prop="birthday">
          <el-date-picker
            v-model="userProfile.birthday"
            type="date"
            placeholder="选择日期"
            value-format="timestamp"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="地区" prop="province">
          <VDistpicker
            :province="districts.province"
            :city="districts.city"
            hide-area
            @province="getProvince"
            @city="getCity"
          ></VDistpicker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="saveSubmit('userform')"
            >保存</el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <div class="user-right">
      <div class="avatar">
        <el-image :src="userProfile.avatarUrl" fit="cover" lazy></el-image>
      </div>
    </div>
  </div>
</template>

<script>
import VDistpicker from 'v-distpicker'
import { mapGetters } from 'vuex'
export default {
  name: 'UserSetting',
  data() {
    return {
      userRules: {
        nickname: [{
          required: true, message: '请输入活动名称', trigger: 'blur'
        }]
      }
    }
  },
  props: {
    userProfile: {
      type: Object
    },

    districts: {
      type: Object
    }
  },

  components: {
    VDistpicker
  },

  computed: {
    ...mapGetters(['userInfo', 'loginStatus']),
  },

  watch: {

  },

  mounted() {

  },
  methods: {
    // 选择之后返回值
    getProvince(val) {
      console.log('val', val)
      this.userProfile.province = val.code
      console.log(' this.userProfile.city', this.userProfile.city)
    },

    getCity(val) {
      console.log('val1', val)
      this.userProfile.city = val.code
      console.log('  this.userProfile.city', this.userProfile.city)
    },

    saveSubmit(userform) {
      this.$refs[userform].validate((valid) => {
        if (valid) {
          let userInfo = this.userProfile
          this.$emit('saveSubmit', userInfo)
        } else {
          console.log('失败了哦')
        }
      })
    }
  }
}
</script>

<style lang='less' scoped>
.user-setting {
  display: flex;
  justify-content: flex-start;
  .user-left {
    display: flex;
    .el-date-editor.el-input,
    .el-date-editor.el-input__inner {
      width: 100%;
    }
    .el-cascader {
      display: inline-block;
      position: relative;
      font-size: 14px;
      line-height: 40px;
      width: 100%;
    }
  }
  .user-right {
    display: flex;
    margin-left: 20px;
    .avatar {
      width: 100px;
      height: 100px;
    }
  }
}
</style>
