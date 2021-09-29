<template>
  <div class="layout-container">
      <router-view></router-view>
      <van-tabbar v-model="active" route>
        <van-tabbar-item replace to="/">首页
          <template #icon>
            <i class="iconfont icon-shouye"></i>
          </template>
        </van-tabbar-item>
        <van-tabbar-item replace to="/qa" >问答
          <template #icon>
            <i class="iconfont icon-wenda"></i>
          </template>
        </van-tabbar-item>
        <van-tabbar-item replace to="/video">视频
          <template #icon>
            <i class="iconfont icon-shipin"></i>
          </template>
        </van-tabbar-item>
        <van-tabbar-item replace to="/my">{{$store.state.user ? '我的' : '未登录'}}
          <template #icon>
            <i class="iconfont icon-wode"></i>
          </template>
        </van-tabbar-item>
      </van-tabbar>
  </div>

</template>

<script>
export default {
  name: 'layoutIndex',
  data () {
    return {
      active: 0
    }
  }
}
</script>

<style lang="less" scoped>
.layout-container {
  .iconfont {
    font-size: 40px;
  }
}
</style>
