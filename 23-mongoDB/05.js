const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/demo',{ useNewUrlParser: true,useUnifiedTopology: true } )
        .then(()=>console.log('数据库连接成功！'))
        .catch(err=>console.log(err,'数据库连接失败！！'))

// 创建 author 规则
const authorSchema = mongoose.Schema({
  name:String
})

// 把规则应用到authorInfo
const author = mongoose.model('authorInfo',authorSchema)

// 实例化 author
// author.create({name:'张三'}).then(result=>console.log(result))

// 创建 book 规则
const bookSchema = mongoose.Schema({
  book_name:String,
  author:{
    // 固定格式
    type:mongoose.Schema.Types.ObjectId,
    // 从哪个表单引用(★是表单名 不是构造函数名)
    refs:'authorInfo'
  },
  publish:Number
})

// 应用 book 规则
const book = mongoose.model('bookInfo',bookSchema)

// 实例化 book 
// book.create({book_name:'自传',author:'5f7091cbda18d808b0c12447',publish:55})

// 因为author字段在创建的时候是一串ID,populate填充到'author'内
book.find().populate('author').then(result=>console.log(result))