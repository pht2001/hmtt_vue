<template>
    <div class="notfoud-container">
        <div class="img-404"></div>
        <p class="notfound-p">哎呀迷路了...</p>
        <div class="notfound-reason">
            <p>可能的原因：</p>
            <ul>
                <li>原来的页面不存在了</li>
                <li>我们的服务器被外星人劫持了</li>
            </ul>
        </div>
        <div class="notfound-btn-container">
            <router-link class="notfound-btn" to="/">返回首页</router-link>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
* {
    padding: 0;
    margin: 0;
    font-family: 'Microsoft Yahei';
}
body {
    background-color: #fff;
}
.notfoud-container {
    height: 94vh;
    padding-top: 40px * 2;
    background-color: #fff;
    .img-404 {
        height: 155px * 2;
        background: url('~@/assets/404.png') center center no-repeat;
        background-size: 150px * 2 auto;
        margin-bottom: 20px * 2;
    }
    .notfound-p {
        line-height: 22px * 2;
        font-size: 17px * 2;
        padding-bottom: 15px * 2;
        border-bottom: 1px * 2 solid #f6f6f6;
        text-align: center;
        color: #262b31;
    }
    .notfound-reason {
        color: #9ca4ac;
        font-size: 13px * 2;
        line-height: 13px * 2;
        text-align: left;
        width: 210px * 2;
        margin: 0 auto;
        p {
            margin-top: 13px * 2;
        }
        ul {
            li {
                margin-top: 10px * 2;
                margin-left: 36px * 2;
            }
        }
    }
    .notfound-btn-container {
        margin: 40px * 2 auto 0;
        text-align: center;
        .notfound-btn {
            display: inline-block;
            border: 1px * 2 solid #ebedef;
            background-color: #239bf0;
            color: #fff;
            font-size: 15px * 2;
            border-radius: 5px * 2;
            text-align: center;
            padding: 10px * 2;
            line-height: 16px * 2;
            white-space: nowrap;
        }
    }
}

</style>
