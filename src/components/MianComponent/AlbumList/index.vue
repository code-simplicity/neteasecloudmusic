<template>
  <div class="album-box">
    <ul class="album-list flex-row">
      <li v-for="item of albums" :key="item.id" @click="toDetail(item.id)">
        <div class="wrapper">
          <div class="cover">
            <div class="image">
              <el-image
                :key="item.picUrl"
                :src="item.picUrl"
                :title="item.name"
                fit="cover"
                lazy
              >
                <div
                  slot="placeholder"
                  class="image-slot flex-center flex-column"
                >
                  <i class="iconfont"></i>
                </div>
                <div slot="error" class="image-slot flex-center">
                  <i class="el-icon-picture-outline"></i>
                </div>
              </el-image>
            </div>
            <div class="count">
              <i class="arrow"></i>
              <span>{{ item.subType || item.type }}</span>
            </div>
            <div class="action">
              <button class="play flex-center" title="播放">
                <i class="iconfont icon-bofang1"></i>
              </button>
            </div>
          </div>
        </div>
        <div class="info">
          <div class="name ellipsis">{{ item.name }}</div>
          <div class="author">{{ item.artist.name }}</div>
          <div class="time author">
            {{ utils.dateFormat(item.publishTime, 'YYYY-MM-DD') }}
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'AlbumList',
  data() {
    return {

    }
  },
  props: {
    albums: {
      type: Array
    },
    loadStatus: {
      type: Boolean
    },
    loading: {
      type: Boolean
    }
  },
  components: {

  },
  mounted() {

  },
  methods: {
    toDetail(id) {
      this.$router.push({
        name: 'album',
        query: {
          id
        }
      })
    }
  }
}
</script>

<style lang='less' scoped>
.album-box {
  padding: 15px 0;
  .album-list {
    flex-wrap: wrap;
    li {
      padding: 0 16px 30px 16px;
      flex: 0 0 20%;
      max-width: 20%;
      cursor: pointer;
      .wrapper {
        position: relative;
        padding-right: 10px;
        overflow: hidden;
        .cover {
          position: relative;
          z-index: 2;
          padding-top: 100%;
          .image {
            position: absolute;
            top: 0;
            left: 0;
            overflow: hidden;
            width: 100%;
            height: 100%;
            border-radius: 8px;
            img {
              position: absolute;
              top: 50%;
              left: 50%;
              -webkit-transform: translate(-50%, -50%);
              -ms-transform: translate(-50%, -50%);
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
            background: url('../../../assets/images/album-top.png') no-repeat 0;
            background-size: cover;
            color: @color-dark;
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
              content: '';
              position: absolute;
              right: -14px;
              top: 0;
              width: 14px;
              height: 24px;
              background: url('../../../assets/images/album-top.png') no-repeat
                100%;
              background-size: cover;
            }
          }
          .action {
            display: none;
            position: absolute;
            top: 50%;
            left: 50%;
            -webkit-transform: translate(-50%, -50%);
            -ms-transform: translate(-50%, -50%);
            transform: translate(-50%, -50%);
            .play {
              width: 60px;
              height: 60px;
              padding: 0;
              border: none;
              border-radius: 50%;
              color: @color-dark;
              cursor: pointer;
              background-color: @color-dark;
              i {
                font-size: 3.4rem;
                color: @color-theme;
              }
            }
          }
        }
        &:hover {
          .action {
            display: flex;
          }
        }
        &::after {
          content: '';
          position: absolute;
          z-index: 1;
          right: 3px;
          top: 50%;
          -webkit-transform: translateY(-50%);
          -ms-transform: translateY(-50%);
          transform: translateY(-50%);
          width: 100%;
          padding-top: 100%;
          border-radius: 50%;
          transition: all 0.4s;
        }
        &:hover {
          &::after {
            right: 0px;
          }
        }
      }
      .info {
        margin-top: 15px;
        .name {
          font-weight: 700;
          line-height: 18px;
          font-size: 1rem;
          color: @color-dark;
        }
        .author {
          margin-top: 5px;
          font-size: 0.8rem;
          color: @color-dark;
        }
      }
    }
  }
}
</style>
