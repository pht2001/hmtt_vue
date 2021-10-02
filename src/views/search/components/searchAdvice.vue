<template>
  <div class="saerch-advice">
    <van-cell v-for="(item, index) in suggestList" :key="index" @click="$emit('search', item)">
      <van-icon name="search" slot="icon" />
      <div class="title" slot="title" v-html="whiteLight(item)"></div>
    </van-cell>
  </div>
</template>

<script>
import { getSearchSuggestion } from '@/api/search'
export default {
  name: 'searchAdvice',
  data () {
    return {
      suggestList: []
    }
  },
  props: {
    iptValue: {
      type: String,
      required: true,
      timer: null
    }
  },
  created () {},
  mounted () {},
  components: {},
  computed: {},
  watch: {
    iptValue: {
      immediate: true,
      handler (newVal) {
        if (this.timer) clearTimeout(this.timer)
        if (newVal.length <= 0) return
        this.timer = setTimeout(async () => {
          try {
            const { data: { data: { options } } } = await getSearchSuggestion(newVal)
            if (options.length <= 0) {
              this.suggestList = []
              return
            }
            if (newVal <= 0) return
            this.suggestList = options
          } catch (err) {
            this.$toast('操作失败，请稍后重试')
          }
        }, 300)
      }
    }
  },
  methods: {
    whiteLight (value) {
      var reg = new RegExp(this.iptValue, 'gi')
      return value.replace(reg, `<span class="active">${this.iptValue}</span>`)
    }
  }
}
</script>
<style lang="less" scoped>
.saerch-advice {
  .van-cell {
    display: flex;
    align-items: center;
    .van-icon-search {
      font-size: 40px;
      margin-right: 16px;
    }
  }
  /deep/ .active {
    color: #3296fa;
  }
}
</style>
