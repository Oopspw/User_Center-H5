// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import store from './vuex/store'
import xmlHttp from 'common/xmlhttp'
import MintUI from 'mint-ui'
Vue.use(Vuex)
Vue.use(xmlHttp)
Vue.use(MintUI)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
// 注册标题更换全局指令
Vue.directive('title', {
  inserted (el, binding) {
    document.title = binding.value
    const iframe = document.createElement('iframe')
    iframe.style.cssText = 'display: none; width: 0; height: 0;'
    const listener = () => {
      setTimeout(() => {
        iframe.removeEventListener('load', listener)
        setTimeout(() => {
          document.body.removeChild(iframe)
        }, 0)
      }, 0)
    }
    iframe.addEventListener('load', listener)
    document.body.appendChild(iframe)
  }
})
