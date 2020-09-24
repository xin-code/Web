<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>欢迎页</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <h1>你好！admin 管理员！</h1>
    </el-card>
  </div>
</template>

<script>
export default {

}
</script>

<style>
</style>
