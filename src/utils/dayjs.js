import dayjs from 'dayjs'
import Vue from 'vue'
import relativeTime from 'dayjs/plugin/relativeTime'

import 'dayjs/locale/zh-cn'
dayjs.locale('zh-cn') // 全局使用简体中文

dayjs.extend(relativeTime)

Vue.filter('relativeTime', (value) => {
  return dayjs().to(dayjs(value))
})
