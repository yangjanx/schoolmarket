// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index'
import VueResource from 'vue-resource'
import { WSAEADDRINUSE } from 'constants'

Vue.config.productionTip = false
Vue.use(VueResource)

router.beforeEach((to, from, next) => {

  if (to.matched.some(m => m.meta.auth)) {

    // 对路由进行验证     
    if (JSON.parse(localStorage.getItem("storeMsg")).isLogin == '1') { // 已经登陆  
      next();  // 正常跳转到你设置好的页面    
    }
    else {
      layer.msg('您还没有登录！',function(){})
    }
  }else {
    next()
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
