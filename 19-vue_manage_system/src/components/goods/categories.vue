<template>
  <div>
    <!-- 面包屑导航栏 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品分类</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片 -->
    <el-card>
      <!-- 添加分类 -->
      <el-row>
        <el-button type="primary"
                   @click="addCatDialog">添加分类</el-button>
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

      <!-- 添加分类对话框 -->
      <el-dialog title="添加分类"
                 :visible.sync="showAddCatDialog"
                 width="50%"
                 @close="closeAddCatDialog">
        <!-- 表格区域 -->
        <el-form :model="addCatForm"
                 :rules="addCatRules"
                 ref="addCatRefs">
          <!-- 表格第一部分-分类名称 -->
          <el-form-item label="分类名称："
                        label-width="100px"
                        prop="cat_name">
            <!-- 此处的prop指的是验证规则名cat_name -->
            <el-input v-model="addCatForm.cat_name"></el-input>
          </el-form-item>
          <!-- 表格第二部分-父级分类 -->
          <el-form-item label="父级分类："
                        label-width="100px">
            <!-- options用来指定数据源 -->
            <!-- props用来指定配置对象 -->
            <el-cascader v-model="cascaderSaveData"
                         :options="parentCatList"
                         :props="cascaderProps"
                         @change="parentCatChange"
                         clearable
                         change-on-select></el-cascader>
          </el-form-item>
        </el-form>
        <span slot="footer"
              class="dialog-footer">
          <el-button @click="showAddCatDialog = false">取 消</el-button>
          <el-button type="primary"
                     @click="submitAddCatDialog">确 定</el-button>
        </span>
      </el-dialog>

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
      }],
      // 添加分类对话框
      showAddCatDialog: false,
      // 添加分类表格
      addCatForm: {
        // 分类父 ID
        cat_pid: 0,
        // 分类名称
        cat_name: '',
        // 分类层级 0默认分类为一级分类
        cat_level: 0
      },
      addCatRules: {
        cat_name:
          [{ required: true, message: '请输入分类名称', trigger: 'blur' }, { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }]
      },
      // 所有二、三级父级节点
      parentCatList: [],
      // Props用来指定配置对象
      cascaderProps: {
        expandTrigger: 'hover',
        label: 'cat_name',
        value: 'cat_id',
        children: 'children'
      },
      // 用来存储选择的内容，选中父级的ID数组
      cascaderSaveData: []

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
    },
    // 添加分类窗口
    addCatDialog () {
      // 在打开分类窗口前进行获取数据
      this.getParentCatList()
      this.showAddCatDialog = true
    },
    // 关闭添加分类窗口的时候 重置表单
    closeAddCatDialog () {
      this.$refs.addCatRefs.resetFields()
      this.cascaderSaveData = []
      this.addCatForm.cat_pid = 0
      this.addCatForm.cat_level = 0
    },
    // 获取父级一、二级节点
    async getParentCatList () {
      const { data: res } = await this.$http.get('categories', { params: { type: 2 } })
      if (res.meta.status !== 200) { return this.$message.error('获取父级节点失败！') }
      this.parentCatList = res.data
    },
    // 当级联选择器改变时，触发的函数
    parentCatChange () {
      // 当选择器发生改变的时候，就进行判断
      if (this.cascaderSaveData.length > 0) {
        // ID
        this.addCatForm.cat_pid = this.cascaderSaveData[this.cascaderSaveData.length - 1]
        // 当前等级
        this.addCatForm.cat_level = this.cascaderSaveData.length
      } else {
        // ID
        this.cascaderSaveData.cat_pid = 0
        // 当前等级
        this.cascaderSaveData.cat_level = 0
      }
    },
    // 点击 添加分类 确认 按钮
    submitAddCatDialog () {
      this.$refs.addCatRefs.validate(async valid => {
        if (!valid) return
        const { data: res } = await this.$http.post('categories', this.addCatForm)
        console.log(res)
        if (res.meta.status !== 201) { return this.$message.error('添加分类失败！') }
        this.$message.success('添加分类成功')
        this.getCatList()
        this.showAddCatDialog = false
      })
    }
  }
}
</script>

<style lang="less" scoped>
.treetable {
  margin-top: 15px;
  margin-bottom: 15px;
}
.el-cascader {
  width: 100%;
}
</style>
