# vue_manage_system

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).



# 后台管理系统

:zap:该系统采用前后端分离技术

:rainbow:前端：Vue的SPA(Single-Page Application)项目

:rainbow:技术栈：Vue+Vue-router+Element-UI+Axios+Echarts



## 前台初始化项目

- 配置Vue脚手架
- 配置Element-UI组件库
- 运行依赖Axios库
- git

## 后台初始化项目

- 安装phpStudy，只运行MySQL
- 解压vue_api_server，然后在MySQL管理器中导入mydb.sql，还原数据库
- 在vue_api_server中`npm install`安装依赖
- 运行API接口`node .\app.js`
- 测试API接口apipost
- `src/main.js`是整个项目的入口文件

### 1. 登录

1. 输入用户名、密码
2. 调用后台接口进行验证
3. 通过验证后，根据响应状态跳转到项目主页
   - 通过cookie在客户端记录状态【不存在跨域问题】
   - 通过session在服务器端记录状态【不存在跨域问题】
   - ★通过token方式维持状态【**存在跨域问题**】
     - token原理
4. 通过Element-UI组件实现布局

![](..\00-常用文件\images\token原理.png)

- 字体引用

```
不管做怎么，首先需要导入到main.js中import './assets/fonts/iconfont.css'
<el-input prefix-icon="iconfont icon-user"></el-input>
```

- 重置按钮

```
模板 ref=引用对象
<el-form ref="LoginFormRef">
<el-button @click="reset">重置</el-button>
<el-form>

行为
<script>
export default {
  methods: {
    reset () {
      this.$refs.LoginFormRef.resetFields()
    }
  }
}
</script>
```

- 发起登陆请求需要axios

```
导入axios包
import axios from 'axios'
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
Vue.prototype.$http = axios	//挂载到Vue的原型对象上

出现Promise函数的话 就async await
this.$refs.loginFormRef.validate(async (valid) => {
	if (!valid) { return };
	const { data: res } = await this.$http.post('login', this.loginForm)
	if (res.meta.status !== 200) return this.$message.error('登陆失败')
	this.$message.success('恭喜您，登陆成功！')
})
__{data:res}__解构赋值把data属性单独领出来，赋值给res
```

- 消息提示（弹窗）

```
导入
import { Message } from 'element-ui'
!!需要挂载！！
Vue.prototype.$message = Message
这样做是因为可以每个组件就可以通过this.$message访问这个弹窗提示

if (res.meta.status !== 200) return this.$message.error('登陆失败')
this.$message.success('恭喜您，登陆成功！')
```

- 登录成功过后的tokenb保存在客户端的SessionStorage中

```
window.sessionStorage.setItem('token', res.data.token)
```

- 通过`编程式导航【router】`跳转到后台主页

```
this.$router.push('/home')
```

- 路由导航守卫控制访问权限

就是不登录 不能显示登录后的页面，强制跳转回登录页

1. to将要访问的路径
2. from从哪个路径跳转过来
3. next()放行
   - next('/login')强制跳转

```
//为路由对象添加beforeEach导航守卫
router.beforeEach((to,from,next)=>{
//如果用户从登录页登陆，直接放行
if(to.path==='/login') return next()
//从sessionStroage中获取token值
const tk = window.sessionStorage.getItem('token')
//没有token值，强制跳转到登录页
if(!tk) return next('/login')
next()
})
```

### 2. 退出

只需要销毁本地token值

```
//清空token值
window.sessionStorage.clear()
//跳转到登录页
this.$router.push('/login')
```

