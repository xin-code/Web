<template>
  <div>
    <h1>子组件 兄弟1</h1>
    <span>兄弟之间传递---</span>
    <input type="text"
           v-model="con"
           @change="handleChange(con)">
  </div>
</template>

<script>
export default {
  data () {
    return {
      con: ''
    }
  },
  methods: {
    handleChange (val) {
      this.$eventBus.$emit('brotheronecome', this.con)
    }
  }
}
</script>

<style lang="less" scoped>
</style>
