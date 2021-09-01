<template>
  <kinesis-container>
    <div class="loginBox">
      <kinesis-element :strength="20" type="depth">
        <div class="loginContent">
          <el-form
            :model="loginForm"
            :rules="rules"
            ref="loginForm"
            label-width="100px"
            label-suffix=":"
          >
            <el-row :gutter="6">
              <el-col :span="22">
                <el-form-item label="用户名" prop="phone">
                  <el-input
                    type="text"
                    v-model="loginForm.phone"
                    placeholder="请输入网易云音乐手机号"
                    autocomplete="off"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="6">
              <el-col :span="22">
                <el-form-item label="密码" prop="password">
                  <el-input
                    type="password"
                    v-model="loginForm.password"
                    placeholder="请输入密码"
                    :show-password="true"
                    @keyup.enter.native="submitForm('loginForm')"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item>
              <el-row :gutter="10">
                <el-col :span="12">
                  <el-button
                    type="primary"
                    :loading="loading"
                    @click="submitForm('loginForm')"
                    >登录</el-button
                  >
                </el-col>
                <el-col :span="12">
                  <el-button @click="resetForm('loginForm')">重置</el-button>
                </el-col>
              </el-row>
            </el-form-item>
          </el-form>
        </div>
      </kinesis-element>
    </div>
  </kinesis-container>
</template>

<script>
import { KinesisContainer, KinesisElement } from 'vue-kinesis'
import { login, getUserInfo } from '../../api/service/user'
import { mapMutations } from 'vuex'
export default {
  name: 'login',
  data() {
    return {
      loginForm: {
        phone: '',
        password: ''
      },
      rules: {
        phone: [{ required: true, message: '手机号呢!', trigger: 'blur' }],
        password: [{ required: true, message: '密码呢！', trigger: 'blur' }]
      },
      loading: false,
      parallax: 'depth'
    }
  },
  components: {
    KinesisContainer,
    KinesisElement
  },
  mounted() {

  },
  methods: {
    // 登录操作
    submitForm(formName) {
      this.loading = false
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.loading = true
          // 收集表单数据
          const { phone, password } = this.loginForm
          this.loginAsync(phone, password)
        }
      })
    },

    // 调用登录接口
    loginAsync(phone, password) {
      this.loading = false
      login(phone, password).then(res => {
        console.log(res)
        if (res.code === 200) {
          this.getUserInfo(res.profile.userId)
          window.localStorage.setItem('cookie', res.cookie)
          window.localStorage.setItem('token', res.token)
          window.localStorage.setItem('loginStatus', true)
          this.setLoginStatus(true)
          console.log('获取的登录数据', res)
        } else {
          this.$message.error('登录失败,请重试！')
        }
      }).catch(() => {
        this.$message.error('登录失败，请检查网络状态')
      })
    },

    // 获取个人登录信息
    async getUserInfo(uid) {
      try {
        let res = await getUserInfo(uid)
        if (res.code === 200) {
          let userInfo = res.profile
          userInfo.level = res.level
          userInfo.listenSongs = res.listenSongs
          userInfo.createTime = res.createTime
          userInfo.createDays = res.createDays
          window.localStorage.setItem('userInfo', JSON.stringify(userInfo))
          this.setUserInfo(res.profile)
          this.$message({
            message: '登录成功了',
            type: 'success'
          })
          setTimeout(() => {
            this.loading = false
            this.$router.replace(
              {
                name: 'home'
              }
            )
          }, 1000)
        }
      } catch (error) {
        console.log(error.message)
      }
    },

    // 提交状态，
    ...mapMutations({ setLoginStatus: 'LOGIN_STATUS', setUserInfo: 'USER_INFO' }),

    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style lang="less" scoped>
.loginBox {
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  background: url(../../assets/images/nice-back.png) no-repeat;
  background-size: cover;
  .loginContent {
    width: 400px;
    height: 500px;
    position: relative;
    overflow: hidden;
    max-width: 400px;
    border-radius: 16px;
    box-shadow: 10px 10px 10px 10px rgba(0, 0, 3, 0.3);
    background-image: url(../../assets/images/login-form-back.png);
    background-repeat: no-repeat;
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
    // .loginButton {
    //   display: flex;
    //   justify-content: center;
    //   align-items: center;
    //   margin-bottom: 10px;
    //   border-radius: 8px;
    // }
    // .resetButton {
    //   display: flex;
    //   justify-content: center;
    //   align-items: center;
    //   border-radius: 8px;
    // }
  }
}
/deep/.el-form-item__label {
  color: #fff;
  font-size: 16px;
}
</style>
