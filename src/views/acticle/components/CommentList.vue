<template>
  <van-list
    v-model="loading"
    :finished="finished"
    finished-text="我也是有底线的"
    :error.sync="error"
    error-text="请求失败，点击重新加载"
    @load="onLoad"
  >
    <CommentItem @reply="$emit('reply', $event)" v-for="(obj, index) in list" :key="index" :commentObj="obj" />
  </van-list>
</template>

<script>
import CommentItem from './CommentItem'
import { getActicleComments } from '@/api/comment'
export default {
  name: 'CommentList',
  data () {
    return {
      loading: false,
      finished: false,
      offset: null,
      limit: 10,
      error: false
    }
  },
  props: {
    type: {
      type: String,
      default: 'a',
      validator (val) {
        return ['a', 'c'].includes(val)
      }
    },
    source: {
      type: [Number, String, Object],
      required: true
    },
    list: {
      type: Array,
      default: () => []
    }
  },
  created () {
    // if (!this.loading) {

    // }
    this.onLoad()
    this.loading = true
  },
  mounted () {},
  components: {
    CommentItem
  },
  computed: {},
  watch: {},
  methods: {
    async onLoad () {
      try {
        const { data: { data } } = await getActicleComments({
          type: this.type, // 评论类型，a-对文章(article)的评论，c-对评论(comment)的回复
          source: this.source.toString(), // 源id，文章id或评论id
          offset: this.offset, // 获取评论数据的偏移量，值为评论id，表示从此id的数据向后取，不传表示从第一页开始读取数据
          limit: this.limit // 获取的评论数据个数，不传表示采用后端服务设定的默认每页数据量
        })
        if (data.results.length <= 0) {
          this.finished = true
          return
        }
        this.list.push(...data.results)
        this.offset = data.last_id
        this.$emit('count', data.total_count)
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
