<template>
  <div>
    <!-- 面包屑导航栏 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>参数列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片 -->
    <el-card>
      <!-- 警告框 -->
      <el-alert title="注意：只允许为三级分类设置相关参数！"
                type="warning"
                show-icon>
      </el-alert>
      <!-- 选择商品分类 -->
      <el-row>
        <el-col>
          <span>选择商品分类：</span>
          <!-- options 指定数据源 就是catList -->
          <el-cascader v-model="catSelectedList"
                       :options="catList"
                       :props="catProps"
                       @change="catSelectChange"
                       clearable></el-cascader>
        </el-col>
      </el-row>
      <!-- tab切换页 -->
      <el-tabs v-model="activeName"
               @tab-click="tabClick">
        <el-tab-pane label="动态参数"
                     name="many">
          <el-button type="primary"
                     :disabled="isBtnDisable"
                     @click="showParamsDialog = true">添加参数</el-button>
          <!-- 动态参数表格 -->
          <el-table :data="manyTableData"
                    border
                    stripe>
            <!-- 展开行 -->
            <el-table-column type="expand">
              <template slot-scope="scope">
                <!-- 循环渲染tag标签 -->
                <el-tag v-for=" (item,index) in scope.row.attr_vals"
                        :key="index"
                        closable
                        @close="removeTag(index,scope.row)">{{item}}</el-tag>
                <!-- 输入文本框 -->
                <el-input v-if="scope.row.inputVisible"
                          v-model="scope.row.inputValue"
                          ref="saveTagInput"
                          size="small"
                          @keyup.enter.native="handleInputConfirm(scope.row)"
                          @blur="handleInputConfirm(scope.row)"
                          class="input-new-tag">
                </el-input>
                <!-- 添加按钮 -->
                <el-button v-else
                           size="small"
                           @click="showInput(scope.row)"
                           class="input-new-button">+ New Tag</el-button>
              </template>
            </el-table-column>
            <!-- 索引列 -->
            <el-table-column type="index"></el-table-column>
            <el-table-column label="参数名称"
                             prop="attr_name"></el-table-column>
            <el-table-column label="操作">
              <!-- 作用域插槽 接收数据-->
              <template slot-scope="scope">
                <el-button type="primary"
                           icon="el-icon-edit"
                           size="mini"
                           @click="editParamsDialog(scope.row.attr_id)">修改</el-button>
                <el-button type="danger"
                           icon="el-icon-delete"
                           size="mini"
                           @click="deleteParams(scope.row.attr_id)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>

        <el-tab-pane label="静态属性"
                     name="only">
          <el-button type="primary"
                     :disabled="isBtnDisable"
                     @click="showParamsDialog = true">添加属性</el-button>
          <!-- 静态属性表格 -->
          <el-table :data="onlyTableData"
                    border
                    stripe>
            <!-- 展开行 -->
            <el-table-column type="expand">
              <template slot-scope="scope">
                <!-- 循环渲染tag标签 -->
                <el-tag v-for=" (item,index) in scope.row.attr_vals"
                        :key="index"
                        closable
                        @close="removeTag(index,scope.row)">{{item}}</el-tag>
                <!-- 输入文本框 -->
                <el-input v-if="scope.row.inputVisible"
                          v-model="scope.row.inputValue"
                          ref="saveTagInput"
                          size="small"
                          @keyup.enter.native="handleInputConfirm(scope.row)"
                          @blur="handleInputConfirm(scope.row)"
                          class="input-new-tag">
                </el-input>
                <!-- 添加按钮 -->
                <el-button v-else
                           size="small"
                           @click="showInput(scope.row)"
                           class="input-new-button">+ New Tag</el-button>
              </template>
            </el-table-column>
            <!-- 索引列 -->
            <el-table-column type="index"></el-table-column>
            <el-table-column label="属性名称"
                             prop="attr_name"></el-table-column>
            <el-table-column label="操作">
              <!-- 作用域插槽 接收数据-->
              <template slot-scope="scope">
                <el-button type="primary"
                           icon="el-icon-edit"
                           size="mini"
                           @click="editParamsDialog(scope.row.attr_id)">修改</el-button>
                <el-button type="danger"
                           icon="el-icon-delete"
                           size="mini"
                           @click="deleteParams(scope.row.attr_id)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </el-card>

    <!-- 点击添加参数按钮 弹出Dialog -->
    <el-dialog :title="'添加'+showDialogTitle"
               :visible.sync="showParamsDialog"
               width="50%"
               @close="closeAddDialog">
      <!-- 添加参数的表单区域 -->
      <el-form :model="addParamsForm"
               :rules="addParamsRules"
               ref="addParamsRefs"
               label-width="100px">
        <el-form-item :label="showDialogTitle"
                      prop="attr_name">
          <el-input v-model="addParamsForm.attr_name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="showParamsDialog = false">取 消</el-button>
        <el-button type="primary"
                   @click="submitAddParamsDialog">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 点击表单内修改按钮 弹出Dialog -->
    <el-dialog :title="'修改'+showDialogTitle"
               :visible.sync="showEditParamsDialog"
               width="50%"
               @close="closeEditDialog">
      <!-- 添加参数的表单区域 -->
      <el-form :model="editParamsForm"
               :rules="editParamsRules"
               ref="editParamsRefs"
               label-width="100px">
        <el-form-item :label="showDialogTitle"
                      prop="attr_name">
          <el-input v-model="editParamsForm.attr_name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button @click="showEditParamsDialog = false">取 消</el-button>
        <el-button type="primary"
                   @click="submitEditParamsDialog">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
export default {
  data () {
    return {
      // 所有商品分类
      catList: [],
      // 选择框内选择的值放在数组中
      catSelectedList: [],
      // 配置级联选择框
      catProps: {
        expandTrigger: 'hover',
        value: 'cat_id',
        label: 'cat_name',
        children: 'children'
      },
      // 被激活的页签
      activeName: 'many',
      // 动态参数的数据
      manyTableData: [],
      // 静态属性的数据
      onlyTableData: [],
      // 控制添加Dialog的显示与隐藏
      showParamsDialog: false,
      // 控制修改Dialog的显示与隐藏
      showEditParamsDialog: false,
      // 表单区域中的需要添加的表单内容
      addParamsForm: {},
      // 表单区域中的规则
      addParamsRules: {
        attr_name: [
          { required: true, message: '请输入参数名称', trigger: 'blur' }, { min: 2, max: 15, message: '长度在 2 到 15 个字符', trigger: 'blur' }]
      },
      // 修改表单内容
      editParamsForm: {},
      // 修改时的验证规则
      editParamsRules: {
        attr_name: [
          { required: true, message: '请输入参数名称', trigger: 'blur' }, { min: 2, max: 15, message: '长度在 2 到 15 个字符', trigger: 'blur' }]
      }
    }
  },
  created () {
    this.getParamsForm()
  },
  methods: {
    // 获取所有数据 -传给级联选择器
    async getParamsForm () {
      const { data: res } = await this.$http.get('categories')
      if (res.meta.status !== 200) { return this.$message.error('获取商品分类失败') }
      this.catList = res.data
      // 级联选择器输出结构
      // console.log(this.catList)
    },
    // 级联选择发生改变时触发
    catSelectChange () {
      this.getCatParams()
    },
    // 页签 点击事件
    tabClick () {
      this.getCatParams()
      // 改变页签的时候，名字激活
      // console.log(this.activeName)
    },
    // 获取数据 这个函数需要被重复调用，所以写一个全新的函数
    async getCatParams () {
      // 证明选择的不是三级分类
      if (this.catSelectedList.length !== 3) {
        this.catSelectedList = []
        this.manyTableData = []
        this.onlyTableData = []
        return
      }
      // 可以正常获得点击级联选择器时候 数组中储存该项的值
      // console.log(this.catSelectedList)
      // 可以打印出来分类 ID 返回数组中的最后以为字符
      // console.log(this.cateId)
      // 不符合上面情况的话，那么就是下面的情况 属于三级分类 则继续执行
      const { data: res } = await this.$http.get(`categories/${this.cateId}/attributes`, { params: { sel: this.activeName } })
      // console.log(res)
      if (res.meta.status !== 200) { return this.$message.error('获取参数列表失败！') }

      // 把attr_vals循环取出来由字符串变成数组(以空格分割)的形式
      res.data.forEach(item => {
        item.attr_vals = item.attr_vals ? item.attr_vals.split(' ') : []
        // 控制显示输入框的显示与隐藏
        item.inputVisible = false
        // 文本框中输入的内容
        item.inputValue = ''
      })

      // 因为渲染不同的表格 需要进行判断是那个
      if (this.activeName === 'many') {
        this.manyTableData = res.data
      } else {
        this.onlyTableData = res.data
      }
    },
    // 关闭添加对话框重置内容
    closeAddDialog () {
      this.$refs.addParamsRefs.resetFields()
    },
    // 关闭修改对话框重置内容
    closeEditDialog () {
      this.$refs.editParamsRefs.resetFields()
    },
    // 添加参数中提交按钮
    submitAddParamsDialog () {
      this.$refs.addParamsRefs.validate(async valid => {
        if (!valid) { return this.$message.error('输入错误，请重新输入！') }
        const { data: res } = await this.$http.post(`categories/${this.cateId}/attributes`, { attr_name: this.addParamsForm.attr_name, attr_sel: this.activeName })
        if (res.meta.status !== 201) { return this.$message.error('提交参数失败！') }
        this.$message.success('提交参数成功！')
        this.getCatParams()
      })

      this.showParamsDialog = false
    },
    // 表单内进行修改数据
    async editParamsDialog (attrid) {
      const { data: res } = await this.$http.get(`categories/${this.cateId}/attributes/${attrid}`)
      if (res.meta.status !== 200) { return this.$message.error('修改数据失败！') }
      this.editParamsForm = res.data
      // 点击修改按钮显示对话框
      this.showEditParamsDialog = true
    },
    // 表单内 修改按钮进行确定操作
    submitEditParamsDialog () {
      // 预校验
      this.$refs.editParamsRefs.validate(async valid => {
        if (!valid) { return }
        const { data: res } = await this.$http.put(`categories/${this.cateId}/attributes/${this.editParamsForm.attr_id}`, { attr_name: this.editParamsForm.attr_name, attr_sel: this.activeName })
        if (res.meta.status !== 200) { return this.$message.error('修改参数数据失败！') }
        this.getCatParams()
      })
      this.showEditParamsDialog = false
    },
    // 表单内 删除按钮进行操作
    async deleteParams (id) {
      const confirmResult = await this.$confirm('此操作将永久删除该参数, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      if (confirmResult !== 'confirm') { return this.$message.info('用户取消了删除操作！') }
      const { data: res } = await this.$http.delete(`categories/${this.cateId}/attributes/${id}`, { attr_sel: this.activeName })
      if (res.meta.status !== 200) { return this.$message.error('修改参数失败！') }
      this.getCatParams()
    },
    // 添加tag标签 失去焦点和 按下回车键 都能触发
    async handleInputConfirm (row) {
      if (row.inputValue.trim().length === 0) {
        row.inputValue = ''
        row.inputVisible = false
        return
      }
      // 如果上述条件不成立 就进行push推入进数组内
      row.attr_vals.push(row.inputValue.trim())
      row.inputValue = ''
      row.inputVisible = false
      // 保存到后台
      this.saveAttrval(row)
    },
    async saveAttrval (row) {
      const { data: res } = await this.$http.put(`categories/${this.cateId}/attributes/${row.attr_id}`,
        {
          attr_name: row.attr_name,
          attr_sel: row.attr_sel,
          attr_vals: row.attr_vals.join(' ')
        })
      if (res.meta.status !== 200) { return this.$message.error('保存参数项出错！') }
      this.$message.success('修改参数项成功')
    },
    // 点下按钮 就显示 输入文本框
    showInput (row) {
      row.inputVisible = true
      // 自动焦点到输入文本框
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    // 删除标签事件
    removeTag (index, row) {
      row.attr_vals.splice(index, 1)
      this.saveAttrval(row)
    }
  },
  computed: {
    // 通过级联选择器判断
    isBtnDisable () {
      if (this.catSelectedList.length !== 3) { return true }
      return false
    },
    // 分类的ID 当前选中的三级ID 取最后一项
    cateId () {
      if (this.catSelectedList.length === 3) { return this.catSelectedList[2] }
      return null
    },
    // 动态显示标题的文本
    showDialogTitle () {
      if (this.activeName === 'many') {
        return '动态参数'
      } else {
        return '静态属性'
      }
    }
  }
}
</script>

<style lang="less" scoped>
.el-alert {
  margin-bottom: 15px;
}
.el-cascader {
  width: 300px;
}
.el-tabs {
  margin-top: 15px;
}
.el-tag {
  margin-left: 5px;
}
.input-new-tag {
  margin-left: 5px;
  width: 120px;
}
.input-new-button {
  margin-left: 5px;
}
</style>
