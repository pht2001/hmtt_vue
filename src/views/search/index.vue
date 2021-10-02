<template>
  <div class="search-container">
    <form action="/" class="search-input">
      <van-search
        ref="search"
        class="page-nav-bar"
        v-model.trim="value"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="$router.push('/')"
        @focus="isOnSearch = false"
      />
    </form>
    <div class="main">
      <!-- 搜索结果 -->
      <div class="search-success" v-if="isOnSearch">
        <searchSuccess :iptValue="value" />
      </div>
      <!-- /搜索结果 -->
      <!-- 联想建议 -->
      <div class="advice" v-else-if="value.length">
        <searchAdvice :iptValue="value" @search="onSearch" />
      </div>
      <!-- /联想建议 -->
      <!-- 搜索历史 -->
      <div class="history" v-else>
        <searchHistory :list="historyList" @search="onSearch" />
      </div>
      <!-- /搜索历史 -->
    </div>
  </div>
</template>

<script>
import searchHistory from './components/searchHistory'
import searchAdvice from './components/searchAdvice'
import searchSuccess from './components/searchSuccess'
import { getItem, setItem } from '@/utils/storage'
export default {
  name: 'searchIndex',
  data () {
    return {
      value: '',
      isOnSearch: false,
      historyList: getItem('USER_HISTORY') || []
    }
  },
  props: {},
  created () {},
  mounted () {
    // 自动聚焦
    this.$refs.search.querySelector('.van-field__control').focus()
  },
  components: {
    searchHistory,
    searchAdvice,
    searchSuccess
  },
  computed: {},
  watch: {
    historyList: {
      handler (val) {
        setItem('USER_HISTORY', val)
      }
    }
  },
  methods: {
    onSearch (val) {
      if (val.length <= 0) return this.$toast('内容不能为空')
      this.value = val
      const index = this.historyList.indexOf(val)
      if (index !== -1) {
        this.historyList.splice(index, 1)
      }
      this.historyList.unshift(val)
      this.isOnSearch = true
    }
  }
}
</script>
<style lang="less" scoped>
.search-container {
  .search-input {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 2;
  }
  .main {
    position: fixed;
    top: 54 * 2px;
    left: 0;
    right: 0;
    bottom: 0;
    overflow-y: auto;
  }
  .van-search__action {
    color: #fff;
  }
}
</style>
