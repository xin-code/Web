<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 头像 -->
      <div class="img_box">
        <img src="../assets/logo.png">
      </div>
      <!-- 登陆 -->
      <el-form class="login_form"
               ref="loginFormRef"
               :model="loginForm"
               :rules="loginFormRules">
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input placeholder="用户名"
                    prefix-icon="iconfont icon-user"
                    v-model="loginForm.username"
                    @change="login"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input placeholder="密码"
                    prefix-icon="iconfont icon-3702mima"
                    v-model="loginForm.password"
                    type="password"
                    @change="login"></el-input>
        </el-form-item>
        <!-- 按钮区域 -->
        <el-form-item class="btns">
          <el-button type="primary"
                     @click="login">登陆</el-button>
          <el-button type="info"
                     @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginFormRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    reset () {
      this.$refs.loginFormRef.resetFields()
    },
    login () {
      this.$refs.loginFormRef.validate(async (valid) => {
        if (!valid) { return };
        const { data: res } = await this.$http.post('login', this.loginForm)
        if (res.meta.status !== 200) return this.$message.error('登陆失败')
        this.$message.success('恭喜您，登陆成功！')
        window.sessionStorage.setItem('token', res.data.token)
        this.$router.push('/home')
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login_container {
  background-color: #2b4b6b;
  height: 100%;
}
.login_box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  .img_box {
    height: 130px;
    width: 130px;
    border: 1px solid #000;
    border-radius: 50%;
    padding: 8px;
    box-shadow: 0 0 15px #ccc;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    img {
      height: 100%;
      width: 100%;
      border-radius: 50%;
      background-color: #ddd;
    }
  }
}
.btns {
  display: flex;
  justify-content: flex-end;
}
.login_form {
  box-sizing: border-box;
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 15px;
}
</style>
