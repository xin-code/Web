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

student.create({name:'李四',age:22,info:'这是另一种方法插入进来的数据！'},(err,result)=>{
    console.log(err);
    console.log(result);
})