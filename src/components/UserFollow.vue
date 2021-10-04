<template>
  <van-button
    class="follow-btn"
    round
    size="small"
    v-if="value"
    @click="onFollow"
    :loading="loading"
    >已关注</van-button
  >
  <van-button
    v-else
    @click="onFollow"
    class="follow-btn"
    type="info"
    color="#3296fa"
    round
    size="small"
    icon="plus"
    :loading="loading"
    >关注</van-button
  >
</template>

<script>
import { addFollow, deleteFollow } from '@/api/user'
export default {
  name: 'FollowIndex',
  data () {
    return {
      loading: false
    }
  },
  props: {
    value: {
      type: Boolean,
      required: true
    },
    autId: {
      type: [Number, String],
      required: true
    }
  },
  created () {},
  mounted () {},
  components: {},
  computed: {},
  watch: {},
  methods: {
    async onFollow () {
      try {
        this.loading = true
        // 调接口发送请求
        if (this.value) {
        // 已关注，取消关注
          await deleteFollow(this.autId)
        } else {
        // 为关注，添加关注
          await addFollow(this.autId)
        }
      } catch (err) {
        console.log(err)
        this.$toast('操作失败，请稍后重试')
      } finally {
        // 更新视图
        this.$emit('input', !this.value)
        this.loading = false
      }
    }
  }
}
</script>

<style lang="less" scoped>
</style>
