//引入
const fs = require('fs');

//读取内容
fs.readFile('./01-Node入门.js', 'utf8', (err, doc) => {
    console.log(err);
    console.log(doc);
})