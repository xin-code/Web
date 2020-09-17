<template>
  <div>
    <!-- 面包屑导航区 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片区域 -->
    <el-card>
      <!-- 搜索框 -->
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="请输入内容"
                    v-model="queryInfo.query"
                    clearable
                    @clear="getUserList"
                    @change="getUserList">
            <el-button slot="append"
                       icon="el-icon-search"
                       @click="getUserList"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary"
                     @click="addUserDialog=true">添加用户</el-button>
        </el-col>
      </el-row>
      <!-- 用户数据列表 -->
      <el-table :data="userList"
                style="width: 100%"
                border
                stripe
                :header-cell-style="{background:'#eef1f6'}">>
        <el-table-column type="index"
                         label="#">
        </el-table-column>
        <el-table-column prop="username"
                         label="姓名">
        </el-table-column>
        <el-table-column prop="email"
                         label="邮箱">
        </el-table-column>
        <el-table-column prop="mobile"
                         label="手机号">
        </el-table-column>
        <el-table-column prop="role_name"
                         label="角色">
        </el-table-column>
        <el-table-column prop="mg_state"
                         label="状态">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.mg_state"
                       active-color="#13ce66"
                       inactive-color="#ff4949"
                       @change="userStateChanged(scope.row)">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作"
                         width="180px">
          <template slot-scope="scope">
            <!-- 修改 -->
            <el-tooltip effect="dark"
                        content="编辑"
                        placement="top-start"
                        :enterable="false">
              <el-button type="primary"
                         icon="el-icon-edit"
                         size="mini"
                         @click="showEditUserDialog(scope.row.id)"></el-button>
            </el-tooltip>
            <!-- 删除 -->
            <el-tooltip effect="dark"
                        content="删除"
                        placement="top-start"
                        :enterable="false">
              <el-button type="danger"
                         @click="removeUserById(scope.row.id)"
                         icon="el-icon-delete"
                         size="mini"></el-button>
            </el-tooltip>
            <!-- 分配角色 -->
            <el-tooltip effect="dark"
                        content="分配角色"
                        placement="top-start"
                        :enterable="false">
              <el-button type="warning"
                         icon="el-icon-setting"
                         size="mini"
                         @click='settingUserDialog(scope.row)'></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
                     :current-page="queryInfo.pagenum"
                     :page-sizes="[1, 2, 5, 10]"
                     :page-size="queryInfo.pagesize"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="total">
      </el-pagination>
    </el-card>

    <!-- 添加用户dialog -->
    <el-dialog title="添加用户"
               :visible.sync="addUserDialog"
               width="50%"
               @close="closeAddDialogEvent">
      <!-- 内容主体区域 -->
      <div>
        <el-form :model="addForm"
                 :rules="addFormRules"
                 ref="addFormRef"
                 label-width="70px">
          <!-- 【弹出对话框--用户名】prop="name"是验证规则内的属性 -->
          <el-form-item label="用户名"
                        prop="username">
            <el-input v-model="addForm.username"
                      clearable></el-input>
          </el-form-item>
          <!-- 【弹出对话框--密码】prop="password"是验证规则内的属性 -->
          <el-form-item label="密码"
                        prop="password">
            <el-input v-model="addForm.password"
                      clearable></el-input>
          </el-form-item>
          <!-- 【弹出对话框--邮箱】prop="email"是验证规则内的属性 -->
          <el-form-item label="邮箱"
                        prop="email">
            <el-input v-model="addForm.email"
                      clearable></el-input>
          </el-form-item>
          <!-- 【弹出对话框--手机】prop="mobile"是验证规则内的属性 -->
          <el-form-item label="手机"
                        prop="mobile">
            <el-input v-model="addForm.mobile"
                      clearable></el-input>
          </el-form-item>
        </el-form>
      </div>
      <!-- 底部按钮区域 -->
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="addUserDialog = false">取 消</el-button>
        <el-button type="primary"
                   @click="addUser">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 编辑用户dialog -->
    <el-dialog title="编辑用户"
               :visible.sync="editUserDialog"
               width="50%"
               @close="closeEditDialogEvent">
      <el-form :model="editForm"
               :rules="editFormRules"
               ref="editFormRef"
               label-width="70px">
        <!-- 【弹出对话框--用户名】 -->
        <el-form-item label="用户名">
          <el-input v-model="editForm.username"
                    disabled></el-input>
        </el-form-item>
        <!-- 【弹出对话框--邮箱】 -->
        <el-form-item label="邮箱"
                      prop="email">
          <el-input v-model="editForm.email"></el-input>
        </el-form-item>
        <!-- 【弹出对话框--手机号】 -->
        <el-form-item label="手机号"
                      prop="mobile">
          <el-input v-model="editForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部按钮区域 -->
      <span slot="footer">
        <el-button @click="editUserDialog = false">取 消</el-button>
        <el-button type="primary"
                   @click="editUser">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 分配角色的Dialog -->
    <el-dialog title="分配角色"
               :visible.sync="showsettingUserDialog"
               width="50%"
               @close="resetSettingDialog">
      <div>
        <p>当前的用户：{{settingUserInfo.username}}</p>
        <p>当前的角色：{{settingUserInfo.role_name}}</p>
        <p>分配新角色：
          <el-select v-model="selectedRoleId"
                     placeholder="请选择">
            <el-option v-for="item in rolesList"
                       :key="item.id"
                       :label="item.roleName"
                       :value="item.id">
            </el-option>
          </el-select>
        </p>
      </div>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="showsettingUserDialog = false">取 消</el-button>
        <el-button type="primary"
                   @click="submitSettingRoleDialog">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    // 验证邮箱的规则
    var checkEmail = (rule, value, callback) => {
      // 通过正则表达式
      const regEmail = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
      if (regEmail.test(value)) {
        return callback() // 校验成功
      }
      callback(new Error('请输入合法的邮箱'))
    }

    // 校验手机号的规则
    var checkMobile = (rule, value, callback) => {
      // 通过正则表达式
      const regMobile = /^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/
      if (regMobile.test(value)) {
        return callback() // 校验成功
      }
      callback(new Error('请输入合法的手机号'))
    }

    return {
      // 获取用户列表的参数对象
      queryInfo: {
        query: '',
        // 当前页数
        pagenum: 1,
        // 当前每页显示多少条数据
        pagesize: 10
      },
      userList: [],
      total: 0,
      // 控制添加用户对话框的显示与隐藏
      addUserDialog: false,
      // 控制修改用户对话框的显示与隐藏
      editUserDialog: false,
      // 控制分配角色对话框的显示与隐藏
      showsettingUserDialog: false,
      // 分配角色的具体信息对象
      settingUserInfo: {},
      // 获取所有的角色列表
      rolesList: [],
      // 已选中的角色ID值
      selectedRoleId: '',
      // 添加用户表单
      addForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      // 编辑用户表单
      editForm: {},
      // 添加用户验证规则
      addFormRules: {
        username: [{ required: true, message: '请输入用户名', triggle: 'blur' }, { min: 3, max: 10, message: '用户名的长度在3-10位之间', triggle: 'blur' }],
        password: [{ required: true, message: '请输入密码', triggle: 'blur' }, { min: 6, max: 16, message: '密码的长度在6-16位之间', triggle: 'blur' }],
        email: [{ required: true, message: '请输入邮箱', triggle: 'blur' }, { validator: checkEmail, triggle: 'blur' }],
        mobile: [{ required: true, message: '请输入手机号', triggle: 'blur' }, { validator: checkMobile, triggle: 'blur' }]
      },
      // 编辑用户验证规则
      editFormRules: {
        email: [{ required: true, message: '请输入邮箱', triggle: 'blur' }, { validator: checkEmail, triggle: 'blur' }],
        mobile: [{ required: true, message: '请输入手机号', triggle: 'blur' }, { validator: checkMobile, triggle: 'blur' }]
      }
    }
  },
  created () {
    this.getUserList()
  },
  methods: {
    async getUserList () {
      // get参数用params传递
      const { data: res } = await this.$http.get('users', {
        params: this.queryInfo
      })
      if (res.meta.status !== 200) { return this.$message.error('请求出错') }
      this.userList = res.data.users
      this.total = res.data.total
    },
    // 每页条数更改时触发
    handleSizeChange (newSize) {
      this.queryInfo.pagesize = newSize
      this.getUserList()
    },
    // 页码更改 就触发
    handleCurrentChange (newPage) {
      this.queryInfo.pagenum = newPage
      this.getUserList()
    },
    // 当switch改变的时候进行同步到数据库
    async userStateChanged (userinfo) {
      const { data: res } = await this.$http.put(`users/${userinfo.id}/state/${userinfo.mg_state}`)
      if (res.meta.status !== 200) {
        userinfo.mg_state = !userinfo.mg_state
        return this.$message.error('更改状态失败!')
      }
      this.$message.success('更改状态成功！')
    },
    // 监听关闭添加dialog事件 重置 就触发
    closeAddDialogEvent () {
      this.$refs.addFormRef.resetFields()
    },
    // 监听关闭编辑dialog事件 重置 就触发
    closeEditDialogEvent () {
      this.$refs.editFormRef.resetFields()
    },
    // 点击确定按钮进行表单预验证
    addUser () {
      this.$refs.addFormRef.validate(async valid => {
        if (!valid) return
        // 发起请求
        const { data: res } = await this.$http.post('users', this.addForm)
        if (res.meta.status !== 201) return this.$message.error('提交数据失败！')
        this.$message.success('添加用户成功！')
        this.addUserDialog = false
        this.getUserList()
      })
    },
    editUser (editInfo) {
      this.$refs.editFormRef.validate(async valid => {
        if (!valid) return
        const { data: res } = await this.$http.put('users/' + this.editForm.id, { email: this.editForm.email, mobile: this.editForm.mobile })
        if (res.meta.status !== 200) return this.$message.error('更新用户数据失败！')
        // 关闭dialog对话框
        this.editUserDialog = false
        // 获取列表
        this.getUserList()
        // 提示信息成功
        this.$message.success('更新用户数据成功！')
      })
    },
    // 展示编辑用户的对话框
    async showEditUserDialog (id) {
      this.editUserDialog = true
      // console.log(id)
      // 调用接口获取信息
      const { data: res } = await this.$http.get(`users/${id}`)
      // console.log(res)
      if (res.meta.status !== 200) return this.$message.error('查询用户信息失败！')
      this.editForm = res.data
      // console.log(this.editForm)
    },
    // 删除数据 提示框
    async removeUserById (id) {
      // console.log(id)
      const confirmResult = await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
        // .catch用来捕获之前的所有错误
      }).catch(err => err)
      // 用户确认删除 返回值为confirm
      // 用户取消删除 返回值为报错信息.catch(err=>err) 这个捕获到错误信息后，并且return回去，留下的只有cancel
      if (confirmResult !== 'confirm') return this.$message.info('用户取消了删除操作')

      const { data: res } = await this.$http.delete('users/' + id)
      if (res.meta.status !== 200) return this.$message.error('删除信息失败！')
      this.$message.success('成功删除！')
      this.getUserList()
    },
    // 分配角色的Dialog
    async settingUserDialog (settingUserInfo) {
      // 把获取到的所有信息保存到data中
      this.settingUserInfo = settingUserInfo
      // 获取所有角色列表
      const { data: res } = await this.$http.get('roles')
      if (res.meta.status !== 200) return this.$message.error('获取角色列表失败')
      this.rolesList = res.data
      // 出现Dialog
      this.showsettingUserDialog = true
    },
    // 用户列表分配角色 确定按钮
    async submitSettingRoleDialog () {
      if (!this.selectedRoleId) return this.$message.error('请选择要分配的角色！')
      const { data: res } = await this.$http.put(`users/${this.settingUserInfo.id}/role`, { rid: this.selectedRoleId })
      if (res.meta.status !== 200) return this.$message.error('更新角色失败！')
      this.$message.success('更新角色成功！')
      this.getUserList()
      // 关闭对话框
      this.showsettingUserDialog = false
    },
    // 关闭分配角色对话框 重置
    resetSettingDialog () {
      this.selectedRoleId = ''
      this.settingUserInfo = ''
    }
  }
}
</script>

<style lang="less" scoped>
</style>
