<template>
  <van-pull-refresh
    v-model="isLoading"
    :success-text="refresh"
    @refresh="onRefresh"
    success-duration="1000"
  >
    <van-list class="acticle-list"
          v-model="loading"
          :finished="finished"
          finished-text="我也是有底线的"
          :error.sync="error"
          error-text="请求失败，点击重新加载"
          @load="onLoad"
    >
        <ActicleItem v-for="(obj, index) in list" :key="index" :acticleObj="obj" />
    </van-list>
  </van-pull-refresh>
</template>

<script>
import ActicleItem from '@/components/ActicleItem'
import { getActicles } from '@/api/acticle'
export default {
  name: 'ActicleList',
  props: {
    channelId: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      timestamp: null,
      list: [],
      loading: false,
      finished: false,
      error: false,
      isLoading: false,
      refresh: '刷新成功'
    }
  },
  components: {
    ActicleItem
  },
  methods: {
    async onLoad () {
      try {
        const { data } = await getActicles({
          channel_id: this.channelId, // 频道ID
          timestamp: this.timestamp || Date.now(), // 时间戳，请求新的推荐数据传当前的时间戳，请求历史推荐传指定的时间戳
          with_top: 1 // 是否包含置顶，进入页面第一次请求时要包含置顶文章，1-包含置顶，0-不包含
        })
        if (data.data.results) {
          this.list.push(...data.data.results)
          this.timestamp = data.data.pre_timestamp
        } else {
          this.finished = true
        }
      } catch (err) {
        this.error = true
      } finally {
        this.loading = false
      }
    },
    async onRefresh () {
      try {
        const { data } = await getActicles({
          channel_id: this.channelId, // 频道ID
          timestamp: Date.now(), // 时间戳，请求新的推荐数据传当前的时间戳，请求历史推荐传指定的时间戳
          with_top: 1 // 是否包含置顶，进入页面第一次请求时要包含置顶文章，1-包含置顶，0-不包含
        })
        if (data.data.results) {
          this.list.unshift(...data.data.results)
        }
        this.refresh = `加载成功，更新了${data.data.results.length}条数据`
      } catch (err) {
        this.refresh = '加载失败'
      } finally {
        this.isLoading = false
      }
    }
  }
}
</script>

<style lang="less" scoped>
</style>
