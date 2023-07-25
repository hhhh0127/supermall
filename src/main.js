import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'

import VueLazyLoad from 'vue-lazyload'

import toast from 'components/common/toast'

Vue.config.productionTip = false

Vue.prototype.$bus = new Vue()

// 安装toast插件
Vue.use(toast)

// 使用懒加载的插件
Vue.use(VueLazyLoad)

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
