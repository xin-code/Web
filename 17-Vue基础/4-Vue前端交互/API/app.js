// 引入express框架
const express = require('express');
// 路径处理模块
const path = require('path');

// 创建web服务器
const app = express();
const bodyParser = require('body-parser');

// 静态资源访问服务功能
app.use(express.static(path.join(__dirname, 'public')));
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

// 监听端口
app.listen(3000);
// 控制台提示输出
console.log('服务器启动成功');