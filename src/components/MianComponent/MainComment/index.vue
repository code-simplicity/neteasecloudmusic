<template>
  <div class="commen-box container">
    <!-- <div class="commen-header">
      <div class="comment-header-title">
        <span class="comment-text">评论</span>
        <span>{{ commentList.length }}条评论</span>
      </div>
    </div> -->
    <div class="comment-list">
      <h3>{{ title }}</h3>
      <ul>
        <li class="item" v-for="item of commentList" :key="item.time">
          <div class="avatar">
            <el-image
              :src="item.user.avatarUrl"
              fit="cover"
              :alt="item.user.nickname"
              :title="item.user.nickname"
              @click="findUser(item.user.userId)"
            ></el-image>
          </div>
          <div class="info">
            <h2 class="flex-between">
              <span>
                {{ item.user.nickname }}
                <small>· {{ utils.formatMsgTime(item.time) }}</small>
              </span>
              <div class="tool flex-row">
                <!-- 点赞 -->
                <i
                  class="iconfont icon-dianzan_access icon-zan"
                  :class="item.liked ? 'active' : ''"
                  @click="commentLike(item.commentId, item.liked)"
                ></i>
                <span>({{ item.likedCount }})</span>
                <!-- 评论 -->
                <i
                  class="iconfont icon-huifu"
                  @click="commentHandle(item.commentId)"
                ></i>
              </div>
            </h2>
            <div class="content">
              {{ item.content }}
              <div
                class="beReqlied"
                v-for="subItem of item.beReplied"
                :key="subItem.beRepliedCommentId"
              >
                <small>@{{ subItem.user.nickname }}:</small
                >{{ subItem.content }}
              </div>
            </div>
            <div>
              <CommentBox
                @commentSubmit="commentSubmit"
                @cancelComment="cancelComment"
                :buttonText="buttonText"
                v-if="item.commentId === currentCommentId"
              ></CommentBox>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import CommentBox from '../CommentBox'
export default {
  name: 'MainComment',
  data() {
    return {
      buttonText: '回复'
    }
  },
  props: {
    // 头部标题
    title: {
      type: String
    },
    // 评论列表
    commentList: {
      tyep: Array
    },
    // 回复者的id
    currentCommentId: {
      type: [String, Number]
    }
  },
  components: {
    CommentBox,
  },
  computed: {
    ...mapGetters(['userInfo', 'loginStatu'])
  },
  mounted() {

  },
  methods: {
    // 进入用户中心
    findUser(id) {
      this.$router.push({
        name: 'personal',
        query: {
          id
        }
      })
    },

    // 评论点赞
    commentLike(id, liked) {
      this.$emit('commentLike', id, liked)
    },

    // 取消评论
    cancelComment() {
      this.$emit('cancelComment')
    },
    // 提交评论
    commentSubmit(content) {
      this.$emit('commentSubmit', content)
    },
    // 打开评论
    commentHandle(id) {
      this.$emit('commentHandle', id)
    }
  }
}
</script>

<style lang='less' scoped>
.commen-box {
  // margin-top: 70px;
  width: 100%;
  // .commen-header {
  //   display: flex;
  //   justify-content: start;
  //   align-items: center;
  //   margin-bottom: 10px;
  //   border-bottom: 3px solid @color-theme;
  //   .comment-header-title {
  //     display: flex;
  //     align-items: center;
  //     .comment-text {
  //       margin-right: 40px;
  //       font-size: 1.2rem;
  //     }
  //     span {
  //       font-size: 1rem;
  //     }
  //   }
  // }
  .comment-list {
    margin-top: 20px;
    h3 {
      margin-bottom: 12px;
      font-size: 1.2rem;
      border-bottom: 3px solid @color-theme;
    }
    ul {
      list-style: none;
      li {
        padding: 10px 0;
        width: 100%;
        display: flex;
        .avatar {
          width: 45px;
          height: 45px;
          border-radius: 50%;
          margin-right: 12px;
          flex-shrink: 0;
          cursor: pointer;
          .el-image {
            width: 100%;
            border-radius: 50%;
          }
        }
        .info {
          flex: 1;
          h2 {
            font-size: 1rem;
            margin-right: 6px;
            margin-bottom: 10px;
            small {
              color: #a5a5c1;
              font-weight: 200;
              font-size: 0.8rem;
            }
            .tool {
              i {
                font-size: 1.3rem;
                font-weight: 100;
                margin-left: 20px;
                cursor: pointer;
                transition: all 0.4s;
                &.icon-zan {
                  &.active {
                    color: @color-theme;
                  }
                }
              }
              .icon-huifu {
                &:hover {
                  color: @color-theme;
                }
              }
              span {
                font-size: 0.8rem;
                margin-top: 2px;
                color: #666;
                font-weight: 200;
                position: relative;
                &::after {
                  content: '';
                  width: 1px;
                  height: 13px;
                  background: #4a4a4a;
                  opacity: 0.7;
                  position: absolute;
                  top: 2px;
                  right: -12px;
                }
              }
            }
          }
          .content {
            width: 100%;
            font-size: 0.9rem;
            color: #4a4a4a;
            line-height: 1.6;
            padding: 8px 10px;
            background: #f5f5f5;
            margin-top: 5px;
            border-radius: 2px;
            .beReqlied {
              margin-top: 10px;
              background: #ffffff;
              padding: 8px 10px;
              border-radius: 3px;
              color: #666666;
              small {
                color: @color-theme;
              }
            }
          }
        }
      }
    }
  }
}
</style>
