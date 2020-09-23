import Vue from 'vue'
import VueRouter from 'vue-router'
import fatherToSonFather from '../components/fatherToSonFather.vue'
import fatherToSonSon from '../components/fatherToSonSon.vue'
import singlePageApplication from '../components/singlePageApplication.vue'
import sonToFatherFather from '../components/sonToFatherFather.vue'
import sonToFatherSon from '../components/sonToFatherSon.vue'
import father from '../components/father.vue'
import brotherone from '../components/brotherone.vue'
import brothertwo from '../components/brothertwo.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/fatherToSonFather' },
  { path: '/fatherToSonFather', component: fatherToSonFather },
  { path: '/fatherToSonSon', component: fatherToSonSon },
  { path: '/singlePageApplication', component: singlePageApplication },
  { path: '/sonToFatherFather', component: sonToFatherFather },
  { path: '/sonToFatherSon', component: sonToFatherSon },
  { path: '/father', component: father },
  { path: '/brotherone', component: brotherone },
  { path: '/brothertwo', component: brothertwo }
]

const router = new VueRouter({
  routes
})

export default router
