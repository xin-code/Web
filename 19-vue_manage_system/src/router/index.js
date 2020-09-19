import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../components/login.vue'
import home from '../components/home.vue'
import welcome from '../components/welcome.vue'
import users from '../components/user/users.vue'
import rights from '../components/power/rights.vue'
import roles from '../components/power/roles.vue'
import categories from '../components/goods/categories.vue'
import params from '../components/goods/params.vue'
import goods from '../components/goods/goods.vue'
import addGoods from '../components/goods/add.vue'
import orders from '../components/order/orders.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: login },
  {
    path: '/home',
    component: home,
    redirect: '/welcome',
    children: [
      { path: '/welcome', component: welcome },
      { path: '/users', component: users },
      { path: '/rights', component: rights },
      { path: '/roles', component: roles },
      { path: '/categories', component: categories },
      { path: '/params', component: params },
      { path: '/goods', component: goods },
      { path: '/goods/add', component: addGoods },
      { path: '/orders', component: orders }
    ]
  }
]

const router = new VueRouter({
  routes
})

// 为路由对象添加beforeEach导航守卫
router.beforeEach((to, from, next) => {
  // 如果用户从登录页登陆，直接放行
  if (to.path === '/login') return next()
  // 从sessionStroage中获取token值
  const tk = window.sessionStorage.getItem('token')
  // 没有token值，强制跳转到登录页
  if (!tk) return next('/login')
  next()
})

export default router
