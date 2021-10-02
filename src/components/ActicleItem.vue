<template>
    <van-cell class="acticle-item">
        <div class="title" slot="title">{{ acticleObj.title }}</div>
        <template #label>
            <div class="photo" v-if="acticleObj.cover.type === 3">
                <van-image
                    class="tree-img"
                    v-for="(img,index) in acticleObj.cover.images"
                    :key="index"
                    :src="img"
                    fit="cover"
                />
            </div>
            <div class="lable">
                <span class="author">{{ acticleObj.aut_name }}</span>
                <span class="comment">{{ acticleObj.comm_count }}评论</span>
                <span class="time">{{ acticleObj.pubdate | relativeTime }}</span>
            </div>
        </template>
        <div slot="default" v-if="acticleObj.cover.type === 1">
            <van-image
                class="one-img"
                :src="acticleObj.cover.images[0]"
                fit="cover"
            />
        </div>
    </van-cell>
</template>

<script>
export default {
  name: 'acticleItem',
  props: {
    acticleObj: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="less" scoped>
.acticle-item {
    .photo {
        display: flex;
        margin: 30px 0;
        .tree-img {
            flex: 1;
            width: 100%;
            height: 156px;
        }
        .tree-img:nth-child(n+2) {
            margin-left: 10px;
        }
    }
    .title {
        margin-bottom: 25px;
    }
    .lable {
        span {
            margin-right: 20px;
        }
    }
    .van-cell__title {
        flex: 2;
    }
    .one-img {
        width: 116px * 2;
        height: 73px * 2;
    }
}
</style>
