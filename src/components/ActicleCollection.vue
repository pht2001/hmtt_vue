<template>
  <van-icon @click="onCollected" v-if="value" color="#ffa500" name="star" />
  <van-icon @click="onCollected" v-else color="#777" name="star-o" />
</template>

<script>
import { addCollected, deleteCollected } from '@/api/user'
export default {
  name: 'CollectedIndex',
  data () {
    return {
    }
  },
  props: {
    value: {
      type: Boolean,
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
    async onCollected () {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0
      })
      try {
        // 调接口发起请求
        if (this.value) {
          // 已收藏，取消收藏
          await deleteCollected(this.acticleId)
          this.$toast.success('取消收藏')
        } else {
          // 为收藏，添加收藏
          await addCollected(this.acticleId)
          this.$toast.success('收藏成功')
        }
      } catch (err) {
        this.$toast('操作失败，请稍后重试')
      } finally {
        // 更新视图
        this.$emit('input', !this.value)
      }
    }
  }
}

</script>

<style lang="less" scoped>
</style>
