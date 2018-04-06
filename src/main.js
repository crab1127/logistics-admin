import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import i18n from './lang'
import router from './router'
import store from './store'
import '@/icons' // icon
// import '@/permission' // 权限

Vue.use(ElementUI, {
  i18n: (key, value) => i18n.t(key, value)
})

Vue.config.errorHandler = (err, vm, info) => {
  console.log(err, info)
}

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  template: '<App/>',
  components: { App }
})
