<template>
  <div>
    <h1>子组件 兄弟2</h1>
    <span>兄弟之间传递</span>
    <p>接收的参数为---{{text}}</p>
  </div>
</template>

<script>
export default {
  data () {
    return {
      text: ''
    }
  },
  mounted () {
    this.$eventBus.$on('brotheronecome', (val) => {
      this.text = val
    })
  }
}
</script>

<style lang="less" scoped>
</style>
