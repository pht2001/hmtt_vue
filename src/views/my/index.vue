<template>
  <div class="my-container">
    <!-- 已登录头部 -->
    <div v-if="user" class="header">
      <div class="user-info">
        <div class="left">
          <van-image
            class="avatar"
            fit="cover"
            round
            :src="userObj.photo"
          />
          <p class="name">{{ userObj.name }}</p>
        </div>
        <div class="right">
          <van-button round class="edit-data" type="default">编辑资料</van-button>
        </div>
      </div>
      <div class="user-state">
        <div class="user-state-item">
          <span class="count">{{ userObj.art_count }}</span>
          <span class="text">头条</span>
        </div>
        <div class="user-state-item">
          <span class="count">{{ userObj.follow_count }}</span>
          <span class="text">关注</span>
        </div>
        <div class="user-state-item">
          <span class="count">{{ userObj.fans_count }}</span>
          <span class="text">粉丝</span>
        </div>
        <div class="user-state-item">
          <span class="count">{{ userObj.like_count }}</span>
          <span class="text">获赞</span>
        </div>
      </div>
    </div>
    <!-- /已登录头部 -->
    <!-- 未登录头部 -->
    <div v-else @click="$router.push({name: 'login'})" class="login-header">
      <div class="mobile"></div>
      <span class="text">登录 / 注册</span>
    </div>
    <!-- /未登录头部 -->
    <!-- 收藏和历史 -->
    <van-grid :column-num="2" clickable class="hobby">
      <van-grid-item text="收藏" >
        <i slot="icon" class="iconfont icon-shoucang"></i>
      </van-grid-item>
      <van-grid-item text="历史" >
        <i slot="icon" class="iconfont icon-lishi"></i>
      </van-grid-item>
    </van-grid>
    <!-- /收藏和历史 -->
    <!-- cell 栏 -->
    <div class="user-cell">
      <van-cell title="消息通知" is-link />
      <van-cell title="小智同学" is-link />
    </div>
    <!-- /cell 栏 -->
    <!-- 退出登录 -->
    <van-button @click="onLogout" v-show="user" class="logout">退出登录</van-button>
    <!-- /退出登录 -->
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getUserInfo } from '@/api/user'
export default {
  name: 'myIndex',
  computed: {
    ...mapState(['user'])
  },
  data () {
    return {
      userObj: {}
    }
  },
  async created () {
    if (this.user) {
      try {
        const { data: { data } } = await getUserInfo()
        this.userObj = data
      } catch (err) {
        if (err.response && err.response.status !== 401) {
          this.$toast('获取用户基本信息失败，请稍后重试')
        }
      }
    }
  },
  methods: {
    onLogout () {
      this.$dialog.confirm({
        message: '确定要退出吗',
        theme: 'round-button'
      })
        .then(() => {
          this.$store.commit('setUser', null)
          this.$toast.success('退出成功')
        })
        .catch(() => {})
    }
  }
}
</script>

<style lang="less" scoped>
.my-container {
  .header {
    height: 360px;
    background: url('~@/assets/banner.png') no-repeat;
    background-size: cover;
    .user-info {
      height: 230px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 76px 32px 23px;
      box-sizing: border-box;
      .left {
        display: flex;
        align-items: center;
        .avatar {
          width: 142px;
          height: 142px;
          border: 5px solid #fff;
          margin-right: 23px;
        }
        .name {
          font-size: 35px;
          color: #fff;
        }
      }
      .right {
        .edit-data {
          width: 116px;
          height: 48px;
          padding: 0;
          font-size: 20px;
        }
      }
    }
    .user-state {
      height: 130px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      color: #fff;
      font-size: 30px;
      .user-state-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        .text {
          font-size: 25px;
        }
      }
    }
  }
  .login-header {
    height: 360px;
    background: url('~@/assets/banner.png') no-repeat;
    background-size: cover;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .mobile {
      width: 132px;
      height: 132px;
      margin-bottom: 15px;
      background: url('~@/assets/mobile.png');
      background-size: cover;
    }
    .text {
      color: #fff;
      font-size: 30px;
    }
  }
  .hobby {
    .iconfont {
      font-size: 45px;
    }
    .icon-shoucang {
      color: #eb5253;
    }
    .icon-lishi {
      color: #ff9d1d;
    }
    /deep/ .van-grid-item__text {
      font-size: 28px;
    }
  }
  .user-cell {
    margin: 10px 0;
  }
  .logout {
    width: 100%;
    color: #d86262;
  }
}
</style>
