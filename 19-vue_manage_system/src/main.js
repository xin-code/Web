import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
// 全局样式表
import './assets/css/global.css'
import './assets/fonts/iconfont.css'
// 发送数据需要axios
import axios from 'axios'
// 导入富文本编辑器
import VueQuillEditor from 'vue-quill-editor'
// 导入富文本对应的样式
import 'quill/dist/quill.core.css' // import styles
import 'quill/dist/quill.snow.css' // for snow theme
import 'quill/dist/quill.bubble.css' // for bubble theme
// 默认地址
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'

// 拦截器
axios.interceptors.request.use((config) => {
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
})

// 全局注册富文本
Vue.use(VueQuillEditor)

// 挂载到拦截器之前添加事件
Vue.prototype.$http = axios
Vue.config.productionTip = false

Vue.filter('dateFormate', function(originDate) {
  const dt = new Date(originDate)
  const year = dt.getFullYear()
  const month = (dt.getMonth() + 1 + '').padStart(2, '0')
  const date = (dt.getDate() + 1 + '').padStart(2, '0')

  const hours = (dt.getHours() + 1 + '').padStart(2, '0')
  const minutes = (dt.getMinutes() + 1 + '').padStart(2, '0')
  const seconds = (dt.getSeconds() + 1 + '').padStart(2, '0')

  return `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`
})

new Vue({
  router,
  render: (h) => h(App)
}).$mount('#app')
