<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar
      class="title"
      left-arrow
      title="黑马头条"
      @click-left="$router.push('/')"
    ></van-nav-bar>
    <!-- /导航栏 -->

    <div class="main-wrap">
      <!-- 加载中 -->
      <div class="loading-wrap" v-if="loading">
        <van-loading color="#3296fa" vertical>加载中</van-loading>
        <div class="all-bottom"></div>
      </div>
      <!-- /加载中 -->

      <!-- 加载完成-文章详情 -->
      <div class="article-detail" v-else-if="acticleObj.title">
        <!-- 文章标题 -->
        <h1 class="article-title">{{ acticleObj.title }}</h1>
        <!-- /文章标题 -->

        <!-- 用户信息 -->
        <van-cell class="user-info" center :border="false">
          <van-image
            class="avatar"
            slot="icon"
            round
            fit="cover"
            :src="acticleObj.aut_photo"
          />
          <div slot="title" class="user-name">{{ acticleObj.aut_name }}</div>
          <div slot="label" class="publish-date">
            {{ acticleObj.pubdate | relativeTime }}
          </div>
          <UserFollow
            v-model="acticleObj.is_followed"
            :autId="acticleObj.aut_id"
          />
        </van-cell>
        <!-- /用户信息 -->

        <!-- 文章内容 -->
        <div
          ref="acticle-content"
          class="article-content markdown-body"
          v-html="acticleObj.content"
        ></div>
        <van-divider>正文结束</van-divider>

        <!-- 评论列表 -->
        <div class="comment-list">
          <CommentList
            :list="commentArr"
            @count="commentCount = $event"
            :source="acticleId.toString()"
            @reply="replyComment"
          />
        </div>
        <!-- /评论列表 -->

        <!-- 底部区域 -->
        <div class="article-bottom">
          <van-button
            @click="isCommentShow = true"
            class="comment-btn"
            type="default"
            round
            size="small"
            >写评论</van-button
          >
          <van-icon
            name="comment-o"
            :badge="commentCount"
            color="#777"
            @click="commentFn"
          />
          <ActicleCollection
            :acticleId="acticleId.toString()"
            v-model="acticleObj.is_collected"
          />
          <ActicleLike
            :acticleId="acticleId.toString()"
            v-model="acticleObj.attitude"
          />
          <van-icon name="share" color="#777777"></van-icon>
        </div>
        <!-- /底部区域 -->

        <!-- 发表评论模块 -->
        <van-popup v-model="isCommentShow" position="bottom">
          <CommentPost
            @postSuccess="onPostSuccessFn"
            :target="acticleId"
            v-if="isCommentShow"
          />
        </van-popup>
        <!-- /发表评论模块 -->
      </div>
      <!-- /加载完成-文章详情 -->

      <!-- 加载失败：404 -->
      <div class="error-wrap" v-else-if="status === 404">
        <van-icon name="failure" />
        <p class="text">该资源不存在或已删除！</p>
        <div class="all-bottom"></div>
      </div>
      <!-- /加载失败：404 -->

      <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
      <div class="error-wrap" v-else>
        <van-icon name="failure" />
        <p class="text">内容加载失败！</p>
        <van-button class="retry-btn" @click="retry">点击重试</van-button>
        <div class="all-bottom"></div>
      </div>
      <!-- /加载失败：其它未知错误（例如网络原因或服务端异常） -->
    </div>
    <!-- 发表评论模块 -->
    <van-popup style="overflow-y: hidden;" v-model="isReplyShow" position="bottom" :style="{height: '90%'}">
      <CommentReply @close="isReplyShow = false" v-if="isReplyShow" :replyObj="replyObj" />
    </van-popup>
    <!-- /发表评论模块 -->
  </div>
</template>

<script>
import { getActiclesDetails } from '@/api/acticle'
import { ImagePreview } from 'vant'
import UserFollow from '@/components/UserFollow'
import ActicleCollection from '@/components/ActicleCollection'
import ActicleLike from '@/components/ActicleLike'
import CommentList from './components/CommentList'
import CommentPost from './components/CommentPost'
import CommentReply from './components/CommentReply'
export default {
  name: 'ActicleIndex',
  data () {
    return {
      acticleObj: {},
      loading: true,
      status: 400,
      commentCount: 0,
      isCommentShow: false,
      commentArr: [],
      isReplyShow: false,
      replyObj: {}
    }
  },
  props: {
    acticleId: {
      type: [Number, String],
      required: true
    }
  },
  async created () {
    this.loadingFn()
  },
  mounted () {},
  updated () {
    const imgs = this.$refs['acticle-content'].querySelectorAll('img')
    const images = []
    imgs.forEach((img, index) => {
      images.push(img.src)
      img.onclick = function () {
        ImagePreview({
          images,
          startPosition: index
        })
      }
    })
  },
  components: {
    UserFollow,
    ActicleCollection,
    ActicleLike,
    CommentList,
    CommentPost,
    CommentReply
  },
  computed: {},
  watch: {},
  methods: {
    async loadingFn () {
      try {
        const { data } = await getActiclesDetails(this.acticleId)
        this.acticleObj = data.data
      } catch (err) {
        if (err.response.status === 404) {
          this.status = 404
          return
        }
        this.$toast('获取文章详情失败')
      } finally {
        this.loading = false
      }
    },
    retry () {
      this.loading = true
      this.loadingFn()
    },
    commentFn () {
      this.$el
        .querySelector('.comment-list')
        .scrollIntoView({ block: 'start', behavior: 'smooth' })
    },
    onPostSuccessFn (newObj) {
      this.commentArr.unshift(newObj)
      this.isCommentShow = false
    },
    replyComment (commentObj) {
      this.isReplyShow = true
      this.replyObj = commentObj
    }
  },
  provide: function () {
    return {
      acticleId: this.acticleId.toString()
    }
  }
}
</script>

<style scoped lang="less">
.article-container {
  .title {
    background-color: #f5f5f5;
    /deep/ .van-icon-arrow-left {
      color: #3c3c3c;
      font-size: 45px;
    }
  }
  .all-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    height: 88px;
    background-color: #fff;
  }
  .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 92px;
    bottom: 88px;
    overflow-y: scroll;
    background-color: #fff;
  }
  .article-detail {
    .article-title {
      font-size: 40px;
      padding: 50px 32px;
      margin: 0;
      color: #3a3a3a;
    }

    .user-info {
      padding: 0 32px;
      .avatar {
        width: 70px;
        height: 70px;
        margin-right: 17px;
      }
      .van-cell__label {
        margin-top: 0;
      }
      .user-name {
        font-size: 24px;
        color: #3a3a3a;
      }
      .publish-date {
        font-size: 23px;
        color: #b7b7b7;
      }
      .follow-btn {
        width: 170px;
        height: 58px;
      }
    }

    .article-content {
      padding: 55px 32px;
      /deep/ p {
        text-align: justify;
      }
    }
  }

  .loading-wrap {
    padding: 200px 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  .error-wrap {
    padding: 200px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    .van-icon {
      font-size: 122px;
      color: #b4b4b4;
    }
    .text {
      font-size: 30px;
      color: #666666;
      margin: 33px 0 46px;
    }
    .retry-btn {
      width: 280px;
      height: 70px;
      line-height: 70px;
      border: 1px solid #c3c3c3;
      font-size: 30px;
      color: #666666;
    }
  }

  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 88px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .comment-btn {
      width: 282px;
      height: 46px;
      border: 2px solid #eeeeee;
      font-size: 30px;
      line-height: 46px;
      color: #a7a7a7;
    }
    .van-icon {
      font-size: 40px;
      .van-info {
        font-size: 16px;
        background-color: #e22829;
      }
    }
  }
}
</style>
