<template>
  <div class="play-list-detail container">
    <!-- 顶部-->
    <div class="left">
      <div class="top">
        <div class="avatar">
          <el-image
            class="el-image"
            :src="songDetail.coverImgUrl"
            fit="cover"
          ></el-image>
        </div>
        <div class="info">
          <div class="title flex-between">
            <span>{{ songDetail.name }}</span>
          </div>
          <div class="user flex-row">
            <div class="avatar" @click="findUser(creator.userId)">
              <el-image :src="creator.avatarUrl" fit="cover"></el-image>
            </div>
            <span class="username" @click="findUser(creator.userId)">{{
              creator.nickname
            }}</span>
            <span class="createTime" v-if="songDetail.createTime">
              {{
                utils.dateFormat(songDetail.createTime, 'YYYY-MM-DD')
              }}创建</span
            >
          </div>
          <!-- <div class="user-button">
            <el-button type="primary" size="small">
              <i class="iconfont icon-bofang1"></i>
              播放
            </el-button>
          </div> -->
          <div
            class="tag flex-row"
            v-if="songDetail.tags && songDetail.tags.length > 0"
          >
            标签：<a
              class=""
              v-for="item of songDetail.tags"
              :key="item"
              @click="tagLink(item)"
              >{{ item }}</a
            >
          </div>
          <div class="description">
            <p>介绍:</p>
            <p class="ellipsis-two" v-html="songDetail.description"></p>
            <span
              class="flex-row"
              v-if="textLength(songDetail.description) > 40"
              @click="openDes(songDetail.name, songDetail.description)"
            >
              展示
              <i class="iconfont icon-zhankai"> </i>
            </span>
          </div>
        </div>
      </div>
      <!-- 中间内容 -->
      <div class="content">
        <div class="content-song-detail">
          <SongDetailsList
            :songListShow="songListShow"
            :songs="songs"
            :isPerson="ordered ? true : false"
            :subscribed="songDetail.subscribed"
            @playlistSubscribe="playlistSubscribe"
          ></SongDetailsList>
        </div>
        <div class="commen-header">
          <div class="comment-header-title">
            <span class="comment-text">评论</span>
            <span>{{ totle }}条评论</span>
          </div>
        </div>
        <CommentBox
          :currentCommentId="currentCommentId"
          @commentSubmit="commentSubmit"
          :clearContent="clearContent"
        ></CommentBox>
        <div>
          <MainComment
            title="最新评论"
            :commentList="commentList"
            :currentCommentId="currentCommentId"
            @commentHandle="commentHandle"
            @commentSubmit="commentSubmit"
            @cancelComment="cancelComment"
            @commentLike="commentLike"
          >
          </MainComment>
        </div>
        <!-- 评论分页 -->
        <div class="el-pagination">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            background
            :page-size="limit"
            layout="total, prev, pager, next"
            :total="totle"
          >
          </el-pagination>
        </div>
      </div>
    </div>
    <div class="right">
      <!-- 喜欢该歌单的人 -->
      <div class="like-song module">
        <div class="header-card flex-row">
          <span>喜欢这个歌单的人</span>
        </div>
        <ul v-if="subscribers.length > 0">
          <li v-for="item of subscribers" :key="item.id">
            <div class="avatar" @click="findUser(item.userId)">
              <el-image
                style="width: 50px; height: 50px"
                :src="item.avatarUrl"
                :alt="item.nickname"
                :title="item.nickname"
                fit="cover"
              ></el-image>
            </div>
          </li>
        </ul>
        <p v-else class="no-like">还没有喜欢该歌单的人</p>
      </div>
      <!-- 相关歌单推荐 -->
      <div class="related module">
        <div class="header-card flex-row">
          <span>相关歌单推荐</span>
        </div>
        <ul v-if="relatedList.length > 0">
          <li
            v-for="item of relatedList"
            :key="item.id"
            @click="toSongDetail(item.id)"
          >
            <div class="avatar">
              <el-image
                style="width: 50px; height: 50px"
                :src="item.coverImgUrl"
                :alt="item.name"
                :title="item.name"
                fit="cover"
              ></el-image>
            </div>
            <div class="info">
              <h3 class="ellipsis" :title="item.name">{{ item.name }}</h3>
              <span :title="item.creator.nickname"
                >by. <small> {{ item.creator.nickname }}</small></span
              >
            </div>
          </li>
        </ul>
      </div>
      <!-- 热门评论 -->
      <div class="comment module">
        <div class="header-card flex-row">
          <span>热门评论</span>
        </div>
        <ul v-if="commentHotList.length > 0">
          <li class="item" v-for="item of commentHotList" :key="item.time">
            <div class="avatar" @click="findUser(item.user.userId)">
              <el-image
                style="width: 50px; height: 50px"
                :src="item.user.avatarUrl"
                :alt="item.user.nickname"
                :title="item.user.nickname"
                fit="cover"
              ></el-image>
            </div>
            <div class="info">
              <h3
                class="ellipsis"
                :title="item.user.nickname"
                @click="findUser(item.user.userId)"
              >
                {{ item.user.nickname }}
                <small> · {{ utils.formatMsgTime(item.time) }}</small>
              </h3>
              <p>{{ item.content }}</p>
            </div>
          </li>
        </ul>
        <p class="no-data-text" v-else>还没有人评论</p>
      </div>
    </div>
  </div>
</template>

<script>
import SongDetailsList from '@/components/MianComponent/SongDetailsList'
import MainComment from '@/components/MianComponent/MainComment'
import CommentBox from '@/components/MianComponent/CommentBox'
import {
  getPlayListDetail, getSongDetail, playlistSubscribe,
  getSubscribersList, getRelatedList,
} from '@/api/service/api'
import {
  sendComment, commentLike, getCommentList, getHotCommentList
} from '@/api/service/comment'
import { createSong } from '@/model/song'
export default {
  name: 'PlayListDetail',
  data() {
    return {
      // 歌单详情
      songDetail: {},
      // 歌曲列表
      songs: [],
      // 歌单创建者信息
      creator: {},
      // 收藏这个歌单的人数量
      s: 50,
      // 是否是我喜欢的歌单
      ordered: false,
      // 歌单id
      articleId: '',
      // 收藏这个歌单的人
      subscribers: [],
      // 相关推荐
      relatedList: [],
      // 最新评论列表
      commentList: [],
      // 歌单热门评论列表
      commentHotList: [],
      // 热门评论类型
      // 评论的id
      currentCommentId: '',
      currentPage: 1,
      limit: 20,
      totle: 0,
      offset: 0,
      // 是否清空评论框内容
      clearContent: false,
      // 关闭组件的底部标题
      songListShow: true

    }
  },
  components: {
    SongDetailsList,
    MainComment,
    CommentBox
  },

  computed: {
    // 计算获取的描述的文字长度
    textLength() {
      return function (txt) {
        if (txt) {
          return txt.length
        }
      }
    }
  },

  watch: {
    // 观察路由跳转携带过来的id
    $route(newId, oldId) {
      console.log(newId, oldId);
      let id = this.$route.query.id || this.singer.id
      if (id) {
        this._initIaLize(id)
      }
    }
  },
  mounted() {
    let id = this.$route.query.id
    this.articleId = id
    if (id) {
      this._initIaLize(id)
    }
  },
  methods: {

    // 标签跳转
    tagLink(cat) {
      this.$router.push({
        name: 'playlist',
        query: {
          cat
        }
      })
    },

    // 相关歌单推荐
    toSongDetail(id) {
      this.$router.push({
        name: 'playlistdetail',
        query: {
          id
        }
      })
    },

    // 去用户主页
    findUser(id) {
      this.$router.push({
        name: 'personal',
        query: {
          id
        }
      })
    },

    // 给评论点赞
    async commentLike(id, liked) {
      let timestamp = new Date().getTime()
      let params = {
        id: this.articleId,
        cid: id,
        type: 2,
        timestamp
      }
      // 判断是已经点赞了还是取消点赞
      if (liked) {
        params.t = 0
      } else {
        params.t = 1
      }
      let message = liked ? '取消点赞' : '点赞成功'
      try {
        let res = await commentLike(params)
        if (res.code === this.constants.code_status) {
          this.$message({
            message: message,
            type: 'success'
          })
          // 获取歌单点赞的相关数据
          this.getCommentList(this.articleId)
        }
      } catch (error) {
        console.log(error);
      }
    },

    // 取消评论
    cancelComment() {
      this.currentCommentId = ''
    },

    // 每页显示的评论数量
    handleSizeChange(val) {
      this.limit = val
      this.offset = this.limit * this.currentPage
      this.getCommentList(this.articleId)
    },

    // 改变当前页码
    handleCurrentChange(val) {
      this.currentPage = val
      this.offset = val * this.limit
      this.getCommentList(this.articleId)
    },

    // 评论最新提交
    commentSubmit(content) {
      if (!content) {
        this.$message.error('没有输入内容啊')
        return
      } else {
        // 获取当前的时间
        let timestamp = new Date().getTime()
        let params = {
          id: this.articleId,
          type: 2,
          content: content,
          timestamp
        }
        if (this.currentCommentId === '') {
          // 发表评论
          params.t = 1
        } else {
          // 回复
          params.t = 2
          params.commentId = this.currentCommentId
        }
        let message = this.currentCommentId === '' ? '评论成功' : '回复成功'
        sendComment(params).then(res => {
          if (res.code === this.constants.code_status) {
            this.$message({
              message: message,
              type: 'success'
            })
            this.cancelComment()
            // 刷新评论列表
            this.getCommentList(this.articleId)
            this.clearContent = true
          }
        }).catch(error => {
          this.$message.error({
            title: error.data.dialog.title,
            message: error.data.dialog.subtitle
          })
        })
      }
    },

    // 点击评论,打开评论框
    commentHandle(id) {
      // 将父组件id传递到子组件，用于判断是否是同一个账户
      this.currentCommentId = id
    },

    // 获取歌单热门评论
    async getHotCommentList(id) {
      let params = {
        id,
        type: 2,
        limit: 10,
        offset: 1,
      }
      try {
        let res = await getHotCommentList(params)
        if (res.code === this.constants.code_status) {
          this.commentHotList = res.hotComments
        }
      } catch (error) {
        console.log(error)
      }
    },

    // 获取歌单评论
    async getCommentList(id) {
      let params = {
        id,
        limit: this.limit,
        offset: this.offset
      }
      try {
        let res = await getCommentList(params)
        if (res.code === this.constants.code_status) {
          // 获取总数
          this.totle = res.total
          this.commentList = res.comments
        }
      } catch (error) {
        console.log(error);
      }
    },
    // 相关歌单推荐
    async getRelatedList(id) {
      try {
        let res = await getRelatedList(id)
        if (res.code === this.constants.code_status) {
          this.relatedList = res.playlists
        }
      } catch (error) {
        console.log(error);
      }
    },

    // 获取歌单收藏者
    async getSubscribersList(id) {
      let params = { id, limit: 16, offset: 1 }
      try {
        let res = await getSubscribersList(params)
        if (res.code === this.constants.code_status) {
          this.subscribers = res.subscribers
        }
      } catch (error) {
        console.log(error);
      }
    },

    // 歌单收藏与取消的方法调用
    async playlistSubscribe() {
      let t = this.songDetail.subscribed ? 2 : 1
      let message = this.songDetail.subscribed ? '已取消收藏' : '收藏成功'
      try {
        let res = await playlistSubscribe(t, this.articleId)
        if (res.code === this.constants.code_status) {
          this.$message({
            message,
            type: 'success'
          })
          setTimeout(() => {
            this.getPlayListDetail(this.articleId, this.s)
          }, 500)
        }
      } catch (error) {
        console.log(error);
      }
    },

    // 展开介绍
    openDes(title, content) {
      this.$confirm(content, title, {
        closeOnClickModal: true,
        customClass: 'descBox',
        showConfirmButton: false,
        dangerouslyUseHTMLString: true,
      }).catch(error => {
        console.log(error)
      })
    },

    // 获取歌单详情
    async getPlayListDetail(id, s) {
      // 获取当前时间的节点值
      let timestamp = new Date().valueOf()
      try {
        let res = await getPlayListDetail(id, s, timestamp)
        if (res.code === this.constants.code_status) {
          if (res.playlist.description !== null) {
            res.playlist.description = res.playlist.description.replace(
              /(\r\n|\n\r)/gm,
              '<br />'
            )
          }
          // 获取歌单详情
          this.songDetail = res.playlist
          this.creator = res.playlist.creator
          // 封装歌曲id
          let trackIds = res.playlist.trackIds
          // 数量超过一千，进行分割
          let arrLength = 1000
          let sliceArr = []
          for (let i = 0; i < trackIds.length; i += arrLength) {
            // 切割数组
            sliceArr.push(trackIds.slice(i, i + arrLength))
          }
          // 传参给该函数
          this.getSongDetail(sliceArr)
        }
      } catch (error) {
        console.log(error);
      }
    },

    // 获取歌曲列表
    async getSongDetail(sliceArr) {
      let before = sliceArr[0]
      let after = sliceArr[1]
      let timestamp = new Date().valueOf()
      let beforeIds = []
      let afterIds = []
      if (before) {
        before.map(item => {
          beforeIds.push(item.id)
        })
        // 格式化id，使用逗号依次隔开
        beforeIds = beforeIds.join(',')
      }
      if (after) {
        after.map(item => {
          afterIds.push(item.id)
        })
        afterIds = afterIds.join(',')
      }
      try {
        if (after) {
          let beforeRes = await getSongDetail(beforeIds, timestamp)
          let afterRes = await getSongDetail(afterIds, timestamp + 1)
          // 数组连接起来
          let res = beforeRes.songs.concat(afterRes.songs)
          this.songs = this._normaLizeSongs(res)
        } else {
          let beforeRes = await getSongDetail(beforeIds, timestamp)
          let res = beforeRes.songs
          this.songs = this._normaLizeSongs(res)
        }
      } catch (error) {
        console.log(error);
      }
    },

    // 处理歌曲
    _normaLizeSongs(res) {
      let resArr = []
      res.map(item => {
        resArr.push(createSong(item))
      })
      return resArr
    },

    // 初始化函数
    _initIaLize(id) {
      // 将获取的歌单id传出，50是详情数量
      this.getPlayListDetail(id, 50)
      this.getSubscribersList(id)
      this.getRelatedList(id)
      this.getCommentList(id)
      this.getHotCommentList(id)
    }
  }
}
</script>

<style lang='less' scoped>
.play-list-detail {
  display: flex;
  align-items: flex-start;
  margin-top: 16px;
  border-radius: 8px;
  .left {
    flex: 1;
    width: 600px;
    padding: 20px;
    border-radius: 8px;
    margin-right: 10px;
    .top {
      display: flex;
      .avatar {
        width: 200px;
        height: 200px;
        border-radius: 8px;
        position: relative;
        margin-right: 30px;
        flex-shrink: 0;
        .el-image {
          width: 100%;
          height: 100%;
          border-radius: 8px;
          position: relative;
        }
        // &:hover {
        //   content: '';
        //   width: 400px;
        //   height: 400px;
        //   background: rgba(255, 255, 255, 0.2);
        //   display: block;
        //   position: absolute;
        //   top: 15px;
        //   right: -5px;
        //   z-index: 1;
        //   border-radius: 8px;
        // }
      }
      .info {
        display: flex;
        flex-direction: column;
        justify-content: center;
        .title {
          font-size: 1.6rem;
          font-weight: 600;
          line-height: 40px;
          margin-bottom: 20px;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
          color: @color-dark;
        }
        .user {
          margin-bottom: 15px;
          .avatar {
            width: 30px;
            height: 30px;
            border-radius: 50%;
            position: relative;
            margin-right: 20px;
            cursor: pointer;
          }
          .username {
            color: @blue;
            font-size: 1rem;
            margin-right: 40px;
            cursor: pointer;
            &:hover {
              color: @color-theme;
            }
          }
          .createTime {
            font-size: 1rem;
            color: @color-dark;
          }
        }
        .user-button {
          display: block;
          .icon-bofang1 {
            font-size: 0.9rem;
          }
          /deep/.el-button--small {
            font-size: 0.9rem;
          }
        }
        .tag {
          margin-top: 6px;
          color: @color-dark;
          a {
            color: @color-blank;
            background: @tag-background;
            margin-right: 15px;
            font-size: 1rem;
            cursor: pointer;
            padding: 6px 12px;
            border-radius: 16px;
            &:hover {
              color: @color-theme;
            }
            // &::after {
            //   // content: '，'
            // }
            // &:last-child {
            //   &::after {
            //     content: "";
            //   }
            // }
          }
        }
        .description {
          display: flex;
          flex-direction: column;
          line-height: 1.6;
          margin-top: 12px;
          p {
            line-height: 1.6;
            font-weight: 500;
            // flex: 2;
            font-size: 1rem;
          }
          span {
            flex-shrink: 0;
            color: @color-theme;
            cursor: pointer;
            margin-left: 10px;
            width: 60px;
          }
        }
      }
    }
    .content {
      margin-bottom: 10px;
      width: 100%;
      .content-song-detail {
        margin-bottom: 60px;
      }
      .commen-header {
        display: flex;
        justify-content: start;
        align-items: center;
        margin-bottom: 10px;
        // border-bottom: 3px solid @color-theme;
        .comment-header-title {
          display: flex;
          align-items: center;
          .comment-text {
            margin-right: 40px;
            font-size: 1.2rem;
          }
          span {
            font-size: 1rem;
            color: @color-dark;
          }
        }
      }
      .el-pagination {
        margin-top: 10px;
        display: flex;
        justify-content: center;
      }
    }
  }
  .right {
    width: 350px;
    flex-shrink: 0;
    border-radius: 8px;
    .module {
      padding: 16px;
      width: 100%;
      border-radius: 8px;
    }
    .like-song {
      align-items: center;
      cursor: pointer;
      .header-card {
        text-align: center;
        margin-bottom: 10px;
        padding-bottom: 4px;
        // border-bottom: 1px solid @color-theme;
        color: @color-dark;
        cursor: pointer;
        span {
          font-size: 1rem;
        }
        .avatar {
          width: 50px;
          height: 50px;
        }
      }
      .no-like {
        margin: 0 auto;
        font-size: 1rem;
      }
      ul {
        display: flex;
        flex-wrap: wrap;
        margin: 0;
        padding: 0;
        list-style: none;
        li {
          flex: 0 0 24%;
          max-width: 30%;
          padding: 0 5px 10px;
          .avatar {
            width: 100%;
            border-radius: 3px;
            /deep/.el-image {
              width: 100%;
              border-radius: 3px;
            }
          }
        }
      }
    }
    .related {
      align-items: center;
      cursor: pointer;
      .header-card {
        text-align: center;
        margin-bottom: 10px;
        padding-bottom: 4px;
        color: @color-dark;
        // border-bottom: 1px solid @color-theme;
        cursor: pointer;
        span {
          font-size: 1rem;
        }
      }
      ul {
        list-style: none;
        li {
          display: flex;
          margin-bottom: 15px;
          cursor: pointer;
          .avatar {
            width: 60px;
            height: 60px;
            border-radius: 8px;
            margin-right: 15px;
            flex-shrink: 0;
            /deep/.el-image {
              width: 100%;
              border-radius: 3px;
            }
          }
          .info {
            height: 60px;
            width: calc(100% -100px);
            flex: 1;
            display: flex;
            justify-content: center;
            flex-direction: column;
            h3 {
              font-weight: 400;
              margin-bottom: 10px;
              width: 80%;
              color: @color-dark;
              &:hover {
                color: @color-theme;
              }
            }
            span {
              font-size: 0.9rem;
              color: @color-dark;
            }
          }
        }
      }
    }
    .comment {
      align-items: center;
      cursor: pointer;
      .header-card {
        text-align: center;
        margin-bottom: 10px;
        padding-bottom: 4px;
        color: @color-dark;
        // border-bottom: 1px solid @color-theme;
        cursor: pointer;
        span {
          font-size: 1rem;
        }
      }
      ul {
        margin: 0;
        padding: 0;
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
            img {
              width: 100%;
              border-radius: 50%;
            }
          }
          .info {
            flex: 1;
            h3 {
              font-size: 1rem;
              margin-right: 5px;
              margin-bottom: 10px;
              cursor: pointer;
              color: @color-dark;

              small {
                font-size: 12px;
                color: #a5a5c1;
                font-weight: 200;
              }
            }
            p {
              width: 90%;
              font-size: 0.8rem;
              color: @color-blank;
              line-height: 1.6;
              padding: 5px 10px;
              background: @content-background;
              margin-top: 5px;
              border-radius: 3px;
            }
          }
        }
      }
      .no-data-text {
        padding-bottom: 10px;
      }
    }
  }
}
</style>
