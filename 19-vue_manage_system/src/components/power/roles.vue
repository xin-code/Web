<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片 -->
    <el-card>
      <!-- 添加角色按钮区域 -->
      <el-row>
        <el-col>
          <el-button type="primary"
                     @click="addRoleDialog">添加角色</el-button>
        </el-col>
      </el-row>
      <!-- 角色列表表格区域 -->
      <el-table :data="roleList"
                border
                stripe
                :header-cell-style="{background:'#eef1f6'}">
        <!-- 展开列 -->
        <el-table-column type="expand">
          <template slot-scope="scope">
            <!-- 栅格系统 -->
            <el-row :class="['bdbottom',index1===0?'bdtop':'','vcenter']"
                    v-for="(item1,index1) in scope.row.children"
                    :key="item1.id">
              <!-- 一级权限 -->
              <el-col :span="5">
                <el-tag closable>{{item1.authName}}</el-tag>
                <i class="el-icon-caret-right"></i>
              </el-col>
              <!-- 二级、三级权限 -->
              <el-col :span="19">
                <!-- 渲染剩下的权限 -->
                <el-row :class="[index2==0?'':'bdtop','vcenter']"
                        v-for="(item2,index2) in item1.children"
                        :key="item2.id">
                  <!-- 二级权限 -->
                  <el-col :span="6">
                    <el-tag type="success"
                            closable>{{item2.authName}}</el-tag>
                    <i class="el-icon-caret-right"></i>
                  </el-col>
                  <!-- 三级权限 -->
                  <el-col :span="13">
                    <el-tag v-for="(item3) in item2.children"
                            :key="item3.id"
                            closable
                            type="warning"
                            @close="removeRolesTagById(scope.row,item3.id)">{{item3.authName}}</el-tag>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
            <div>{{scope.row}}</div>
          </template>
        </el-table-column>
        <!-- 索引列 -->
        <el-table-column label="#"
                         type="index"></el-table-column>
        <el-table-column label="角色名称"
                         prop="roleName"></el-table-column>
        <el-table-column label="角色描述"
                         prop="roleDesc"></el-table-column>
        <el-table-column label="操作"
                         width="300px">
          <template slot-scope="scope">
            <el-button icon="el-icon-edit"
                       type="primary"
                       size="mini"
                       @click="editRoleDialog(scope.row.id)">编辑</el-button>
            <el-button icon="el-icon-delete"
                       type="danger"
                       size="mini"
                       @click="removeRoleById(scope.row.id)">删除</el-button>
            <el-button icon="el-icon-setting"
                       type="warning"
                       size="mini"
                       @click="toRolesRightDialog(scope.row)">分配权限</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 添加角色 -->
    <el-dialog title="添加角色"
               :visible.sync="showAddRoleDialog"
               width="50%"
               @close="resetAddRoleDialog">
      <el-form :model="addRoleForm"
               :rules="addRoleRules"
               ref="addRoleRefs"
               label-width="100px">
        <el-form-item label="角色名称"
                      prop="roleName">
          <el-input v-model="addRoleForm.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述"
                      prop="roleDesc">
          <el-input v-model="addRoleForm.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="showAddRoleDialog = false">取 消</el-button>
        <el-button type="primary"
                   @click="submitAddRoleDialog">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 编辑角色Dialog -->
    <el-dialog title="编辑角色信息"
               :visible.sync="showEditRoleDialog"
               width="50%"
               @close="resetEditRoleDialog">
      <el-form :model="editRoleForm"
               :rules="editRoleRules"
               ref="editRoleRefs"
               label-width="100px">
        <el-form-item label="角色名称"
                      prop="roleName">
          <el-input v-model="editRoleForm.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述"
                      prop="roleDesc">
          <el-input v-model="editRoleForm.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="showEditRoleDialog = false">取 消</el-button>
        <el-button type="primary"
                   @click="submitEditRoleDialog">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 分配权限对Dialog -->
    <el-dialog title="分配权限"
               :visible.sync="showRolesRightDialog"
               width="50%"
               @close="closeRolesRightDialog">
      <el-tree :data="rightList"
               :props="treeProps"
               show-checkbox
               node-key="id"
               default-expand-all
               :default-checked-keys="defkey"
               ref="treeRefs"></el-tree>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="showRolesRightDialog = false">取 消</el-button>
        <el-button type="primary"
                   @click="submitRolesRightDialog">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
export default {
  data () {
    return {
      // 所有角色列表
      roleList: [],
      // 控制添加角色对话框的显示与隐藏
      showAddRoleDialog: false,
      // 控制编辑角色对话框的显示与隐藏
      showEditRoleDialog: false,
      // 控制分配权限对话框的显示与隐藏
      showRolesRightDialog: false,
      // 分配权限内所有的数据
      rightList: [],
      // 树形结构中的props指定
      treeProps: {
        children: 'children',
        label: 'authName'
      },
      // 默认树形结构状态选中状态
      defkey: [],
      // 点击这个分配权限时候需要的ID 从点击那一下开始记录
      roleId: '',
      // 添加表格项
      addRoleForm: {},
      // 编辑角色表格项
      editRoleForm: {},
      // 添加编辑用户时验证规则
      editRoleRules: {
        roleName: [
          { required: true, message: '请输入角色名称', trigger: 'blur' }, { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }],
        roleDesc: [
          { required: true, message: '请输入角色描述', trigger: 'blur' }, { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }]
      },
      // 添加添加用户时验证规则
      addRoleRules: {
        roleName: [
          { required: true, message: '请输入角色名称', trigger: 'blur' }, { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }],
        roleDesc: [
          { required: true, message: '请输入角色描述', trigger: 'blur' }, { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }]
      }
    }
  },
  created () {
    this.getRoleList()
  },
  methods: {
    // 获取所有角色列表
    async getRoleList () {
      const { data: res } = await this.$http.get('roles')
      this.roleList = res.data
      if (res.meta.status !== 200) return this.$message.error('获取角色列表失败！')
      this.$message.success('获取角色列表成功！')
    },
    // 显示与隐藏添加用户的Dialog
    addRoleDialog () {
      this.showAddRoleDialog = true
    },
    // 关闭添加用户的Dialog的时候重置表单数据
    resetAddRoleDialog () {
      this.$refs.addRoleRefs.resetFields()
    },
    // 添加用户时 点击提交按钮的时候 进行提交信息
    submitAddRoleDialog () {
      this.$refs.addRoleRefs.validate(async valid => {
        if (!valid) return this.$message.error('输入的格式不正确，请验证后重新输入!')
        const { data: res } = await this.$http.post('roles', this.addRoleForm)
        if (res.meta.status !== 201) return this.$message.error('添加用户失败！')
        this.$message.success('添加用户成功！')
        this.showAddRoleDialog = false
        this.getRoleList()
      })
    },
    // 点击编辑用户信息按钮时，Dialog显示 并且编辑(修改用户信息的时候，先get获取数据)
    async editRoleDialog (id) {
      this.showEditRoleDialog = true
      const { data: res } = await this.$http.get('roles/' + id)
      this.editRoleForm = res.data
    },
    // 出现编辑用户的Dialog后，确定按钮使用【put】请求修改数据
    submitEditRoleDialog () {
      this.$refs.editRoleRefs.validate(async valid => {
        if (!valid) return this.$message.error('输入的格式不正确，请验证后重新输入!')
        const { data: res } = await this.$http.put('roles/' + this.editRoleForm.roleId, { roleName: this.editRoleForm.roleName, roleDesc: this.editRoleForm.roleDesc })
        if (res.meta.status !== 200) return this.$message.error('更新失败！')
        this.showEditRoleDialog = false
        this.$message.success('更新用户数据成功！')
        this.getRoleList()
      })
    },
    // 关闭编辑用户的Dialog的时候重置表单数据
    resetEditRoleDialog () {
      this.$refs.editRoleRefs.resetFields()
    },
    // 删除按钮 删除本条数据
    async removeRoleById (id) {
      const confirmResult = await this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      if (confirmResult !== 'confirm') return this.$message.info('用户取消了删除操作！')
      const { data: res } = await this.$http.delete('roles/' + id)
      if (res.meta.status !== 200) return this.$message.error('删除数据失败！')
      this.$message.success('删除数据成功！')
      this.getRoleList()
    },
    // 点击Tag进行删除权限的操作
    async removeRolesTagById (role, rightID) {
      const tagResult = await this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      if (tagResult !== 'confirm') return this.$message.info('用户取消了删除！')
      const { data: res } = await this.$http.delete(`roles/${role.id}/rights/${rightID}`)
      if (res.meta.status !== 200) this.$message.error('取消权限失败！')
      // 更新列表 防止每次调用数据更新页面
      // 用最新的data值赋值给role.children属性
      role.children = res.data
    },
    // 显示与隐藏分配权限的Dialog
    async toRolesRightDialog (role) {
      // 获取所有的权限数据
      const { data: res } = await this.$http.get('rights/tree')
      if (res.meta.status !== 200) return this.$message.error('请求失败，没有获得所有的权限数据')
      // 把获取到的所有数据填充到列表内
      this.rightList = res.data
      // 递归获取三级节点的ID
      this.getAllInfo(role, this.defkey)
      // 保存该条的ID 为分配权限确定按钮做准备
      this.roleId = role.id
      this.showRolesRightDialog = true
    },
    // 递归函数 遍历所有的三级节点
    getAllInfo (node, arr) {
      // 如果不存在node.children属性，则就是三级节点
      // 把所有的id放在arr数组中
      if (!node.children) {
        return arr.push(node.id)
      }
      // 如果此时没有return 则表示现在不是三级节点
      node.children.forEach(item => this.getAllInfo(item, arr))
    },
    // 每次关闭分配权限对话框的时候，把defkey的数组清空
    closeRolesRightDialog () {
      this.defkey = []
    },
    // 提交修改权限的按钮
    async submitRolesRightDialog () {
      const keys = [...this.$refs.treeRefs.getCheckedKeys(), ...this.$refs.treeRefs.getHalfCheckedKeys()]
      const idStr = keys.join(',')
      const { data: res } = await this.$http.post(`roles/${this.roleId}/rights`, { rids: idStr })
      if (res.meta.status !== 200) return this.$message.error('更新出错！')
      this.getRoleList()
      // 隐藏对话框
      this.showRolesRightDialog = false
    }
  }
}
</script>

<style lang="less" scoped>
.el-tag {
  margin: 10px;
}
.bdtop {
  border-top: 1px solid #ccc;
}
.bdbottom {
  border-bottom: 1px solid #ccc;
}
.vcenter {
  display: flex;
  align-items: center;
}
</style>
