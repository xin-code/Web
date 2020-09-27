const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/demo',{ useNewUrlParser: true,useUnifiedTopology: true } )
        .then(()=>console.log('数据库连接成功！'))
        .catch(err=>console.log(err,'数据库连接失败！！'))

const studentinfoSchema = new mongoose.Schema({
    name:{
      type:String,
      required:[true,'你的名字必须要填写！'],
      minlength:[4,'最少输入4个字符'],
      maxlength:[10,'最多输入10个字符'],
      trim:true
    },
    age:Number,
    info:{
      type:String,
      enum:{
        values:['html','css'],
        message:'不符合要求'
      },
      validate:{
        validator:v=>{
          return v&&v.length>4
        },
        message:'输入的信息太短，需要超过4个字符'
      }
    }
})

const student = mongoose.model('studentinfo',studentinfoSchema);

// student.find({_id:'5c09f1e5aeb04b22f8460965'}).then(result=>console.log(result))

// student.findOne({age:'22'}).then((result)=>console.log(result))

// student.find({age:{$gt:10,$lt:30}}).then(result=>console.log(result))

// student.find({info:{$in:['喜欢旅游']}}).then(result=>console.log(result))

// student.find().select('age name').then(result=>console.log(result))

// student.find().sort('age').then(result=>console.log(result))

// student.find().skip(2).limit(2).then(result=>console.log(result))

// student.findOneAndDelete({name:'钱八'}).then(result=>console.log(result))

// student.updateOne({name:'吴水'},{name:'吴用'}).then(result=>console.log(result))

student.create({name:'1',age:18,info:'b'})
.then(result=>console.log(result))
.catch(erro=>{
  const err = erro.errors;
  for(var obj in err){
    console.log(err[obj]['message']);
  }
})