<template>
  <div>
    <span>加法</span>
    <h1>当前最新的count值为：{{$store.state.count}}</h1>
    <button @click="addNum">+1</button>
    <button @click="addNumN">+N</button>
    <button @click="addNumD">延迟一秒+1</button>
    <button @click="addNumNAsync">延迟一秒+N</button>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  methods: {
    addNum () {
      this.$store.commit('add')
    },
    addNumN () {
      this.$store.commit('addN', 5)
    },
    addNumD () {
      this.$store.dispatch('addAsync')
    },
    addNumNAsync () {
      this.$store.dispatch('addAsyncN', 5)
    }
  }
}
</script>

<style lang="less" scoped>
</style>
