<template>
  <div class="r-playlist">
    <div
      class="r-playlist-item"
      v-for="item in songMusic"
      :key="item.id"
      :class="numClass"
      @click="toDetail(item)"
    >
      <div class="wrapper">
        <div class="cover">
          <div class="image">
            <el-image :src="item.picUrl" lazy>
              <div
                slot="placeholder"
                class="image-slot flex-center flex-column"
              >
                <i class="iconfont niceicon-3"></i>
                <p>加载中<span class="dot">...</span></p>
              </div>
              <div slot="error" class="image-slot flex-center">
                <i class="el-icon-picture-outline"></i>
              </div>
            </el-image>
          </div>
          <div class="count">
            <i class="arrow"></i>
            <span>{{ utils.tranNumber(item.playCount, 0) }}</span>
          </div>
        </div>
      </div>
      <div class="info">
        <h2 class="name ellipsis-two">
          {{ item.name }}
        </h2>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    name: 'PopularPlayList',
    data() {
      return {

      }
    },
    props: {
      songMusic: {
        type: Array
      }
    },
    components: {

    },
    // 计算属性获取vuex状态
    computed: {
      numClass() {
          return this.num == 2 ? 'two' : 'eight'
      }
    },
    mounted() {

    },
    methods: {

    }
}
</script>

<style lang="less" scoped>
.r-playlist {
  display: flex;
  flex-wrap: wrap;
  .r-playlist-item {
    flex: 0 0 25%;
    max-width: 25%;
    margin-bottom: 20px;
    height: 100%;
    padding: 0 15px 30px 30px;
    cursor: pointer;
    &.two {
      flex: 0 0 50%;
      max-width: 50%;
    }
    .wrapper {
      width: 100%;
      height: 100%;
      justify-content: start;
      padding-right: 2%;
      border-radius: 5px;
      position: relative;
      &:before,
      &:after {
        content: "";
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.2);
        position: absolute;
        top: 0;
        transition: all 0.4s;
      }
      &:before {
        right: 6px;
        transform: scale(0.85);
        transform-origin: 100% 50%;
        z-index: 2;
        border-radius: 2px;
        opacity: 0.9;
      }
      &:after {
        right: 1px;
        transform: scale(0.73);
        transform-origin: 100% 50%;
        z-index: 1;
        border-radius: 2px;
        opacity: 0.5;
      }
      .cover {
        position: relative;
        z-index: 2;
        padding-top: 100%;
        border-radius: 2px;
        background-color: #d9d9d9;
        .image {
          position: absolute;
          top: 0;
          left: 0;
          overflow: hidden;
          width: 100%;
          height: 100%;
          border-radius: 4px;
          &:after {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border-radius: 2px;
            -webkit-box-shadow: 1px 1px 0 rgba(0, 0, 0, 0.05) inset,
              -1px -1px 0 rgba(0, 0, 0, 0.05) inset;
            box-shadow: inset 1px 1px 0 rgba(0, 0, 0, 0.05),
              inset -1px -1px 0 rgba(0, 0, 0, 0.05);
          }
          img {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 100%;
          }
        }
        .count {
          position: absolute;
          right: 16px;
          top: 1px;
          height: 24px;
          padding-left: 9px;
          background: url(https://img.alicdn.com/tfs/TB1xEGRub9YBuNjy0FgXXcxcXXa-268-48.png)
            no-repeat 0;
          background-size: cover;
          color: #fff;
          font-size: 12px;
          font-weight: 700;
          line-height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          .arrow {
            display: block;
            width: 0;
            height: 0;
            border-style: solid;
            border-width: 4px 0 4px 6px;
            border-color: transparent transparent transparent #ffffff;
            margin-right: 5px;
          }
          &:after {
            content: "";
            position: absolute;
            right: -14px;
            top: 0;
            width: 14px;
            height: 24px;
            background: url(https://img.alicdn.com/tfs/TB1xEGRub9YBuNjy0FgXXcxcXXa-268-48.png)
              no-repeat 100%;
            background-size: cover;
          }
        }
      }
    }
    .info {
      margin-top: 15px;
      .name {
        font-size: 14px;
      }
    }
  }
}
</style>
