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
    //状态码为400
    res.status(400).send('Hello，Ajax！');
});

// 02-处理服务器返回的JSON数据
app.get('/responseData', (req, res) => {
    res.send({
        name: '张三',
        age: 18
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
});

//16-案例-验证邮箱的唯一性
app.get('/verifyEmailAdress', (req, res) => {
    // 接收客户端传递过来的邮箱地址 get过来的都需要req.query.形参
    const email = req.query.email;
    // 判断邮箱地址注册过的情况
    if (email == 'itheima@itcast.cn') {
        // 设置http状态码并对客户端做出响应
        res.status(400).send({ message: '邮箱地址已经注册过了, 请更换其他邮箱地址' });
    } else {
        // 邮箱地址可用的情况
        // 对客户端做出响应
        res.send({ message: '恭喜, 邮箱地址可用' });
    }
});

// 17-搜索框内容自动提示
app.get('/searchAutoPrompt', (req, res) => {
    // 搜索关键字
    const key = req.query.key;
    // 提示文字列表
    const list = [
        '程序员',
        '程序员官网',
        '程序员顺义校区',
        '程序员学院报名系统',
        '博客',
        '博客前端与移动端开发',
        '博客大数据',
        '博客python',
        '博客java',
        '博客c++',
        '博客怎么样'
    ];
    // 搜索结果
    let result = list.filter(item => item.includes(key));
    // 将查询结果返回给客户端
    res.send(result);
});

// 获取省份
app.get('/province', (req, res) => {
    res.json([{
        id: '001',
        name: '黑龙江省'
    }, {
        id: '002',
        name: '四川省'
    }, {
        id: '003',
        name: '河北省'
    }, {
        id: '004',
        name: '江苏省'
    }]);
});

// 根据省份id获取城市
app.get('/cities', (req, res) => {
    // 获取省份id
    const id = req.query.id;
    // 城市信息
    const cities = {
            '001': [{
                id: '300',
                name: '哈尔滨市'
            }, {
                id: '301',
                name: '齐齐哈尔市'
            }, {
                id: '302',
                name: '牡丹江市'
            }, {
                id: '303',
                name: '佳木斯市'
            }],
            '002': [{
                id: '400',
                name: '成都市'
            }, {
                id: '401',
                name: '绵阳市'
            }, {
                id: '402',
                name: '德阳市'
            }, {
                id: '403',
                name: '攀枝花市'
            }],
            '003': [{
                id: '500',
                name: '石家庄市'
            }, {
                id: '501',
                name: '唐山市'
            }, {
                id: '502',
                name: '秦皇岛市'
            }, {
                id: '503',
                name: '邯郸市'
            }],
            '004': [{
                id: '600',
                name: '常州市'
            }, {
                id: '601',
                name: '徐州市'
            }, {
                id: '602',
                name: '南京市'
            }, {
                id: '603',
                name: '淮安市'
            }]
        }
        // 响应
    res.send(cities[id]);
});

// 根据城市id获取县城
app.get('/areas', (req, res) => {
    // 获取城市id
    const id = req.query.id;
    // 县城信息
    const areas = {
        '300': [{
            id: '20',
            name: '道里区',
        }, {
            id: '21',
            name: '南岗区'
        }, {
            id: '22',
            name: '平房区',
        }, {
            id: '23',
            name: '松北区'
        }],
        '301': [{
            id: '30',
            name: '龙沙区'
        }, {
            id: '31',
            name: '铁锋区'
        }, {
            id: '32',
            name: '富拉尔基区'
        }]
    };
    // 响应
    res.send(areas[id] || []);
});


// 监听端口
app.listen(3000);
// 控制台提示输出
console.log('服务器启动成功');