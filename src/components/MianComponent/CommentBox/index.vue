<template>
  <div class="comment-content">
    <div class="comment-send-box">
      <el-row :gutter="8">
        <el-col :span="2">
          <div class="avatar">
            <el-image
              :src="userInfo.avatarUrl"
              fit="cover"
              :title="userInfo.nickname"
            ></el-image>
          </div>
        </el-col>
        <el-col :span="22">
          <div class="comment-input">
            <!-- 输入框 -->
            <el-input
              type="textarea"
              :autosize="{ minRows: 3, maxRows: 4 }"
              placeholder="输入你的精彩评论"
              v-model="commentContent"
            >
            </el-input>
            <div class="comment-tool">
              <!-- 表情 -->
              <el-col :span="1">
                <div class="comment-expression">
                  <emoji-picker @emoji="insert">
                    <div
                      slot="emoji-invoker"
                      slot-scope="{ events: { click: clickEvent } }"
                      @click.stop="clickEvent"
                    >
                      <i class="iconfont icon-biaoqing"></i>
                    </div>
                    <div slot="emoji-picker" slot-scope="{ emojis, insert }">
                      <div class="emoji-picker">
                        <div>
                          <div
                            v-for="(emojiGroup, category) in emojis"
                            :key="category"
                          >
                            <h5>{{ category }}</h5>
                            <div class="emojis">
                              <span
                                v-for="(emoji, emojiName) in emojiGroup"
                                :key="emojiName"
                                @click="insert(emoji)"
                                :title="emojiName"
                                >{{ emoji }}</span
                              >
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </emoji-picker>
                </div>
              </el-col>
              <el-col :span="19">
                <div class="comment-at">
                  <i class="iconfont icon-aite"></i>
                </div>
              </el-col>
              <el-col :span="2">
                <el-button
                  type="primary"
                  size="small"
                  autofocus
                  @click="commentSubmit"
                  >{{ buttonText }}</el-button
                >
              </el-col>
              <el-col :span="1">
                <el-button
                  size="small"
                  type="info"
                  autofocus
                  @click="cancelComment"
                  >取消</el-button
                >
              </el-col>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import EmojiPicker from 'vue-emoji-picker'
import { mapGetters } from 'vuex'
export default {
  name: 'CommentBox',
  data() {
    return {
      // 评论内容
      commentContent: '',
    }
  },
  components: {
    EmojiPicker
  },
  props: {
    currentCommentId: {
      type: [String, Number]
    },
    buttonText: {
      type: String,
      default: '评论'
    },
    // 是否清空评论框
    clearContent: {
      type: Boolean
    }
  },

  computed: {
    // 获取登录状态和用户信息
    ...mapGetters(['userInfo', 'loginStatus']),
  },

  watch: {
    // 观察提交评论之后输入框内容的变化
    clearContent(val) {
      if (val) {
        this.commentContent = ''
      }
    }
  },
  mounted() {

  },
  methods: {
    insert(emoji) {
      this.commentContent += emoji
    },

    // 评论提交
    commentSubmit() {
      this.$emit('commentSubmit', this.commentContent)
    },

    // 取消评论
    cancelComment() {
      this.$emit('cancelComment')
      this.commentContent = ''
    }
  }
}
</script>

<style lang='less' scoped>
.comment-content {
  width: 100%;
  .comment-send-box {
    .avatar {
      width: 50px;
      height: 50px;
    }
    .comment-input {
      margin-bottom: 10px;
    }
    .comment-tool {
      margin-top: 10px;
      .comment-expression {
        .icon-biaoqing {
          cursor: pointer;
          font-size: 1rem;
          &:hover {
            color: @color-theme;
          }
        }
        .emoji-picker {
          position: absolute;
          z-index: 1;
          border: 1px solid #ccc;
          width: 15rem;
          height: 20rem;
          overflow: scroll;
          padding: 1rem;
          box-sizing: border-box;
          border-radius: 0.5rem;
          background: @color-dark;
          box-shadow: 1px 1px 8px #c7dbe6;
          h5 {
            margin-bottom: 0;
            color: @color-dark;
            text-transform: uppercase;
            font-size: 0.8rem;
            cursor: default;
          }
          .emojis {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            &:after {
              content: '';
              flex: auto;
            }
            span {
              padding: 0.2rem;
              cursor: pointer;
              border-radius: 8px;
              &:hover {
                background: #ececec;
                cursor: pointer;
              }
            }
          }
        }
      }
      .comment-at {
        .icon-aite {
          cursor: pointer;
          font-size: 1rem;
          &:hover {
            color: @color-theme;
          }
        }
      }
    }
  }
}
</style>
