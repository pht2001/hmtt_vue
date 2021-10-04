<template>
  <van-cell class="comment-item">
    <van-image
      slot="icon"
      class="avatar"
      round
      fit="cover"
      :src="commentObj.aut_photo"
    />
    <div slot="title" class="title-wrap">
      <div class="user-name">{{ commentObj.aut_name }}</div>
      <van-button
        class="like-btn"
        @click="onCommentLike"
      >
        <van-icon v-if="commentObj.is_liking" slot="icon" color="#e5645f" name="good-job" />
        <van-icon v-else slot="icon" name="good-job-o" />
      {{commentObj.like_count ? commentObj.like_count : '赞'}}</van-button>
    </div>

    <div slot="label">
      <p class="comment-content">{{ commentObj.content }}</p>
      <div class="bottom-info">
        <span class="comment-pubdate">{{ commentObj.pubdate | relativeTime }}</span>
        <van-button
          class="reply-btn"
          round
        >回复 {{ commentObj.reply_count }}</van-button>
      </div>
    </div>
  </van-cell>
</template>

<script>
import { addCommentLike, deleteCommentLike } from '@/api/comment'
export default {
  name: 'CommentItem',
  components: {},
  props: {
    commentObj: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    async onCommentLike () {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0
      })
      try {
        this.loading = true
        if (this.commentObj.is_liking) {
          // 已点赞，取消点赞
          await deleteCommentLike(this.commentObj.com_id.toString())
          this.commentObj.like_count--
        } else {
          // 未点赞，添加点赞
          await addCommentLike(this.commentObj.com_id.toString())
          this.commentObj.like_count++
        }
        this.commentObj.is_liking = !this.commentObj.is_liking
      } catch (err) {
        this.$toast('点赞失败，请稍后重试')
      } finally {
        this.$toast.clear()
      }
    }
  }
}
</script>

<style scoped lang="less">
.comment-item {
  .avatar {
    width: 72px;
    height: 72px;
    margin-right: 25px;
  }
  .title-wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .user-name {
      color: #406599;
      font-size: 26px;
    }
  }
  .comment-content {
    font-size: 32px;
    color: #222222;
    word-break: break-all;
    text-align: justify;
  }
  .comment-pubdate {
    font-size: 19px;
    color: #222;
    margin-right: 25px;
  }
  .bottom-info {
    display: flex;
    align-items: center;
  }
  .reply-btn {
    // width: 135px;
    height: 48px;
    line-height: 48px;
    font-size: 21px;
    color: #222;
  }
  .like-btn {
    height: 30px;
    padding: 0;
    border: none;
    font-size: 19px;
    line-height: 30px;
    margin-right: 7px;
    .van-icon {
      font-size: 30px;
    }
  }
}
</style>
