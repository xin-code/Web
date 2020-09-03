// 引入express框架
const express = require('express');
// 路径处理模块
const path = require('path');

// 创建web服务器
const app = express();
const bodyParser = require('body-parser');

// 处理静态资源
app.use(express.static('public'));
// 处理参数
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// 设置允许跨域访问该服务
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Headers', 'mytoken');

    next();
});

//异步
app.get('/data', (req, res) => {
    res.send('Hello!')
});
app.get('/data1', (req, res) => {
    res.send('Hello A!')
});
app.get('/data2', (req, res) => {
    res.send('Hello B!')
});
app.get('/data3', (req, res) => {
    res.send('Hello C!')
});

//Promise的all和race比较
app.get('/1', (req, res) => {
    setTimeout(function() {
        res.send('Hello 1!')
    }, 1000)
});
app.get('/2', (req, res) => {
    setTimeout(function() {
        res.send('Hello 2!')
    }, 2000)
});
app.get('/3', (req, res) => {
    setTimeout(function() {
        res.send('Hello 3!')
    }, 3000)
});

//fetch
app.get('/fet', (req, res) => {
    setTimeout(function() {
        res.send('Hello fetch!')
    }, 100)
});

//fetch传递参数
app.get('/fetbooks', (req, res) => {
    res.send('传统URL传递参数' + req.query.id);
});

//fetch传递参数-get-restful
app.get('/fetbooks/:id', (req, res) => {
    res.send('restfulURL传递参数' + req.params.id);
});

//fetch传递参数-delete
app.delete('/fetbooks/:id', (req, res) => {
    res.send('restful中deleteURL传递参数' + req.params.id);
});

//fetch传递参数-post
app.post('/address', (req, res) => {
    res.send('post中URL传递参数' + req.body.uname + '---' + req.body.psw);
});

//fetch传递参数-put
app.put('/address/put/:id', (req, res) => {
    res.send('post中PUT的URL传递参数' + req.body.uname + '---' + req.body.age);
});

//fetch响应结果
app.get('/json', (req, res) => {
    res.json({
        uname: '张三',
        age: 18,
        sex: 'man'
    })
});

// axios基本用法
app.get('/ax', (req, res) => {
    res.send('Hello axios!')
});

// axios常用API-get-URL
// axios常用API-params
app.get('/axa', (req, res) => {
    res.send('axa-get-URL传递参数' + req.query.id)
});

//删除-delete-URL
//删除-delete-params
app.delete('/axa', (req, res) => {
    res.send('axa-delete-URL传递参数' + req.query.id)
});

// axios常用API-get-restful
app.get('/axa/:id', (req, res) => {
    res.send('axa-get-restful传递参数' + req.params.id)
});

//删除-delete-restful
app.delete('/axa/:id', (req, res) => {
    res.send('axa-get-restful传递参数' + req.params.id)
});

//添加-post-通过选项传递参数
app.post('/postparams', (req, res) => {
    res.send('添加-post-通过选项传递参数' + req.body.uname + '----' + req.body.psw)
});

//通过URLSearchParams传递参数
app.post('/URLSearchParams', (req, res) => {
    res.send('添加-post-通过URLSearchParams传递参数' + req.body.uname + '----' + req.body.age)
});

//修改-put-通过选项传递参数
app.put('/putparams/:id', (req, res) => {
    res.send('修改-put-通过选项传递参数' + req.params.id + '----' + req.body.uname + '----' + req.body.psw)
});

//axios响应结果
app.get('/axios-json', (req, res) => {
    res.json({
        uname: 'zs',
        age: 18
    })
});

//axios请求拦截器
app.get('/interceptors', (req, res) => {
    res.send('拦截器')
});

//async
app.get('/asy', (req, res) => {
    res.send('asy')
});

app.get('/async1', (req, res) => {
    res.send('hello')
});

app.get('/async2', (req, res) => {
    if (req.query.info == 'hello1') {
        res.send('world');
    } else {
        res.send('error')
    }
});

// 监听端口
app.listen(3000);
// 控制台提示输出
console.log('服务器启动成功');