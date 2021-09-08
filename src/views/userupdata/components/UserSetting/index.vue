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
        <div class="check-avatar">
          <span class="check-text" @click="updateAvatarDialog">更换头像</span>
        </div>
        <myUpload
          field="img"
          @cropSuccess="cropSuccess"
          @crop-upload-success="cropUploadSuccess"
          @crop-upload-fail="cropUploadFail"
          v-model="showImage"
          :width="300"
          :height="300"
          imgFormat="png"
        ></myUpload>
      </div>
    </div>
  </div>
</template>

<script>
import myUpload from 'vue-image-crop-upload/upload-2.vue';
import VDistpicker from 'v-distpicker'
import { mapGetters } from 'vuex'
import { avatarUpload } from '../../../../api/service/user'
export default {
  name: 'UserSetting',
  data() {
    return {
      userRules: {
        nickname: [{
          required: true, message: '请输入活动名称', trigger: 'blur'
        }]
      },
      // 是否展示头衔上传
      showImage: false,
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
    VDistpicker,
    myUpload
  },

  computed: {
    ...mapGetters(['userInfo', 'loginStatus']),
  },

  watch: {

  },

  mounted() {
  },
  methods: {
    // 图像上传到服务器的接口
    cropSuccess(imageDataUrl) {
      // let imgFile = this.utils.base64ToFile(imgDataUrl, '.png')
      // console.log('imgFile', imgFile)
      // eslint-disable-next-line no-debugger
      debugger


      let formData = new FormData();
      // 使用FormData.append来添加键 / 值对到表单里面;
      formData.append('imgFile', imageDataUrl);
      // formData.append('imgSize', 300);
      // let params = {
      //   imgFile: imgFile,
      //   // imgSize: 300
      // }
      // let config = {
      //   headers: { 'Content-Type': 'multipart/form-data' }
      // }
      avatarUpload(imageDataUrl).then(res => {
        if (res.code === this.constants.code_status) {
          this.userProfile.avatarUrl = res.data.url
          this.$message.success('头像上传成功')
          console.log('imageDataUrl', imageDataUrl)
          console.log('resthis.userProfile.avatarUrlponse', this.userProfile.avatarUrl)
        }
      })
    },

    // 上传成功的回调
    cropUploadSuccess(response) {
      if (response.code === this.constants.code_status) {
        console.log('response', response)
        this.$message.success('头像上传成功')
        this.userProfile.avatarUrl = response.data.url
      }
    },

    // 上传失败的回调
    cropUploadFail() {
      this.$message.error('头像上传失败!')
    },

    // 修改头像
    updateAvatarDialog() {
      // 取反就可以了
      this.showImage = !this.showImage
    },

    // 选择之后返回值
    getProvince(val) {
      this.userProfile.province = val.code
    },

    getCity(val) {
      this.userProfile.city = val.code
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
      width: 120px;
      height: 120px;
      .check-avatar {
        right: 0;
        top: 98px;
        width: 120px;
        height: 22px;
        background: #8e8e8e;
        position: absolute;
        text-align: center;
        opacity: 0.8;
        span {
          color: @color-dark;
          cursor: pointer;
          &:hover {
            color: @color-theme;
          }
        }
      }
    }
  }
}
</style>
