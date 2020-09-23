<template>
  <div>
    <h1>子组件</h1>
    <span>子传父-子</span>
    <!-- 双向绑定到sonVal内 -->
    <input type="text"
           v-model="sonVal">
    <!-- 进行传值操作 -->
    <input type="button"
           value="传值到父元素"
           @click="sonClick">
  </div>
</template>

<script>
export default {
  data () {
    return {
      sonVal: 'yes!'
    }
  },
  methods: {
    sonClick () {
      // 利用$emit方法 把子组件的值传递给父元素
      this.$emit('mySonVal', this.sonVal)
    }
  }
}
</script>

<style lang="less" scoped>
</style>
