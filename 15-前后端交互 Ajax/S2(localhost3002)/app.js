// 引入express框架
const express = require('express');
// 路径处理模块
const path = require('path');
// const bodyParser = require('body-parser');
//bodyParser不能处理客户端传递过来的formdata对象
const fs = require('fs');
//用formidable处理formdata对象
const formidable = require('formidable');

//引入request，可以通过服务器进行跨域访问
const request = require('request');

// 创建web服务器
const app = express();

// app.use(bodyParser.json());

// 静态资源访问服务功能
app.use(express.static(path.join(__dirname, 'public')));

//06-服务器端跨域访问
app.get('/severs', (req, res) => {
    request('http://localhost:3001/severrequest', (err, request, body) => {
        console.log(err);
        console.log(request);
        console.log(body);
        res.send(body);
    })
})

// 监听端口
app.listen(3002);
// 控制台提示输出
console.log('服务器启动成功');