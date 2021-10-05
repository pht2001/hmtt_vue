<template>
  <div class="comment-post">
    <van-field
      class="post-field"
      v-model.trim="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="请输入留言"
      show-word-limit
      ref="input"
    />
    <van-button
      :disabled="!message.length"
      class="post-btn"
      @click="onPost"
    >发布</van-button>
  </div>
</template>

<script>
import { addCommentPost } from '@/api/comment'
export default {
  name: 'CommentPost',
  components: {},
  props: {
    target: {
      type: [Number, String, Object],
      required: true
    },
    acticleId: {
      type: [Number, String],
      default: null
    }
  },
  data () {
    return {
      message: ''
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {
    this.$refs.input.focus()
  },
  methods: {
    async onPost () {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0
      })
      try {
        const { data: { data } } = await addCommentPost({
          target: this.target.toString(), // 评论的目标id（评论文章即为文章id，对评论进行回复则为评论id）
          content: this.message, // 评论内容
          art_id: this.acticleId // 文章id，对评论内容发表回复时，需要传递此参数，表明所属文章id。对文章进行评论，不要传此参数。
        })
        this.$toast.success('发布成功')
        this.$emit('postSuccess', data.new_obj)
      } catch (err) {
        this.$toast('发布失败，请稍后重试')
      }
    }
  }
}
</script>

<style scoped lang="less">
.comment-post {
  display: flex;
  align-items: center;
  padding: 32px 0 32px 32px;
  .post-field {
    background-color: #f5f7f9;
  }
  .post-btn {
    width: 150px;
    border: none;
    padding: 0;
    color: #6ba3d8;
    &::before {
      display: none;
    }
  }
}
</style>
