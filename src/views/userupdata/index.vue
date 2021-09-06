<template>
  <div class="user-list container">
    <div class="user-content">
      <div class="user-text">
        <span>个人设置</span>
      </div>
      <div class="user-tabs flex-row">
        <el-tabs v-model="activeName" @tab-click="handleClick" type="card">
          <el-tab-pane label="基本设置" name="first"
            ><UserSetting
              :districts="districts"
              :userProfile="userProfile"
              @saveSubmit="saveSubmit"
            ></UserSetting
          ></el-tab-pane>
          <el-tab-pane label="绑定设置" name="second">配置管理</el-tab-pane>
          <el-tab-pane label="隐私设置" name="third">角色管理</el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import UserSetting from './components/UserSetting'
import { getUserInfo, userInfoUpdate } from '../../api/service/user'
import { mapActions, mapGetters, mapMutations } from 'vuex'
export default {
  name: 'UserUpdata',
  data() {
    return {
      activeName: 'first',
      userProfile: {
        // 用户昵称
        nickname: '',
        // 性别
        gender: '1',
        // 出生日期
        birthday: '',
        // 用户签名
        signature: '',
        // 省份
        province: '',
        // 城市
        city: ''
      },
      // 地区
      districts: {
        // 省份
        province: '',
        // 城市
        city: ''
      },
      // 用户id
      userId: ''
    }
  },
  components: {
    UserSetting
  },

  computed: {
    ...mapGetters(['userInfo'])
  },

  watch: {
    $route(newVal) {
      console.log(newVal)
      let id = this.$route.query.uid
      if (id) {
        this._initIaLize(id)
      }
    }
  },
  mounted() {
    let id = this.$route.query.id
    this.userId = id
    if (id) {
      this._initIaLize(id)
    }
  },
  methods: {

    // 提交表单，修改用户信息
    saveSubmit(content) {
      if (!content) {
        this.$message.error('输入点内容吧')
      }
      console.log('content', content);
      let params = {
        nickname: content.nickname,
        signature: content.signature,
        gender: content.gender,
        birthday: content.birthday,
        province: content.province,
        city: content.city
      }
      console.log('params', params);
      userInfoUpdate(params).then(res => {
        if (res.code === this.constants.code_status) {
          this.$message.success('修改成功')
          // this.getUserInfo(this.userId)
          this.setUserInfo()
        } else {
          this.$message.error('修改失败,请检查重试!!!')
        }
      })
    },

    // 获取省份
    getArea() {
      axios.get('https://restapi.amap.com/v3/config/district', {
        params: {
          key: '4d07c1959663fb732d792f9ea06d95ba',
          keywords: this.userProfile.province,
          subdistrict: 1,
          extensions: 'base'
        }
      }).then(response => {
        // 调用该接口之后成功，返回相关的值，并且将相关的值赋予，这个时候就可以获取到省份了
        if (response.data.status === '1' && response.data.info === 'OK') {
          let districts = response.data.districts[0]
          this.districts.province = districts.name
          // 获取相关的市级
          let subDistricts = response.data.districts[0].districts
          subDistricts.map(item => {
            if (item.adcode == this.userProfile.city) {
              this.districts.city = item.name
            }
          })
        }
      }).catch(error => {
        console.log(error)
      })
    },

    // 获取个人用户信息
    async getUserInfo(id) {
      try {
        let res = await getUserInfo(id)
        if (res.code === this.constants.code_status) {
          this.userProfile = res.profile
          console.log('getUserInfo', res)
          this._initIaLize()
          this.getArea()
        }
      } catch (error) {
        console.log(error)
      }
    },

    // 切换tabs
    handleClick(tab, event) {
      console.log(tab, event);
    },

    // 初始化
    _initIaLize(id) {
      this.getUserInfo(id)
      //   this.getArea()
    },
    ...mapMutations({ setLoginStatus: 'LOGIN_STATUS', setUserInfo: 'USER_INFO' }),

  }
}
</script>

<style lang='less' scoped>
.user-list {
  display: flex;
  align-items: flex-start;
  margin-top: 10px;
  border-radius: 8px;
  background: @color-dark;
  min-height: 600px;
  .user-content {
    padding: 20px 40px;
    .user-text {
      margin-bottom: 10px;
      span {
        font-size: 1.2rem;
      }
    }
  }
}
</style>
