<template>
  <div id="son">
    <h1>子组件</h1>
    <span>父传子-子</span>
    <p>我是：{{ msg }}</p>
  </div>
</template>

<script>
export default {
  name: 'son',
  props: ['msg'],
  data () {
    return {

    }
  }
}
</script>

<style lang="less" scoped>
</style>
