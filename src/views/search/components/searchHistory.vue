<template>
  <div class="search-history">
    <van-cell>
      <div class="title" slot="title">搜索历史</div>
      <div class="edit" slot="default" v-if="isDel && list.length">
        <span class="allDel" @click="list.splice(0)">全部删除</span>
        <span class="complete" @click="isDel = false">完成</span>
      </div>
      <van-icon name="delete-o" class="delete" slot="default" v-if="!isDel && list.length" @click="isDel = !isDel" />
    </van-cell>

    <van-cell v-for="(value, index) in list" :key="index" @click="onSearch(value, index)">
      <div class="title" slot="title">{{ value }}</div>
      <van-icon name="close" slot="default" v-show="isDel" />
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'searchHistory',
  data () {
    return {
      isDel: false
    }
  },
  props: {
    list: {
      type: Array,
      required: true
    }
  },
  created () {},
  mounted () {},
  components: {},
  computed: {},
  watch: {},
  methods: {
    onSearch (val, index) {
      if (this.isDel) {
        // 删除历史记录
        this.list.splice(index, 1)
      } else {
        // 跳转搜索页面
        this.$emit('search', val)
      }
    }
  }
}
</script>
<style lang="less" scoped>
.search-history {
  .van-cell {
    .van-cell__title {
      flex: 2;
    }
    .complete {
      margin-left: 25px;
    }
    .delete {
      font-size: 34px;
    }
  }
}
</style>
