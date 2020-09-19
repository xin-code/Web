<template>
  <div>
    <!-- 面包屑导航栏 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>订单管理</el-breadcrumb-item>
      <el-breadcrumb-item>订单列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片区域 -->
    <el-card>
      <!-- 搜索框 -->
      <el-row>
        <el-col :span="8">
          <el-input placeholder="请输入内容"
                    clearable>
            <el-button slot="append"
                       icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
      </el-row>
      <!-- 渲染表单 -->
      <el-table :data="orderList"
                border
                stripe>
        <el-table-column type="index"
                         label="#">
        </el-table-column>
        <el-table-column prop="order_number"
                         label="订单编号">
        </el-table-column>
        <el-table-column prop="order_price"
                         label="订单价格">
        </el-table-column>
        <el-table-column prop="pay_status"
                         label="是否付款">
          <!-- 渲染出是否付款的标签 -->
          <template slot-scope="scope">
            <el-tag type="success"
                    v-if="scope.row.pay_status==='1'">已付款</el-tag>
            <el-tag type="danger"
                    v-else>未付款</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="create_time"
                         label="下单时间">
          <template slot-scope="scope">
            {{scope.row.create_time | dateFormate}}

          </template>
        </el-table-column>
        <el-table-column label="操作">
          <el-button type="primary"
                     icon="el-icon-edit"
                     size="mini"
                     @click="editAddress"></el-button>
          <el-button type="success"
                     icon="el-icon-info"
                     size="mini"
                     @click="showProgress"></el-button>
        </el-table-column>
      </el-table>

      <!-- 分页管理 -->
      <el-pagination @size-change="pageSizeChange"
                     @current-change="pageCurrentChange"
                     :current-page="queryInfo.pagenum"
                     :page-sizes="[5, 10, 15, 20]"
                     :page-size="queryInfo.pagesize"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="total">
      </el-pagination>
    </el-card>

    <!-- 编辑地址的Dialog -->
    <el-dialog title="修改地址"
               :visible.sync="addressDialogVisible"
               width="50%"
               @close="closeformreset">
      <!-- 省市区/县 -->
      <el-form :model="addressForm"
               :rules="addressRules"
               ref="addressRef"
               label-width="100px">
        <el-form-item label="省市区/县："
                      prop="city">
          <el-cascader :options="cityData"
                       v-model="addressForm.city"></el-cascader>
        </el-form-item>
        <el-form-item label="详细地址："
                      prop="detailAddress">
          <el-input v-model="addressForm.detailAddress"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="addressDialogVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="addressDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 显示物流信息的进度 -->
    <el-dialog title="物流信息"
               :visible.sync="progressDialogVisible"
               width="50%">
      <!-- 时间线 -->
      <el-timeline>
        <el-timeline-item v-for="(activity, index) in progressInfo"
                          :key="index"
                          :timestamp="activity.time">
          {{activity.context}}
        </el-timeline-item>
      </el-timeline>
    </el-dialog>
  </div>
</template>

<script>
// 导入地址
import cityData from './citydata'
export default {
  data () {
    return {
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 5
      },
      // 总数
      total: 0,
      // 列表
      orderList: [],
      // 控制修改地址的显示与隐藏
      addressDialogVisible: false,
      // 省市区县
      addressForm: {
        city: [],
        detailAddress: ''
      },
      addressRules: {
        city: [{ required: true, message: '请选择省市区/县', trigger: 'blur' }],
        detailAddress: [{ required: true, message: '请输入详细地址', trigger: 'blur' }]
      },
      cityData: cityData,
      // 控制物流进度的显示与隐藏
      progressDialogVisible: false,
      // 物流信息数据列表
      progressInfo: []
    }
  },
  created () {
    this.getOrderList()
  },
  methods: {
    async getOrderList () {
      const { data: res } = await this.$http.get('orders', { params: this.queryInfo })
      if (res.meta.status !== 200) { return this.$message.error('获取订单列表失败！') }
      // console.log(res)
      this.orderList = res.data.goods
      // console.log(this.orderList)
      this.total = res.data.total
      // console.log(this.total)
    },
    // 当每页的page-size显示条目改变时触发
    pageSizeChange (newSize) {
      this.queryInfo.pagesize = newSize
      this.getOrderList()
    },
    // 当pagenum页码数改变时触发
    pageCurrentChange (newPageNum) {
      this.queryInfo.pagenum = newPageNum
      this.getOrderList()
    },
    // 修改地址
    editAddress () {
      this.addressDialogVisible = true
    },
    // 关闭Dialog的时候 重置form表格
    closeformreset () {
      this.$refs.addressRef.resetFields()
    },
    // 显示物流地址
    async showProgress () {
      const { data: res } = await this.$http.get('/kuaidi/1106975712662')
      // console.log(res)
      if (res.meta.status !== 200) { return this.$message.error('获取物流信息失败！') }
      this.progressInfo = res.data
      // console.log(this.progressInfo)
      this.progressDialogVisible = true
    }
  }
}
</script>

<style lang="less" scoped>
.el-cascader {
  width: 100%;
}
@import '../../plugins/timeline/timeline.css';
@import '../../plugins/timeline-item/timeline-item.css';
</style>
