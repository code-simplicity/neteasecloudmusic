<template>
  <div class="commen-box container">
    <div class="commen-header">
      <div class="comment-header-title">
        <span class="comment-list">评论</span>
        <span>{{ 117 }}条评论</span>
      </div>
    </div>
    <div class="comment-content">
      <CommentBox></CommentBox>
    </div>
  </div>
</template>

<script>
import CommentBox from '../CommentBox'
export default {
  name: 'MainComment',
  data() {
    return {

    }
  },
  components: {
    CommentBox
  },
  mounted() {

  },
  methods: {

  }
}
</script>

<style lang='less' scoped>
.commen-box {
  margin-top: 70px;
  width: 100%;
  .commen-header {
    display: flex;
    justify-content: start;
    align-items: center;
    margin-bottom: 10px;
    border-bottom: 3px solid @color-theme;
    .comment-header-title {
      display: flex;
      align-items: center;
      .comment-list {
        margin-right: 40px;
        font-size: 1.5rem;
      }
      span {
        font-size: 1rem;
      }
    }
  }
}
</style>
