<template>
  <div>
    <!-- 面包屑导航栏 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片区域 -->
    <el-card>
      <!-- 搜索框 -->
      <el-row>
        <el-col :span="8">
          <el-input placeholder="请输入内容"
                    v-model="queryInfo.query"
                    clearable
                    @clear="getGoodsList"
                    @change="getGoodsList">
            <el-button slot="append"
                       icon="el-icon-search"
                       @click="getGoodsList"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4"
                class="addGoods">
          <el-button type="primary"
                     @click="goAddGoodPage">添加商品</el-button>
        </el-col>
      </el-row>
      <!-- 表格区域 -->
      <el-table :data="goodsList"
                style="width: 100%"
                border
                stripe>
        <!-- 索引列 -->
        <el-table-column type="index"
                         label="#"></el-table-column>
        <el-table-column prop="goods_name"
                         label="商品名称"
                         width="620">
        </el-table-column>
        <el-table-column prop="goods_price"
                         label="商品价格">
        </el-table-column>
        <el-table-column prop="goods_weight"
                         label="商品重量">
        </el-table-column>
        <el-table-column prop="add_time"
                         label="创建时间"
                         width="180px">
          <template slot-scope="scope">
            {{scope.row.add_time | dateFormate}}
          </template>
        </el-table-column>
        <el-table-column label="操作"
                         width="180px">
          <template slot-scope="scope">
            <!-- 修改 -->
            <el-tooltip class="item"
                        effect="dark"
                        content="修改"
                        placement="top"
                        :enterable="false">
              <el-button icon="el-icon-edit"
                         type="primary"
                         size="mini"></el-button>
            </el-tooltip>
            <!-- 删除 -->
            <el-tooltip class="item"
                        effect="dark"
                        content="删除"
                        placement="top"
                        :enterable="false">
              <el-button icon="el-icon-delete"
                         type="danger"
                         size="mini"
                         @click="deleteGoods(scope.row.goods_id)"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination @size-change="paginationSizeChange"
                     @current-change="paginationNumChange"
                     :current-page="queryInfo.pagenum"
                     :page-sizes="[5, 10, 15, 20]"
                     :page-size="queryInfo.pagesize"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="total"
                     background>
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 查询参数对象，需要传递的参数
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 10
      },
      // 商品列表
      goodsList: [],
      // 商品总数 分页需要
      total: 0

    }
  },
  created () {
    this.getGoodsList()
  },
  methods: {
    // 当页面加载完成，调取商品列表
    async getGoodsList () {
      // 因为获取商品列表需要 把需要的查询参数queryInfo传递给请求内
      const { data: res } = await this.$http.get('goods', { params: this.queryInfo })
      if (res.meta.status !== 200) { return this.$message.error('商品列表加载失败！') }
      this.goodsList = res.data.goods
      this.total = res.data.total
    },
    // 分页 每页条数 发生变化触发这个函数
    paginationSizeChange (newSize) {
      this.queryInfo.pagesize = newSize
      this.getGoodsList()
    },
    // 分页 当前页码值 发生变化触发这个函数
    paginationNumChange (newPageNum) {
      this.queryInfo.pagenum = newPageNum
      this.getGoodsList()
    },
    // 删除商品
    async deleteGoods (id) {
      const confirmResult = await this.$confirm('此操作将永久删除该商品, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)

      if (confirmResult === 'confirm') {
        const { data: res } = await this.$http.delete(`goods/${id}`)
        if (res.meta.status !== 200) { return this.$message.error('删除商品失败！') }
        this.$message.success('删除商品成功！')
        this.getGoodsList()
      }
      this.$message.info('用户取消了删除操作！')
    },
    // 添加商品 通过路由导航去别的页面
    goAddGoodPage () {
      this.$router.push('goods/add')
    }
  }

}
</script>

<style lang="less" scoped>
.addGoods {
  margin-left: 15px;
}
</style>
