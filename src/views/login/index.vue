<template>
  <div class="login-box">
    <div class="login-container">
      <Particles></Particles>
      <div class="login-section">
        <img src="../../assets/images/my-logo.png" alt="我的logo" />
      </div>
      <div class="title">登录网易云账号</div>
      <div class="login-section-content">
        <div class="input-box" v-show="mode === 'phone'">
          <div class="container" :class="{ active: inputFocus === 'phone' }">
            <el-input
              v-model="phoneNumber"
              placeholder="手机号码"
              prefix-icon="iconfont icon-shouji1"
              clearable
              @keyup.enter.native="login"
            >
              ></el-input
            >
          </div>
        </div>
        <div class="input-box" v-show="mode === 'email'">
          <div class="container" :class="{ active: inputFocus === 'email' }">
            <el-input
              v-model="email"
              type="email"
              placeholder="邮箱"
              prefix-icon="iconfont icon-youxiang"
              clearable
              @keyup.enter.native="login"
            >
              ></el-input
            >
          </div>
        </div>
        <div class="input-box" v-show="mode !== 'qrCode'">
          <div class="container" :class="{ active: inputFocus === 'password' }">
            <el-input
              v-model="password"
              type="password"
              placeholder="密码"
              prefix-icon="iconfont icon-mima"
              clearable
              show-password
              @keyup.enter.native="login"
            >
              ></el-input
            >
          </div>
        </div>
        <div v-show="mode == 'qrCode'">
          <div v-show="qrCodeImage" class="qr-code-container">
            <img :src="qrCodeImage" />
          </div>
          <div class="qr-code-info">
            {{ qrCodeInformation }}
          </div>
        </div>
      </div>
      <div v-show="mode !== 'qrCode'" class="confirm">
        <button v-show="!processing" @click="login">登录</button>
        <button v-show="processing" class="loading" disabled>
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
      <div class="other-login">
        <a v-show="mode !== 'email'" @click="mode = 'email'">邮箱登录</a>
        <span v-show="mode === 'qrCode'">|</span>
        <a v-show="mode !== 'phone'" @click="mode = 'phone'">手机登录</a>
        <span v-show="mode !== 'qrCode'">|</span>
        <a v-show="mode !== 'qrCode'" @click="mode = 'qrCode'"> 二维码登录 </a>
      </div>
    </div>
  </div>
</template>

<script>
import QRCode from 'qrcode'
import md5 from "js-md5"
import {
  loginWithPhone, loginWithEmail, getUserInfo,
  getLoginQrKey, loginQrCheck, getLoginQrImage, getUserAccount
} from '@/api/service/user'
import { mapMutations } from 'vuex'
import Particles from '@/components/Particles'

export default {
  name: 'Login',
  data() {
    return {
      processing: false,
      mode: 'qrCode',
      phoneNumber: '',
      email: '',
      password: '',
      smsCode: '',
      inputFocus: '',
      qrCodeKey: '',
      qrCodeImage: '',
      qrCodeCheckInterval: null,
      qrCodeInformation: '打开网易云音乐APP扫码登录',
    }
  },
  components: {
    Particles
  },
  created() {
    this.getLoginQrKey()

  },
  mounted() {
  },
  beforeDestroy() {
    // 销毁定时器
    clearInterval(this.qrCodeCheckInterval);
  },
  methods: {
    // 获取用户信息，登录成功之后，这个用于调用验证码的时候使用
    getUserAccount(result) {
      getUserAccount().then(res => {
        if (res.code === this.constants.code_status) {
          this.getUserInfo(res.account.id)
          window.localStorage.setItem('cookie', result.cookie)
          window.localStorage.setItem('token', res.token)
          window.localStorage.setItem('loginStatus', true)
          this.setLoginStatus(true)
          this.setUserInfo(res.account)
        }
      }).catch(error => {
        console.log(error)
      })
    },

    // 检查二维码登录状态
    loginQrCheck() {
      this.qrCodeCheckInterval = setInterval(() => {
        // 如果验证码的key为空，返回
        if (this.qrCodeKey === '') return;
        // 登录接口
        let timerstamp = new Date().getTime()
        let params = {
          key: this.qrCodeKey,
          timerstamp: timerstamp
        }
        loginQrCheck(params).then(res => {
          if (res.code === 800) {
            // 重新获取二维码
            this.getLoginQrKey()
            this.qrCodeInformation = '二维码已失效，请刷新页面重新扫码';
          } else if (res.code === 801) {
            this.qrCodeInformation = '打开网易云APP扫码哦！';
          } else if (res.code === 802) {
            this.qrCodeInformation = '扫描成功，请在手机上确认登录';
          } else if (res.code === 803) {
            // 清除定时器
            clearInterval(this.qrCodeCheckInterval);
            this.qrCodeInformation = '登录成功，正在跳转中...';
            // 携带cookie过去，验证登录
            this.getUserAccount(res)
          }
        })
      }, 6000)

    },

    // 获取验证码的key
    async getLoginQrKey() {
      let timerstamp = new Date().getTime()
      let params = {
        timerstamp: timerstamp
      }
      try {
        let res = await getLoginQrKey(params)
        if (res.code === this.constants.code_status) {
          this.qrCodeKey = res.data.unikey
          let params = {
            key: this.qrCodeKey,
            qrimg: true,
            timerstamp: timerstamp
          }
          getLoginQrImage(params).then(res => {
            if (res.code === this.constants.code_status) {
              QRCode.toDataURL(res.data.qrurl, {
                width: 192,
                margin: 0,
                color: {
                  dark: "#000000",
                  light: "#ffffff",
                },
              }).then(url => {
                this.qrCodeImage = url;
              }).catch(error => {
                console.log(error)
              })
            }
          }).catch(error => {
            console.log(error)
          })
        }
        this.loginQrCheck()
      } catch (error) {
        console.log(error)
      }
    },
    // 手机验证规则
    validatePhone() {
      if (
        this.phone === '' ||
        this.password === ''
      ) {
        this.processing = false;
        return false;
      }
      return true;
    },
    // 邮箱验证规则
    validateEmail() {
      const emailReg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (
        this.email === '' ||
        this.password === '' ||
        !emailReg.test(this.email)
      ) {
        this.$message.warning('邮箱不正确');
        return false;
      }
      return true;
    },

    // 登录(邮箱和手机)
    login() {
      if (this.mode === 'phone') {
        this.processing = this.validatePhone();
        if (!this.processing) return;
        let params = {
          phone: this.phoneNumber,
          password: 'fakePassword',
          md5_password: md5(this.password).toString(),
        }
        loginWithPhone(
          params
        ).then(res => {
          if (res.code === this.constants.code_status) {
            this.getUserInfo(res.profile.userId)
            window.localStorage.setItem('cookie', res.cookie)
            window.localStorage.setItem('token', res.token)
            window.localStorage.setItem('loginStatus', true)
            this.setLoginStatus(true)
            // 刷新登录状态
            this.setUserInfo(res.profile)
            this.processing = false;
          } else {
            this.$message.error('登录失败,请重试！')
          }
        }).catch(() => {
          this.$message.error('登录失败，请检查网络状态')
        })
      } else if (this.mode === 'email') {
        this.processing = this.validateEmail();
        if (!this.processing) return;
        let params = {
          email: this.email,
          password: 'fakePassword',
          md5_password: md5(this.password).toString(),
        }
        loginWithEmail(params).then(res => {
          if (res.code === this.constants.code_status) {
            this.getUserInfo(res.profile.userId)
            window.localStorage.setItem('cookie', res.cookie)
            window.localStorage.setItem('token', res.token)
            window.localStorage.setItem('loginStatus', true)
            this.setLoginStatus(true)
            // 刷新登录状态
            this.setUserInfo(res.profile)
            this.processing = false;
          } else {
            this.$message.error('登录失败,请重试！')
          }
        }).catch(() => {
          this.$message.error('登录失败，请检查网络状态')
        })
      }
    },

    // 获取个人登录信息
    getUserInfo(uid) {
      getUserInfo(uid).then(res => {
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
            this.$router.replace(
              {
                name: 'home'
              }
            )
          }, 1000)
        }
      }).catch(error => {
        console.log(error)
      })
    },

    // 提交状态，
    ...mapMutations({ setLoginStatus: 'LOGIN_STATUS', setUserInfo: 'USER_INFO' }),
  }
}
</script>

<style lang="less" scoped>
.login-box {
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .login-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .title {
      font-size: 24px;
      font-weight: 700;
      margin-bottom: 40px;
      color: @color-dark;
    }
    .login-section {
      margin-bottom: 16px;
      display: flex;
      align-items: center;

      img {
        height: 120px;
        border-radius: 50%;
        user-select: none;
      }
    }
    .login-section-content {
      display: flex;
      align-items: center;
      flex-direction: column;
      .input-box {
        display: flex;
        justify-content: flex-end;
        margin-bottom: 16px;
        color: @color-dark;
        .container {
          display: flex;
          align-items: center;
          height: 70px;
          border-radius: 8px;
          width: 350px;
          /deep/ .el-input__inner {
            background-color: rgb(58, 58, 77);
            border-radius: 4px;
            box-sizing: border-box;
            color: #ffffff;
            font-weight: 500;
            display: inline-block;
            font-size: 1rem;
            height: 50px;
            line-height: 50px;
            padding: 0 26px;
            width: 100%;
          }
          &.active {
            background: #1111;
            input,
            i {
              color: @color-dark;
            }
          }
        }
      }
      .qr-code-container {
        background-color: @color-dark;
        padding: 24px 24px 21px 24px;
        border-radius: 1.25rem;
        margin-bottom: 12px;
      }
      .qr-code-info {
        color: @color-dark;
        text-align: center;
      }
    }
    .confirm button {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;
      font-weight: 600;
      background-color: rgb(92, 92, 92);
      color: @color-dark;
      border-radius: 8px;
      margin-top: 24px;
      transition: 0.2s;
      padding: 8px;
      width: 100%;
      width: 300px;
      &:hover {
        transform: scale(1.06);
        background-color: rgb(40, 27, 73);
      }
      &:active {
        transform: scale(0.94);
        background-color: rgb(40, 27, 73);
      }
    }
    .other-login {
      margin-top: 24px;
      font-size: 1rem;
      color: @color-dark;
      opacity: 0.68;
      a {
        font-size: 1.1rem;
        padding: 0 8px;
        color: @color-dark;
        &:hover {
          color: @color-theme;
        }
      }
    }
  }
}
@keyframes loading {
  0% {
    opacity: 0.2;
  }
  20% {
    opacity: 1;
  }
  100% {
    opacity: 0.2;
  }
}
button.loading {
  height: 44px;
  cursor: unset;
  &:hover {
    transform: none;
  }
}
.loading span {
  width: 6px;
  height: 6px;
  background-color: @color-dark;
  border-radius: 50%;
  margin: 0 2px;
  animation: loading 1.4s infinite both;
}
.loading span:nth-child(2) {
  animation-delay: 0.2s;
}
.loading span:nth-child(3) {
  animation-delay: 0.4s;
}
</style>
