##  浅拷贝与深拷贝
`浅拷贝`（shallowCopy）只是增加了一个指针指向已存在的内存地址，两者的属性值会指向同一内存空间

##### 实现浅拷贝方法
1. 方法一：ES6新增了object.assign()
2. 方法二：展开运算符（…）

`深拷贝`（deepCopy）是增加了一个指针并且申请了一个新的内存，使这个增加的指针指向这个新的内存

##### 实现深拷贝方法
1. JSON.parse（）
2. JSON.Stringify（）



## 闭包，及其如何实现



## 从输入url到页面加载显示完成，中间都经历了什么?
1.  首先，在浏览器地址栏中输入url
2. 浏览器先查看浏览器缓存-系统缓存-路由器缓存，如果缓存中有，会直接在屏幕 中显示页面内容。若没有，则跳到第三步操作。
3.  在发送http请求前，需要域名解析(DNS解析)解析获取相应的IP地址。
4.  浏览器向服务器发起tcp连接，与浏览器建立tcp三次握手。（TCP即传输控制协议。TCP连接是互联网连接协议集的一种。）
      【1.主机向服务器发送一个建立连接的请求（您好，我想认识您）；】
      【2.服务器接到请求后发送同意连接的信号（好的，很高兴认识您）；】
      【3.主机接到同意连接的信号后，再次向服务器发送了确认信号（我也很高兴认识您），自此，主机与服务器两者建立了连接。】
5.  握手成功后，浏览器向服务器发送http请求，请求数据包。
6.  服务器处理收到的请求，将数据返回至浏览器
7.  浏览器收到HTTP响应
8.  读取页面内容，浏览器渲染，解析html源码
9.  生成Dom树、解析css样式、js交互
10.  客户端和服务器交互
11.  ajax查询

##  JS的基本数据类型有哪些？
基本数据类型：Number、String、Boolean、Null、 Undefined、Symbol（ES6）bigInt（ES10），这些类型可以直接操作保存在变量中的实际值。

引用数据类型：Object（在JS中除了基本数据类型以外的都是对象，数据是对象，函数是对象，正则表达式是对象）

## 面向对象和面向过程的区别
面向过程：为了把大象装进冰箱，需要3个过程。1) 把冰箱门打开（得到打开门的冰箱）2) 把大象装进去（打开门后，得到里面装着大象的冰箱）3) 把冰箱门关上（打开门、装好大象后，获得关好门的冰箱）每个过程有一个阶段性的目标，依次完成这些过程，就能把大象装进冰箱。
面向对象：了把大象装进冰箱，需要做三个动作(行为)每个动作有一个执行者，它就是对象。
1:冰箱.开门()冰箱.装进(大象)冰箱.关门()

## 如何实现一个promise

## 事件流

## session和cookies区别

## 原型链

## 内存泄漏

## JavaScript内存回收机制

## 作用域

## TCP三次握手
## 四次挥手

## https 和 http 的不同之处

## 用 nodejs 做过什么


