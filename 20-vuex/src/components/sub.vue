<template>
  <div>
    <span>减法</span>
    <h1>当前最新的count值为：{{count}}</h1>
    <h1>{{$store.getters.showNum}}</h1>
    <h1>{{showNum}}</h1>
    <button @click="subNum">-1</button>
    <button @click="subNumN">-N</button>
    <button @click="subNumD">延迟一秒-1</button>
    <button @click="subNumND">延迟一秒-N</button>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
export default {
  data () {
    return {

    }
  },
  methods: {
    // 加
    ...mapMutations(['sub', 'subN']),
    subNum () {
      this.sub()
    },
    subNumN () {
      this.subN(5)
    },
    ...mapActions(['subAsyncD', 'subAsyncND']),
    // 减
    subNumD () {
      this.subAsyncD()
    },
    subNumND () {
      this.subAsyncND(5)
    }

  },
  computed: {
    ...mapState(['count']),
    ...mapGetters(['showNum'])
  }
}
</script>

<style lang="less" scoped>
</style>
