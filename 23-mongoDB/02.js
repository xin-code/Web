const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/demo',{ useNewUrlParser: true,useUnifiedTopology: true } )
        .then(()=>console.log('数据库连接成功！'))
        .catch(err=>console.log(err,'数据库连接失败！！'))

const studentinfoSchema = new mongoose.Schema({
    name:String,
    age:Number,
    info:String
})

const student = mongoose.model('studentinfo',studentinfoSchema);

const zs = new student({
    name:'张三',
    age:18,
    info:'我是张三，张三是我'
})

zs.save()