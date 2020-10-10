// 引入模块
const { Int32 } = require('bson')
const http = require('http')
const mongoose = require('mongoose')
const url = require('url')

// 连接数据库
mongoose.connect('mongodb://localhost/simple_manage',{ useNewUrlParser: true, useUnifiedTopology: true  })
        .then(()=>console.log('连接数据库成功！'))
        .catch(()=>console.log('连接数据库失败！'))

// 创建规则
const spmSchema = mongoose.Schema({
  name:{
    type:String,
    require:true,
    minlength:2,
    maxlength:20,
  },
  age:{
    type:Number,
    min:12,
    max:80
  },
  password:{
    type:String,
    require:true
  },
  email:String,
  hobbies:[String]
})

// 应用规则
const allInfo = mongoose.model('spmList',spmSchema)


// 创建服务器
const app = http.createServer();


// 为服务器对象添加请求事件
app.on('request', async (req,res)=>{
  // 获取请求方式
  const method = req.method;

  // 请求地址
  const { pathname } = url.parse(req.url)

  if(method == 'GET'){
    // 判断是否是/list列表
    if(pathname == '/list'){
      // 所有的用户信息
      let all = await allInfo.find()
      console.log(all);

      // 头部信息-模板字符串
      let list = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>用户列表</title>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap.min.css">
      </head>
      <body>
        <div class="container">
          <h6>
            <a href="add.html" class="btn btn-primary">添加用户</a>
          </h6>
          <table class="table table-striped table-bordered">
            <tr>
              <td>用户名</td>
              <td>年龄</td>
              <td>爱好</td>
              <td>邮箱</td>
              <td>操作</td>
            </tr>
            <tr>
              <td>张三</td>
              <td>20</td>
              <td>
                <span>抽烟</span>
                <span>喝酒</span>
                <span>烫头</span>
              </td>
              <td>zhangsan@itcast.cn</td>
              <td>
                <a href="" class="btn btn-danger btn-xs">删除</a>
                <a href="" class="btn btn-success btn-xs">修改</a>
              </td>
            </tr>
          </table>
        </div>
      </body>
      </html>
`

      // 尾部信息-模板字符串
      
      // 返回给客户端
      res.end(list);
    }
  }else if(method =='POST'){

  }
    
})

// 监听端口
app.listen(3000);