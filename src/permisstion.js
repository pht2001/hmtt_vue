import router from '@/router'
import store from '@/store'
import axios from 'axios'

router.beforeEach(async (to, from, next) => {
  const user = store.state.user
  try {
    await axios({
      url: 'http://toutiao-app.itheima.net/v1_0/authorizations',
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${user.refresh_token}`
      }
    })
    if (to.path === '/login') {
      next('/')
    } else {
      next()
    }
  } catch (err) {
    next()
  }
})
