import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false
Vue.prototype.$eventBus = new Vue()

new Vue({
  render: (h) => h(App),
  router,
  store
}).$mount('#app')
