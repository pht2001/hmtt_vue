<template>
  <van-icon @click="onLike" v-if="value === -1" color="#777" name="good-job-o" />
  <van-icon @click="onLike" v-else-if="value === 1" color="#e5645f" name="good-job" />
</template>

<script>
import { addLike, deleteLike } from '@/api/user'
export default {
  name: 'ActicleLike',
  data () {
    return {
    }
  },
  props: {
    value: {
      type: Number,
      required: true
    },
    acticleId: {
      type: [Number, String],
      required: true
    }
  },
  created () {
  },
  mounted () {
  },
  components: {
  },
  computed: {
  },
  watch: {
  },
  methods: {
    async onLike () {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0
      })
      try {
        var status = -1
        // 调接口发起请求
        if (this.value === 1) {
          // 已点赞，取消点赞
          await deleteLike(this.acticleId)
          this.$toast.success('取消点赞')
        } else if (this.value === -1) {
          // 为点赞，添加点赞
          await addLike(this.acticleId)
          this.$toast.success('点赞成功')
          status = 1
        }
      } catch (err) {
        this.$toast('操作失败，请稍后重试')
      } finally {
        // 更新视图
        this.$emit('input', status)
      }
    }
  }
}

</script>

<style lang="less" scoped>
</style>
