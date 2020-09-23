<template>
  <div id="father">
    <h1>父组件</h1>
    <span>父传子-父</span>
    <input type="text"
           v-model="con">
    <son :msg="con"></son>
  </div>
</template>

<script>
// 引入子组件
import son from '../components/fatherToSonSon.vue'

export default {
  name: 'father',
  components: {
    son
  },
  data () {
    return {
      con: ''
    }
  }
}
</script>

<style lang="less" scoped>
</style>
