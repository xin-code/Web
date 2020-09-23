<template>
  <div>
    <span>这是一个简单的计算器：</span>
    <myadd></myadd>
    <hr>
    <mysub></mysub>
  </div>
</template>

<script>
import add from '../components/add.vue'
import sub from '../components/sub.vue'

export default {
  data () {
    return {

    }
  },
  components: {
    myadd: add,
    mysub: sub
  }
}
</script>

<style lang="less" scoped>
</style>
