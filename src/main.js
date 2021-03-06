import Vue from 'vue'
import App from './App.vue'
import router from './router'
import '@/permisstion'
import store from './store'
import '@/utils/dayjs'
import './styles/github-markdown.css'

// 导入全局样式
import './styles/index.less'

// 引入 amfe-flexible
import 'amfe-flexible'

// 导入vant组件库
import Vant from 'vant'
import 'vant/lib/index.css'

Vue.use(Vant)

Vue.prototype.console = window.console

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
