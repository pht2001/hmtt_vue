<template>
  <div class="channels-container">
    <!-- 我的频道 -->
    <van-cell>
      <div slot="title"
           class="left">
        <span class="my-channels">我的频道</span>
        <span class="text">点击进入频道</span>
      </div>
      <van-button @click="isEdit = !isEdit"
                  round
                  class="edit"
                  slot="default">{{
        isEdit ? "完成" : "编辑"
      }}</van-button>
    </van-cell>
    <van-grid :gutter="10">
      <van-grid-item class="channel"
                     v-for="(obj, index) in myChannelsList"
                     :key="obj.id"
                     @click="editBtn(obj, index)">
        <van-icon v-show="isEdit && !filterChannels.includes(obj.id)"
                  class="close"
                  slot="icon"
                  name="close" />
        <span slot="text"
              class="text"
              :class="{ current: active === index }">{{
          obj.name
        }}</span>
      </van-grid-item>
    </van-grid>
    <!-- /我的频道 -->

    <!-- 频道推荐 -->
    <van-cell>
      <div slot="title"
           class="left">
        <span class="my-channels">频道推荐</span>
        <span class="text">点击添加频道</span>
      </div>
    </van-cell>
    <van-grid :gutter="10">
      <van-grid-item class="channel"
                     v-for="obj in recommendChannelsList"
                     :key="obj.id"
                     @click="addUserChannelFn(obj)">
        <span slot="text"
              class="text">{{ obj.name }}</span>
        <van-icon name="plus"
                  slot="icon" />
      </van-grid-item>
    </van-grid>
    <!-- /我的推荐 -->
  </div>
</template>

<script>
import {
  getUserAllChannels,
  addUserChannel,
  deleteUserChannel
} from '@/api/user'
import { setItem } from '@/utils/storage.js'
import { mapState } from 'vuex'
export default {
  name: 'ChannelsIndex',
  props: {
    myChannelsList: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      allChannelsList: [],
      filterChannels: [0],
      isEdit: false
    }
  },
  async created () {
    const {
      data: {
        data: { channels }
      }
    } = await getUserAllChannels()
    this.allChannelsList = channels
  },
  computed: {
    recommendChannelsList () {
      return this.allChannelsList.filter((obj) => {
        return !this.myChannelsList.some((item) => obj.id === item.id)
      })
    },
    ...mapState(['user'])
  },
  methods: {
    async editBtn (obj, index) {
      if (this.isEdit) {
        if (this.filterChannels.includes(obj.id)) return
        if (index <= this.active) {
          this.$emit('updateActive', this.active - 1, true)
        }
        // 删除频道
        this.myChannelsList.splice(index, 1)
        if (this.user) {
          // 已登录
          await deleteUserChannel(obj.id)
          try {
          } catch (err) {
            this.$toast('保存失败，请稍后重试')
          }
        } else {
          // 未登录
          setItem('USER_CHANNELS', this.myChannelsList)
        }
      } else {
        // 跳转频道
        this.$emit('updateActive', index, false)
      }
    },
    async addUserChannelFn (obj) {
      this.myChannelsList.push(obj)
      if (this.user) {
        // 已登录
        await addUserChannel({
          id: obj.id,
          seq: this.myChannelsList.length
        })
        try {
        } catch (err) {
          this.$toast('保存失败，请稍后重试')
        }
      } else {
        // 未登录
        setItem('USER_CHANNELS', this.myChannelsList)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.channels-container {
  padding-top: 42.5 * 2px;
  .left {
    display: flex;
    align-items: center;
    .my-channels {
      font-size: 32px;
      margin-right: 20px;
    }
    .text {
      color: #969799;
      font-size: 20px;
      padding-top: 10px;
    }
  }
  .edit {
    height: 24px * 2;
    font-size: 26px;
    color: #f85959;
    border: 1px solid #f85959;
    margin-top: 12px;
  }
  .van-cell::after {
    border-bottom: none;
  }
  /deep/ .channel {
    width: 80px * 2;
    height: 43px * 2;
    .close {
      position: absolute;
      font-size: 28px;
      top: -10px;
      right: -10px;
    }
    .van-grid-item__content {
      background-color: #f4f5f6;
      border: unset;
      white-space: nowrap;
      flex-direction: row;
      justify-content: center;
      .van-grid-item__icon-wrapper {
        display: flex;
        align-items: center;
        position: unset;
      }
      .text,
      .van-icon-plus {
        font-size: 28px;
      }
      .current {
        color: red;
      }
    }
  }
}
</style>
