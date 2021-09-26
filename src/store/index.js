import Vue from 'vue'
import Vuex from 'vuex'

import { getItem, setItem } from '../utils/storage'

Vue.use(Vuex)
const KEY = 'TOUTIAO_USER'
export default new Vuex.Store({
  state: {
    user: getItem(KEY) // 从浏览器的本地存储中拿user
  },
  mutations: {
    setUser (state, payload) {
      // 把传过来的user存到localStorage和vuex中
      // 因为vuex中的state状态刷新以后就没了 所以需要存到localStorage中
      state.user = payload
      setItem(KEY, payload)
    }
  },
  actions: {
  },
  getters: {
  },
  modules: {
  }
})
