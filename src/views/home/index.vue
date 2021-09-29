<template>
  <div class="home-container">
    <!-- 搜索 -->
    <van-nav-bar class="page-nav-bar"
                 fixed>
      <template #title>
        <van-button class="search"
                    round
                    size="small">
          <van-icon slot="icon"
                    class="search-o"
                    name="search"></van-icon>
          <span slot="default">搜索</span>
        </van-button>
      </template>
    </van-nav-bar>
    <!-- /搜索 -->
    <!-- 频道导航 -->
    <van-tabs v-model="active"
              swipeable
              animated
              class="channel-tabs"
              swipe-threshold="3">
      <van-tab v-for="channel in channelsList"
               :key="channel.id"
               :title="channel.name">
        <div class="scroll">
          内容 {{ channel.id }}
        </div>
      </van-tab>

      <template #nav-right>
        <div class="last-tab"></div>
        <div class="hamburger"
             @click="isChannelsShow = true">
          <i class="iconfont icon-gengduo"></i>
        </div>
      </template>
    </van-tabs>
    <!-- /频道导航 -->

    <!-- 频道列表 -->
    <van-popup v-model="isChannelsShow"
               position="bottom"
               :style="{ height: '100%' }"
               closeable
               close-icon-position="top-left">
      <Channels :myChannelsList="channelsList"
                :active="active"
                @updateActive="updateActiveFn" />
    </van-popup>
    <!-- /频道列表 -->
  </div>
</template>

<script>
import { getUserChannels } from '@/api/user'
import Channels from './components/Channels'
import { mapState } from 'vuex'
import { getItem } from '@/utils/storage'
export default {
  name: 'homeIndex',
  data () {
    return {
      active: 0,
      channelsList: [],
      isChannelsShow: false
    }
  },
  components: {
    Channels
  },
  computed: {
    ...mapState(['user'])
  },
  async created () {
    try {
      const { data: { data: { channels } } } = await getUserChannels()
      let list = ''
      if (this.user) {
        // 用户已登录
        list = channels
      } else {
        // 用户未登录
        const data = getItem('USER_CHANNELS')
        if (data) {
          list = data
        } else {
          list = channels
        }
      }
      this.channelsList = list
    } catch (err) {
      this.$toast('获取频道列表失败, 请稍后重试')
    }
  },
  methods: {
    updateActiveFn (index, isShow) {
      this.active = index
      this.isChannelsShow = isShow
    }
  }
}
</script>

<style lang="less" scoped>
.home-container {
  .search {
    width: 555px;
    height: 64px;
    background-color: #5babfb;
    border: none;
    font-size: 28px;
    color: #fff;
    .search-o {
      color: #fff;
      font-size: 37px;
    }
    .van-button__content {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  /deep/ .van-nav-bar__title {
    max-width: unset;
  }
  /deep/ .channel-tabs {
    padding-top: 87 * 2px;
    .van-tabs__wrap {
      position: fixed;
      top: 92px;
      left: 0;
      right: 0;
      z-index: 3;
    }
    .van-tabs__nav {
      padding-bottom: 0;
      // overflow-x: auto;
      // overflow-y: hidden;
    }
    .van-tab {
      min-width: 200px;
      border-right: 1px solid #edeff3;
      .van-tab__text {
        font-size: 30px;
      }
    }
    .van-tabs__line {
      bottom: 10px;
      width: 32px;
      background-color: #3296fa;
      height: 7px;
    }
    .last-tab {
      // flex: 1 0 auto;
      min-width: 66px;
    }
    .hamburger {
      position: fixed;
      top: 92px;
      right: 0;
      z-index: 4;
      background-color: #fff;
      width: 66px;
      opacity: 0.9;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 88px;
      .iconfont {
        font-size: 34px;
      }
    }
    .scroll {
      height: 79.5vh;
      overflow-y: auto;
    }
  }
}
</style>
