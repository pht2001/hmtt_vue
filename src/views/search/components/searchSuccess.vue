<template>
  <div class="search-success">
    <van-list
      v-model="loading"
      :finished="finished"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
      finished-text="我也是有底线的"
      @load="onLoad"
    >
      <van-cell v-for="(obj, index) in list" :key="index" :title="obj.title" />
    </van-list>
  </div>
</template>

<script>
import { getSearchSuccess } from '@/api/search'
export default {
  name: 'searchSuccess',
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      error: false,
      page: 1
    }
  },
  props: {
    iptValue: {
      type: String,
      required: true
    }
  },
  created () {
  },
  mounted () {},
  components: {},
  computed: {},
  watch: {},
  methods: {
    async onLoad () {
      try {
        const { data: { data: { results } } } = await getSearchSuccess({
          page: this.page, // 页数，不传默认为1
          per_page: 10, // 每页数量，不传每页数量由后端决定
          q: this.iptValue // 搜索关键词
        })
        if (results.length <= 0) {
          this.finished = true
          return
        }
        this.page++
        this.list.push(...results)
      } catch (err) {
        this.error = true
      } finally {
        this.loading = false
      }
    }
  }
}
</script>
<style lang="less" scoped>
</style>
