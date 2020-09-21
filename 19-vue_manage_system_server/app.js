const express = require('express')
const compression = require('compression')
const https = require('https'); 
const fs = require('fs'); 

const app = express()

const options = { 
  cert: fs.readFileSync('./full_chain.pem'), 
  key: fs.readFileSync('./private.key') 
} 

// 一定要写在静态托管之前
app.use(compression())
app.use (express.static('./dist'))

app.listen(80,()=>{
  console.log('成功运行！');
})

// https.createServer(options, app).listen(443); 