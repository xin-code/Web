// 引入express框架
const express = require('express');
// 路径处理模块
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');
// 创建web服务器
const app = express();

app.use(bodyParser.json());

// 静态资源访问服务功能
app.use(express.static(path.join(__dirname, 'public')));

//01-Ajax入门 请求地址/first 请求方式get
//req请求对象 res响应对象
app.get('/first', (req, res) => {
    res.send('Hello，Ajax！');
});

// 02-处理服务器返回的JSON数据
app.get('/responseData', (req, res) => {
    res.send({
        name: '张三'
    });
});

//03-传递get请求参数
app.get('/get', (req, res) => {
    res.send(req.query);
});

//04-传递post请求参数
app.post('/post', (req, res) => {
    res.send(req.body);
});

//05-请求参数是json格式
app.post('/json', (req, res) => {
    res.send(req.body);
});

//06-获取服务器端的响应
app.get('/state', (req, res) => {
    res.send('结果');
});

//07-Ajax错误处理
app.get('/error', (req, res) => {
    res.status(400).send('not ok');
});

//08-低版本IE浏览器缓存的问题
app.get('/cache', (req, res) => {
        fs.readFile('./test.txt', (err, result) => {
            res.send(result);
        })
    })
    // 监听端口
app.listen(3000);
// 控制台提示输出
console.log('服务器启动成功');