import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    // 加
    add (state, step) {
      state.count++
    },
    addN (state, step) {
      state.count += step
    },
    // 减
    sub (state) {
      state.count--
    },
    subN (state, step) {
      state.count -= step
    }
  },
  actions: {
    // 加
    addAsync (context) {
      setTimeout(() => {
        context.commit('add')
      }, 1000)
    },
    addAsyncN (context, step) {
      setTimeout(() => {
        context.commit('addN', step)
      }, 1000)
    },
    // 减
    subAsyncD (context) {
      setTimeout(() => {
        context.commit('sub')
      }, 1000)
    },
    subAsyncND (context, step) {
      setTimeout(() => {
        context.commit('subN', step)
      }, 1000)
    }
  },
  getters: {
    showNum (state) {
      return '当前的值为[' + state.count + ']'
    }
  }
})
