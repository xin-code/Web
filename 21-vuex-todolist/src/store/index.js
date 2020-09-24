import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 所有数据列表
    list: [],
    // 获取新的输入框内的内容
    inputValue: '',
    nextId: 5,
    key: 'all'
  },
  mutations: {
    // 初始化列表 把list.json数据传入
    initList (state, data) {
      state.list = data
    },
    // 输入框双向绑定到inputValue
    toInputValue (state, val) {
      state.inputValue = val
    },
    // 添加数据
    addIteminState (state) {
      const obj = {
        id: state.nextId,
        info: state.inputValue.trim(),
        done: false
      }
      state.list.push(obj)
      state.nextId++
      state.inputValue = ''
    },
    // 删除数据
    removeItem (state, id) {
      const index = state.list.findIndex((x) => x.id === id)
      if (index !== -1) {
        state.list.splice(index, 1)
      }
    },
    // 修改数据
    changeStatus (state, params) {
      const index = state.list.findIndex((x) => x.id === params.id)
      if (index !== -1) {
        state.list[index].done = params.done
      }
    },
    // 清除已完成
    clearDone (state) {
      state.list = state.list.filter((x) => x.done === false)
    },
    // 点击按钮发生变化
    changeKey (state, key) {
      state.key = key
    }
  },
  actions: {
    getList (context) {
      axios.get('./list.json').then(({ data }) => {
        console.log(data)
        context.commit('initList', data)
      })
    }
  },
  getters: {
    // 未完成的数量
    unDoneLength (state) {
      return state.list.filter((x) => x.done === false).length
    },
    // 点击按钮实现不同的内容
    infoBtnview (state) {
      if (state.key === 'all') {
        return state.list
      }
      if (state.key === 'undone') {
        return state.list.filter((x) => x.done === false)
      }
      if (state.key === 'done') {
        return state.list.filter((x) => x.done === true)
      }
      return state.list
    }
  },
  modules: {}
})
