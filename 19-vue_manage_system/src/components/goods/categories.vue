<template>
  <div>
    <!-- 面包屑导航栏 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品分类</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片 -->
    <el-card>
      <!-- 添加分类 -->
      <el-row>
        <el-button type="primary">添加分类</el-button>
      </el-row>
      <!-- 表格部分 -->
      <tree-table :data="catList"
                  :columns="columns"
                  :show-index="true"
                  index-text="#"
                  :selection-type="false"
                  :expand-type="false"
                  class="treetable">
        <!-- 自定义模板渲染__是否有效 -->
        <template slot="isok"
                  slot-scope="scope">
          <i class="el-icon-success"
             style="color:lightgreen"
             v-if="scope.row.cat_deleted===false"></i>
          <i class="el-icon-error"
             style="color:red"
             v-else></i>
        </template>

        <!-- 自定义模板渲染__排序 -->
        <template slot="level"
                  slot-scope="scope">
          <el-tag size="mini"
                  v-if="scope.row.cat_level ===0">一级</el-tag>
          <el-tag size="mini"
                  type="success"
                  v-else-if="scope.row.cat_level ===1">二级</el-tag>
          <el-tag size="mini"
                  type="warning"
                  v-else>三级</el-tag>
        </template>

        <!-- 自定义模板渲染__操作 -->
        <template slot="opt">
          <el-button icon="el-icon-edit"
                     type="primary"
                     size="mini">操作</el-button>
          <el-button icon="el-icon-delete"
                     type="danger"
                     size="mini">删除</el-button>
        </template>

      </tree-table>
      <!-- 分页 -->
      <el-pagination @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
                     :current-page="queryInfo.pagenum"
                     :page-sizes="[5, 10, 15, 20]"
                     :page-size="queryInfo.pagesize"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="total">
      </el-pagination>

    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 查询条件
      queryInfo: {
        type: 3,
        pagenum: 1,
        pagesize: 5
      },
      // 商品列表
      catList: [],
      // 默认总数
      total: 0,
      // 每列
      columns: [{
        label: '分类名称',
        prop: 'cat_name'
      }, {
        label: '是否有效',
        prop: 'cat_deleted',
        type: 'template',
        // 表示模板的名称
        template: 'isok'
      }, {
        label: '排序',
        prop: 'cat_level',
        type: 'template',
        template: 'level'
      }, {
        label: '操作',
        type: 'template',
        template: 'opt'
      }]

    }
  },
  created () {
    this.getCatList()
  },
  methods: {
    async getCatList () {
      const { data: res } = await this.$http.get('categories', { params: this.queryInfo })
      if (res.meta.status !== 200) return this.$message.error('请求商品分类失败！')
      this.catList = res.data.result
      this.total = res.data.total
    },
    // 监听pagesize改变
    handleSizeChange (newSize) {
      this.queryInfo.pagesize = newSize
      this.getCatList()
    },
    // 监听pagenum改变
    handleCurrentChange (newNum) {
      this.queryInfo.pagenum = newNum
      this.getCatList()
    }
  }
}
</script>

<style lang="less" scoped>
.treetable {
  margin-top: 15px;
  margin-bottom: 15px;
}
</style>
