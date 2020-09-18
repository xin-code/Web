<template>
  <div>
    <!-- 面包屑导航栏 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加商品</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片 -->
    <el-card>
      <!-- 警告区域 -->
      <el-alert title="添加商品信息"
                type="info"
                show-icon
                center
                :closable="false">
      </el-alert>
      <!-- 步骤条 -->
      <el-steps :space="200"
                :active="activeIndex - 0"
                finish-status="success"
                align-center>
        <el-step title="基本信息"></el-step>
        <el-step title="商品参数"></el-step>
        <el-step title="商品属性"></el-step>
        <el-step title="商品图片"></el-step>
        <el-step title="商品内容"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>

      <!-- 左侧tab栏 -->
      <el-form :model="addForm"
               :rules="addFormRules"
               ref="addFormRef"
               label-width="100px"
               label-position="top">
        <el-tabs :tab-position="'left'"
                 v-model="activeIndex"
                 :before-leave="beforeLeaveChange"
                 @tab-click="thisTabName">
          <!-- 基本信息 -->
          <el-tab-pane label="基本信息"
                       name="0">
            <el-form-item label="商品名称"
                          prop="goods_name">
              <el-input v-model="addForm.goods_name"></el-input>
            </el-form-item>
            <el-form-item label="商品价格"
                          prop="goods_price">
              <el-input v-model="addForm.goods_price"
                        type="number"></el-input>
            </el-form-item>
            <el-form-item label="商品重量"
                          prop="goods_weight">
              <el-input v-model="addForm.goods_weight"
                        type="number"></el-input>
            </el-form-item>
            <el-form-item label="商品数量"
                          prop="goods_number">
              <el-input v-model="addForm.goods_number"
                        type="number"></el-input>
            </el-form-item>
            <el-form-item label="商品分类"
                          prop="goods_cat">
              <!-- 级联选择器 -->
              <el-cascader v-model="addForm.goods_cat"
                           :options="allClassifyList"
                           :props="cascaderProps"
                           @change="cascaderChange"
                           clearable></el-cascader>
            </el-form-item>
          </el-tab-pane>
          <!-- 商品参数 -->
          <el-tab-pane label="商品参数"
                       name="1">
            <!-- 渲染表单 -->
            <el-form-item :label="item.attr_name"
                          v-for="item in this.manyParamsData"
                          :key="item.attr_id">
              <!-- 复选框 -->
              <el-checkbox-group v-model="item.attr_vals">
                <el-checkbox :label="items"
                             v-for="(items,index) in item.attr_vals"
                             :key="index"
                             border></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-tab-pane>
          <!-- 商品属性 -->
          <el-tab-pane label="商品属性"
                       name="2">
            <!-- 渲染表单 -->
            <el-form-item :label="item.attr_name"
                          v-for="item in onlyParamsData"
                          :key="item.attr_id">
              <el-input v-model="item.attr_vals"></el-input>
            </el-form-item>
          </el-tab-pane>
          <!-- 商品图片 -->
          <el-tab-pane label="商品图片"
                       name="3">
            <!-- 图片上传 -->
            <el-upload :action="uploadURL"
                       :on-preview="imgPreview"
                       :on-remove="imgRemove"
                       list-type="picture"
                       :headers="headerObj"
                       :on-success="imgUploadSuccess">
              <el-button size="small"
                         type="primary">点击上传</el-button>
              <div slot="tip"
                   class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </el-tab-pane>
          <!-- 商品内容 -->
          <el-tab-pane label="商品内容"
                       name="4">
            <!-- 富文本编辑器 -->
            <quill-editor v-model="addForm.goods_introduce">
            </quill-editor>
            <!-- 添加商品按钮 -->
            <el-button type="primary"
                       @click="addAll">添加商品</el-button>
          </el-tab-pane>
        </el-tabs>
      </el-form>
    </el-card>

    <!-- 显示预览图片Dialog -->
    <el-dialog title="预览图片"
               :visible.sync="imgPreviewVisible"
               width="50%">
      <img :src="imgPreviewAddress"
           class="imgPreview">
    </el-dialog>
  </div>
</template>

<script>
import _ from 'lodash'

export default {
  data () {
    return {
      // 步骤条-到第几步
      activeIndex: '0',
      // 添加表单数据对象 - el-form标签内
      addForm: {
        goods_name: '',
        // 在级联选择器中选择的数组，因为传递参数需要使用，写在表单数据内
        goods_cat: [],
        goods_price: 0,
        goods_number: 0,
        goods_weight: 0,
        // 商品的详情介绍
        goods_introduce: '',
        // 图片上传
        pics: [],
        // 商品的动态参数和静态属性数组
        attrs: []
      },
      // 添加表单数据对象的规则
      addFormRules: {
        goods_name: [
          { required: true, message: '请输入商品名称', trigger: 'blur' }],
        goods_price: [
          { required: true, message: '请输入商品价格', trigger: 'blur' }],
        goods_weight: [
          { required: true, message: '请输入商品重量', trigger: 'blur' }],
        goods_number: [
          { required: true, message: '请输入商品数量', trigger: 'blur' }],
        goods_cat: [
          { required: true, message: '请输入商品数量', trigger: 'blur' }]
      },
      // 商品的全部分类
      allClassifyList: [],
      // 级联选择器中选择的内容
      casaderAll: [],
      // 级联选择器配置项
      cascaderProps: {
        label: 'cat_name',
        value: 'cat_id',
        children: 'children',
        expandTrigger: 'hover'
      },
      // 商品参数列表存储
      manyParamsData: [],
      // 商品属性列表存储
      onlyParamsData: [],
      // 图片上传地址
      uploadURL: 'http://127.0.0.1:8888/api/private/v1/upload',
      // 请求头地址
      headerObj: {
        Authorization: window.sessionStorage.getItem('token')
      },
      // 预览图片
      imgPreviewVisible: false,
      // 预览图片地址
      imgPreviewAddress: ''
    }
  },
  created () {
    this.getAllClassify()
  },
  methods: {
    async getAllClassify () {
      const { data: res } = await this.$http.get('categories')
      if (res.meta.status !== 200) { return this.$message.error('获取分类失败！') }
      this.allClassifyList = res.data
      // console.log(this.allClassifyList)
    },
    // 级联选择器发生变化 触发
    cascaderChange () {
      if (this.addForm.goods_cat.length !== 3) { this.addForm.goods_cat = [] }
    },
    // 判断标签页进行切换
    beforeLeaveChange (activeName, oldActiveName) {
      // console.log('即将离开的标签页为：' + oldActiveName)
      // console.log('即将进入的标签页为：' + activeName)
      // return false
      if (oldActiveName === '0' && this.addForm.goods_cat.length !== 3) {
        this.$message.error('请先选择商品分类！')
        return false
      }
    },
    // 获取当前tab是点击的第几个
    async thisTabName () {
      // console.log(this.activeIndex)
      // 商品参数 1
      if (this.activeIndex === '1') {
        // console.log('获取商品参数')
        const { data: res } = await this.$http.get(`categories/${this.cateId}/attributes`, { params: { sel: 'many' } })
        // console.log(res.data)
        if (res.meta.status !== 200) { return this.$message.error('获取商品参数列表失败！') }
        res.data.forEach(item => {
          item.attr_vals = item.attr_vals.length === 0 ? [] : item.attr_vals.split(' ')
        })
        this.manyParamsData = res.data
        // 商品属性 2
      } else if (this.activeIndex === '2') {
        const { data: res } = await this.$http.get(`categories/${this.cateId}/attributes`, { params: { sel: 'only' } })
        if (res.meta.status !== 200) { return this.$message.error('获取商品属性失败！') }
        this.onlyParamsData = res.data
      }
    },
    // 图片预览
    imgPreview (file) {
      // console.log(file)
      this.imgPreviewAddress = file.response.data.url
      this.imgPreviewVisible = true
    },
    // 图片删除
    imgRemove (file) {
      // console.log(file)
      // 1、获取要删除的临时地址
      const removeImgAddress = file.response.data.tmp_path
      // console.log(removeImgAddress)
      // 2、从pics数组中，找到这个图片对应的索引
      const index = this.addForm.pics.findIndex(item =>
        item.pic === removeImgAddress
      )
      // 3、调用splice方法，移除
      this.addForm.pics.splice(index, 1)
      // console.log(this.addForm)
    },
    // 图片上传成功
    imgUploadSuccess (response) {
      const imgInfo = { pic: response.data.tmp_path }
      this.addForm.pics.push(imgInfo)
      // console.log(this.addForm)
    },
    // 添加商品 最终步骤
    addAll () {
      this.$refs.addFormRef.validate(async valid => {
        if (!valid) { return this.$message.error('清填写必要的表单信息！') }
        // 执行添加业务逻辑
        const form = _.cloneDeep(this.addForm)
        // 把goods_cat 变成字符串
        // join 数组——>字符串
        form.goods_cat = form.goods_cat.join(',')
        // 处理动态参数 和 静态属性
        this.manyParamsData.forEach(item => {
          const newManyParamsData = {
            attr_id: item.attr_id,
            attr_value: item.attr_vals.join(' ')
          }
          this.addForm.attrs.push(newManyParamsData)
        })
        // 处理静态属性
        this.onlyParamsData.forEach(item => {
          const newOnlyParamsData = {
            attr_id: item.attr_id,
            attr_value: item.attr_vals
          }
          this.addForm.attrs.push(newOnlyParamsData)
        })
        // 把深拷贝过来的 进行覆盖操作
        form.attrs = this.addForm.attrs
        const { data: res } = await this.$http.post('goods', form)
        if (res.meta.status !== 201) { return this.$message.error('添加商品失败！') }
        this.$message.success('添加商品成功')
        // 编程式导航跳转到goods页面
        this.$router.push('/goods')
      })
    }
  },
  computed: {
    cateId () {
      if (this.addForm.goods_cat.length === 3) {
        return this.addForm.goods_cat[2]
      }
      return null
    }
  }
}
</script>

<style lang="less" scoped>
.el-steps {
  margin: 15px 0 15px 0;
}
.el-checkbox {
  margin: 0 5px 0 0 !important;
}
.imgPreview {
  width: 100%;
  height: 100%;
}
.quill-editor {
  margin-bottom: 15px;
}
</style>
