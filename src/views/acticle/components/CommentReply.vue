<template>
  <div class="comment-reply">
      <!-- 头部导航 -->
      <van-nav-bar class="page-nav-bar">
          <div slot="title">{{replyObj.reply_count ? `${replyObj.reply_count}条回复` : '暂无回复'}}</div>
          <van-icon @click="$emit('close')" class="close" name="cross" slot="left" />
      </van-nav-bar>
      <!-- /头部导航 -->
      <!-- 主体用户评论部分 -->
      <div class="scroll-main">
          <CommentItem :replyFlag="false" :commentObj="replyObj" />
          <van-cell title="全部回复" />
          <CommentList :list="replyList" type="c" :source="replyObj.com_id" />
      </div>
      <!-- /主体用户评论部分 -->
      <div class="post-wrap">
        <van-button @click="isReplyComShow = true" class="comment-btn" round size="small" type="default">写评论</van-button>
      </div>

      <!-- 回复评论模块 -->
      <van-popup v-model="isReplyComShow" position="bottom">
        <CommentPost @postSuccess="replyFn" :acticleId="acticleId" v-if="isReplyComShow" :target="replyObj.com_id" />
      </van-popup>
      <!-- /回复评论模块 -->
  </div>
</template>

<script>
import CommentItem from './CommentItem'
import CommentList from './CommentList'
import CommentPost from './CommentPost'
export default {
  name: 'CommentReply',
  data () {
    return {
      isReplyComShow: false,
      replyList: []
    }
  },
  props: {
    replyObj: {
      type: Object,
      required: true
    }
  },
  inject: {
    acticleId: {
      type: [Number, String],
      default: null
    }
  },
  created () {
  },
  mounted () {
  },
  components: {
    CommentItem,
    CommentList,
    CommentPost
  },
  computed: {
  },
  watch: {
  },
  methods: {
    replyFn (newObj) {
      // 关闭弹层
      this.isReplyComShow = false
      // 把数据添加到最上面
      this.replyList.unshift(newObj)
    }
  }
}

</script>

<style lang="less" scoped>
.comment-reply {
    overflow-y: hidden;
    .page-nav-bar {
        .close {
            color: #fff;
            font-size: 40px;
            font-weight: 700;
        }
    }
    .scroll-main {
        height: 76.2vh;
        overflow-y: auto;
    }
    .post-wrap {
        height: 90px;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        border-top: 3px solid #d8d8d8;
        .comment-btn {
          width: 60%;
        }
    }
}
</style>
