<template>
  <div>
    <h1>父组件</h1>
    <span>子传父-父</span>
    <input type="text"
           v-model="con">
    <son :val="name"
         @mySonVal="fatherHandle"></son>
  </div>
</template>

<script>
// 导入子组件
import son from '../components/sonToFatherSon'
export default {
  data () {
    return {
      con: ''
    }
  },
  components: {
    son
  },
  methods: {
    fatherHandle (con) {
      this.con = con
    }
  }

}
</script>

<style lang="less" scoped>
</style>
