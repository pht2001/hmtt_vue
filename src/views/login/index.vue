<template>
  <div class="login-container">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      title="登录"
      left-arrow
      @click-left="onClickLeft"
    />

    <!-- 用户名和验证码 -->
    <van-form @submit="onSubmit">
      <van-field
        v-model.trim="mobile"
        name="mobile"
        maxlength="11"
        placeholder="请输入手机号"
        autocomplete="off"
      >
        <template #left-icon>
          <i class="iconfont icon-shouji"></i>
        </template>
      </van-field>
      <van-field
        v-model.trim="code"
        type="number"
        maxlength="6"
        name="code"
        placeholder="请输入验证码"
        autocomplete="on"
      >
        <template #left-icon>
          <i class="iconfont icon-yanzhengma"></i>
        </template>
        <template #button>
          <van-count-down v-if="countDown" :time="60 * 1000" format="ss s" />
          <van-button
            v-else
            native-type="button"
            size="small"
            type="primary"
            @click="sendBtn"
          >获取验证码</van-button>
        </template>
      </van-field>
      <div class="submitBtn">
        <van-button block type="info" native-type="submit"
          >登录</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { sendCode, login } from '@/api/user'
export default {
  name: 'login',
  data () {
    return {
      mobile: '18569017217', // 手机号
      code: '246810', // 验证码
      countDown: false // 控制倒计时器
      // vant组件提供的验证模式
      // userFormRules: {
      //   mobileR: [
      //     {
      //       required: true,
      //       message: '请填写手机号'
      //     },
      //     {
      //       pattern: /^1[3|4|5|6|7|8|9][0-9]{9}$/,
      //       message: '手机号格式错误'
      //     }
      //   ],
      //   codeR: [
      //     {
      //       required: true,
      //       message: '请填写验证码'
      //     },
      //     {
      //       pattern: /^[0-9]{6}$/,
      //       message: '验证码必须为6位'
      //     },
      //   ]
      // }
    }
  },
  methods: {
    onClickLeft () {
      this.$router.push({
        name: 'my'
      })
    },
    async onSubmit () {
      // 验证手机号的正则表达式
      const mobileReg = /^1[3|4|5|6|7|8|9][0-9]{9}$/
      // 验证验证码的正则表达式
      const codeReg = /^[0-9]{6}$/
      if (this.mobile.length <= 0) return this.$toast('手机号不能为空')
      if (!mobileReg.test(this.mobile)) return this.$toast('手机号格式错误')
      if (this.code.length <= 0) return this.$toast('验证码不能为空')
      if (!codeReg.test(this.code)) return this.$toast('验证码必须为6位')
      // 发送请求,拿到token
      this.$toast.loading({
        message: '登录中...',
        forbidClick: true,
        duration: 0
      })
      try {
        const { data } = await login({
          mobile: this.mobile,
          code: this.code
        })
        this.$store.commit('setUser', data.data)
        this.$toast.success('登录成功')
        this.$router.push({
          name: 'my'
        })
      } catch (err) {
        this.$toast.fail('登录失败，请稍后重试')
      }
    },
    async sendBtn () {
      // 验证手机号的正则表达式
      const mobileReg = /^1[3|4|5|6|7|8|9][0-9]{9}$/
      if (this.mobile.length <= 0) return this.$toast('手机号不能为空')
      if (!mobileReg.test(this.mobile)) return this.$toast('手机号格式错误')
      // 发送验证码，同时实现倒计时效果
      try {
        await sendCode(this.mobile)
        this.$toast('发送成功')
        this.countDown = true
      } catch (err) {
        if (!err.response || err.response.status === 429) {
          this.$toast('发送频繁，请稍后重试')
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.login-container {
  .iconfont {
    font-size: 36px;
    margin-right: 10px;
  }
  .submitBtn {
    padding: 53px 33px;
    .van-button {
      background-color: #6db4fb;
      border: none;
      border-radius: 10px;
    }
  }
  .van-cell__value {
    .van-field__button {
      .van-button {
        background-color: #ededed;
        border: 0;
        color: #666;
        width: 152px;
        height: 46px;
        border-radius: 20px;
      }
    }
  }
}
</style>
