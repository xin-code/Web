const content = '<h3>这是我新写入的内容</h3>';
const fs = require('fs');
fs.writeFile('./05-index.html', content, function(err, doc) {
    if (err != null) {
        console.log(err);
        return;
    }
    console.log('文件写入成功！');
})