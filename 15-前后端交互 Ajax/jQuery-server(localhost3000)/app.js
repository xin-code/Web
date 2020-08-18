// 引入express框架
const express = require('express');
// 路径处理模块
const path = require('path');

// 创建web服务器
const app = express();


// 静态资源访问服务功能
app.use(express.static(path.join(__dirname, 'public')));

//01-$.ajax方法基本使用
//get方法
app.get('/first', (req, res) => {
    res.send({
        name: '张三',
        age: 22
    })
});

//post方法
app.post('/first', (req, res) => {
    res.status(400).send({
        name: '李四',
        age: 88
    })
});

//03-$.ajax方法发送jsonp请求
app.get('/jsonp', (req, res) => {
    res.jsonp({
        name: '李四',
        age: 88
    })
});

//04-$.ajax方法修改jsonp的callback名称和函数名称
app.get('/jsonpcb', (req, res) => {
    var cb = req.query.cb;
    var data = cb + "({name: 'zszs'})";
    res.send(data);
});

//05-$.get()方法和$.post()方法
app.get('/get', (req, res) => {
    res.send('ok');
});

//07-XML基础
app.get('/xml', (req, res) => {
    res.header('Content-Type', 'text/xml');
    res.send('<message><top>top</top><button>button</button></message>');
});

// 监听端口
app.listen(3000);
// 控制台提示输出
console.log('服务器启动成功');