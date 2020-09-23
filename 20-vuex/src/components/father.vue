<template>
  <div>
    <h1>父组件</h1>
    <span>兄弟之间传递</span>
    <brotherone></brotherone>
    <brothertwo></brothertwo>
  </div>
</template>

<script>
import brotherone from '../components/brotherone'
import brothertwo from '../components/brothertwo'

export default {
  data () {
    return {

    }
  },
  components: {
    brotherone,
    brothertwo
  }
}
</script>

<style lang="less" scoped>
</style>
