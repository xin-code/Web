# Vue

## 解决插值表达式'闪动'问题

用`v-cloak`
**原理：**先隐藏，替换好值后在显示最终值

```css
[v-cloak]{
	display:none;
}
```
```html
<标签 v-cloak>{{插值表达式}}</标签>
```

## 自定义指令directive

```JavaScript
注册指令
Vue.directive('focus', {
	inserted: function(el) {
		e.focus();
	}
})
```

```
调用指令
<标签 v-focus></标签>
```



## 指令

### v-for

```·
<ul>
<li :key='index' v-for="(items,index) in array">{{items}}</li>		//items就是每一项具体内容
</ul>

打印出来
·1
·2
·3
```

`:key='index'`进行唯一标识的区分



## 从上至下的（选项/数据）

```
var vue = new Vue({
	el:'',
	data:{
	
	},
	methods:{
		//方法,调用时需要xx()
		xx:function(){
		
		}
	},
	computed:{
		//计算，具有缓存功能，调用的时候不需要xx()
		xx:function(){
		
		}
	},
	watch:{
		//监听器
		xx:function(value){
			//value就是最新内容
		}
	},
	mounted:function(){
		//该生命周期钩子函数被触发的时候，模板已经可以使用(从后台填充数据到模板中)
	}
	
})
```

## 组件注册

### 全局组件注册

```
注册组件：
Vue.component(组件名称，{
	data:function(){	//组件数据(必须是一个函数)
		return {
			xx:xx,		//对象	
			}
	},
    template:'组件模板内容(字符串 可以写html语言)',	//必须放在一个能够包裹的标签内 支持ES6模板字符串
    methods:{
    	XX:function(){
    	//方法
    	}
    },
});

var vue = new Vue({	
	el:'.box',
	data:{				//实例的里面data是一个对象
		
	},
})
使用组件：
    <div class="box">
	<!-- 子组件之间相互独立 -->
	<组件名称> </组件名称>
	<组件名称> </组件名称>
	<组件名称> </组件名称>
    </div>
```

**组件名称**————>一般建议`hello-world`（短横线隔开）
-    如果使用驼峰命名(HelloWorld)组件名称
	-  只能在template中使用HelloWorld驼峰命名没问题
	-  在<div class="box">这个根组件模板内(普通标签内) 必须写成hello-world

###  局部组件注册

```
//对componentsA详细内容
var componentsA = {/*
	data:function(){	//组件数据(必须是一个函数)
		return {
			xx:xx,		//对象	
			}
	},
    template:'组件模板内容(字符串 可以写html语言)',	//必须放在一个能够包裹的标签内 支持ES6模板字符串
    methods:{
    	XX:function(){
    	//方法
    	}
    },*/}

var vue = new Vue({
	el:'',
	data:{
	
	},
	components:{
		//在实例对象内添加了一个components
		'components-A':componentsA,		//可以抽取出来
		'components-B':componentsB,
		'组件名':组建内容,
	}
});

使用组件：
    <div class="box">
	<组件名称> </组件名称>
	<components-A> </components-A>
	<组件名称> </组件名称>
    </div>
```

**重点：**局部注册组件只能在当前(el:'.box')绑定的父组件中使用

## 组件间的数据交换

### 1.  父组件—>子组件 子组件接收属性props

**props**传递数据：是单向数据流 （只允许父—>子）

```
子组件：接收
Vue.component('子组件名hello-world',{
	data:function(){
		return {
			//子组件本身的数据
		}
	}
	props:['父组件传过来的属性名(随便起)'],
	template:'<div>{{依据子组件中props的父组件传过来的属性名}}</div>'
})

父组件：传递过去自己的属性值
父组件内的值写在vue实例对象内

方法一：固定值
<子组件名hello-world 依据子组件中props的父组件传过来的属性名='父组件的数据(值)'></hello-world>

方法二：动态
<子组件名hello-world :依据子组件中props的父组件传过来的属性名='vue实例对象(父组件)内data属性的数据(值)'></hello-world>
```

**父组件传过来的属性名 如果使用驼峰命名法HelloWorld，在template模板中必须使用hello-world(短横线隔开) **



### 2.  子组件—>父组件 利用自定义事件$emit
```
子组件通过自定义事件向父组件传递消息
template:`<标签 @click='$emit("自定义事件名称",参数)'></标签>`	//子组件模板内这样写

父组件监听子组件事件
<div class="box">
<标签 :改变的属性>{{msg}}</标签>								//msg指的是父组件内的data中msg
<子组件名 @:自定义事件名称='父组件中定义的函数名(参数的接收$event)'></子组件名>

</div>

var vue = new Vue({
	el:'.box',
	data:{
		msg:'',
	},
	methods:{
		函数名:function(value){		//接收的参数传入父级的函数内$event—>value
			//处理逻辑
		}
	}
})
```



```
 $event
 //模板template
 template: `
	<div v-for='item in array'>
		//传递事件参数
	 	<input type="text" @blur='changeNum(item.id,$event)'/>	//$event把事件对象传递
	</div>
  `
  //方法methods
  methods:{
  	changeNum: function(id, event) {
		console.log(id, event.target.value);	//当前输入域最新的值event.target.value
	},
  }
```



```
自定义事件
//子组件中自定义的事件change
methods: {
	changeNum: function(id, event) {
		this.$emit('change',id);
  	})
},

//父组件需要监听事件change
<div class="box">
	<son @change='父组件data值/方法($event接收穿过来的值)'></son>
</div>
```





### 3.  兄弟组件之间传值 利用事件中心

通过`事件中心`管理组件进行通信

![](00-常用文件\images\Vue组件间的传值.PNG)

```
创建一个新的实例对象 在eventHub就是事件中心
var eventHub = new Vue()


mounted:function(){
监听事件：
eventHub.$on('自定义事件名称',事件函数)

销毁事件：
eventHub.$off('自定义事件名称')

触发事件：
eventHub.$emit('自定义事件名称',参数)
}
```



### 组件插槽的作用

1.  父组件内容向子组件传递内容，最终呈现出来

   ![](00-常用文件\images\组件插槽.jpg)

   ```
   插槽位置：位于子组件中
   Vue.component('子组件名',{
   	template:`
   	<div>
   		<span>ERROR</span>
   		<slot></slot>		//插槽位置在slot位置内 最后输出的结果为：ERROR+内容部分
   	</div>
   	`
   });
   
   插槽内容：
   <div class="box">
   	<子组件名>内容部分</子组件名>
   </div>
   ```

   小细节：如果slot标签内有内容的话，如果子组件名内的内容部分为空，那么就显示默认的slot标签内容；子组件名内不为空，覆盖

### 具名插槽用法

```
1.插槽定义 有自己的名字
Vue.component('子组件名', {
      template: `
        <div>
          <header>
            <slot name='header'></slot>
          </header>
          <main>
            <slot></slot>
          </main>
          <footer>
            <slot name='footer'></slot>
          </footer>
        </div>
      `
    });
2.插槽内容

方法一、
    <子组件名>
      <p slot='header'>标题信息</p>		//根据名字匹配 <slot name='header'></slot>
      
      <p>主要内容1</p>			//无名字 则默认填充到无名字的内部 <slot></slot>
      <p>主要内容2</p>
      
      <p slot='footer'>底部信息</p>		//根据名字匹配<slot name='footer'></slot>
    </子组件名>
    
方法二、
 	<子组件名>
 		<template slot='header'>	//固定写法 临时包裹信息，不会把template渲染到页面中
 			<p>标题信息1</p>
 			<p>标题信息2</p>
 		</template>
 		
 			<p>XX</p>
 			<p>XX</p>
 		
 		<template slot='footer'>	//固定写法
 			<p>底部信息1</p>
 			<p>底部信息2</p>
 		</template>
    </子组件名>
```

### 作用域插槽 

应用场景：**父组件对子组件的内容进行加工处理**

```
插槽定义

在子组件template中
template:`
<div>
	<li :key='items.id' v-for='items in 子组件中props的属性名)'>	//props父组件传过来的属性名(随便起)
	
	//作用域插槽 在li中间 把插值表达式插入slot标签内
	<slot :自定义名字='items(遍历出来任意一项的值)'>{{items.name}}</slot>	//现在是定义好插槽
	
	</li>
</div>
`

父组件进行填充插槽
<son>
	<template slot-scope='slotProps'>		//填充子组件需要使用slot-scope属性='slotProps'
		<strong>{{slotProps.自定义名字.name}}</strong>	//父组件通过子组件中绑定的自定义名字获得数据，可以加工处理
	</template>		
</son>
```

## 组件化思想

```
<div class='.box'>
	<all></all>
</div>



var one = {
	template:``;
}

var two = {
	template:``;
}
var three = {
	template:``;
}

//需要写在最下面 因为上面的定义以后下面才会显示
Vue.component('all',{		//全局组件
	template:`
		<div>				//需要容器包裹住
			<son1></son1>
			<son2></son2>
			<son3></son3>
		</div>
	`,
	components:{
		'son1':one,	//子组件1
		'son2':two,	//子组件2
		'son3':three,//子组件3
	}
})
```



## 前后端交互

### URL地址格式

![](\00-常用文件\images\传统URL地址.JPG)

![](\00-常用文件\images\Restful的URL地址.JPG)

### Promise用法

#### 异步调用

1.  异步
   - 定时任务（setTimeout、setInterval）
   - Ajax
   - 事件函数
2. 多次异步调用
   -  结果顺序不确定
   - 异步调用结果如果存在依赖需要嵌套[回调地狱]

`解决回调地狱—>Promise`

- Promise是异步编程的一种解决方案

- Promise是一个对象（构造函数）

#### 基本用法

1.  实例化Promise对象，构造函数中传递函数，该函数用于处理异步任务

2. `resolve`和`reject`两个参数对应成功和失败情况，通过p.then获取处理结果

   ```
   var p = new Promise(function(resolve,reject){
   	//成功时调用resolve()
   	//失败时调用reject()
   });
   
   p.then(function(suc){
   	//成功时的结果
   },function(err){
   	//失败时的结果
   })
   ```

#### 基于Promise处理的Ajax请求

发送一次Ajax请求

```
 function queryData(url) {
            var p = new Promise(function(resolve, reject) {
                var xhr = new XMLHttpRequest();
                xhr.onreadystatechange = function() {
                    //当请求被发送到服务器时，我们需要执行一些基于响应的任务。
                    //每当 readyState 改变时，就会触发 onreadystatechange 事件。
                    if (xhr.readyState != 4) return;
                    if (xhr.readyState == 4 && xhr.status == 200) {
                        //正常情况
                        resolve(xhr.responseText)
                    } else {
                        //处理错误信息
                        reject('服务器错误')
                    }
                };
                xhr.open('get', url);
                xhr.send(null);
            });
            return p;
        }
queryData('http://localhost:3000/data').then(function(suc) {
		//成功请求
            console.log(suc);
        }, function(err) {
        //失败请求
            console.log(err);
        })
```

发送多次Ajax请求—>解决回调地狱的问题

```
queryData().then(function(data){
	return queryData();		//返回的是一个新的Promise实例对象
}).then(function(data){		//.then指的就是上一个return的
	return queryData();
}).then(function(data){
	return queryData();
}).then(function(data){
	return queryData();
})
```

#### then参数中的函数返回值

1. 返回Promise实例对象
   - 返回的实力对象会调用下一个then
2. 返回一个普通值
   - 直接传递给下一个then，通过then函数中的参数接收

#### 常用API

1.  实例方法
   - p.then() 获取到异步任务的正确结果
   - p.catch()获取异常信息
   - p.finally()成功与否都会执行

2.  对象方法
   - Promise.all([数组1，数组2，数组3])		并发处理多个异步任务，所有任务都执行完，才能得到结果
   - Promise.race()     并发处理多个异步任务，只要有一个任务完成就能得到结果(只显示最快输出的结果)

## 接口调用

### Fetch语法
   - 传统Ajax(xhr)的升级版
   - 基于Promise实现

   ```
   fetch(url).then(fn1)
   		  .then(fn2)
   		  .then(fn3)
   		  	 ...
   		  .then(fn)
   		  //处理异常信息
   		  .catch(fn)
   ```

   ```
fetch('http://localhost:3000/fet').then(function(data) {
		return data.text();	//text()是fetch的API一部分，返回一个Promise实例对象，用于获取后台数据
}).then(function(data) {
		console.log(data);
})
   ```

   ### Fetch带参数传递

- 常用配置选项
  - method(String)：HTTP请求方法，默认为(GET、POST、PUT、DELETE)
  - body(String)：HTTP请求参数
  - headers(Object)：HTTP的请求头，默认为{}

```
fetch('url',{
	method:,
	body:,
	headers:,
}).then(fn2)
  .then(fn3)
    ...
  .then(fn)
  //处理异常信息
  .catch(fn)
```

1. GET请求方式的参数传递(默认method是get方法)与`delete`一致（在服务器端变成 app.delete

### **★服务器端**

   ```
   body：请求体中的数据
   
   query：请求的参数，URL后面以？的形式，例：user?id
   
   params：请求的参数，URL后面以/的形式，例：user/:id
   ```

   

```
//普通
fetch('/name=a?psw=123').then(function(data){
	return data.text();
}).then(function(data){
	console.log(data);
});
-----服务器端获取psw
app.get('/fetbooks', (req, res) => {
    res.send('传统URL传递参数' + req.query.id);		//【req.query.psw】
});

//利用Restful
fetch('/name/123'),{
	method:'get',
}).then(function(data){
	return data.text();
}).then(function(data){
	console.log(data);
});
-----服务器端获取psw
app.get('/fetbooks/:psw', (req, res) => {			//:psw冒号后面可以自定义 指定需要的什么
    res.send('restfulURL传递参数' + req.params.psw);	//【req.params.psw】
});
```

2. POST请求传递参数【多出来body和header部】和`PUT`一样，也同样可以传递json数据格式

```
fetch('/address'),{
	method:'post',
	body:'uname=zs&psw=123',
	【body:JSON.Stringify({
		uname:'张三',
		age:18
	})】
	headers:{
		'Content-Type': 'application/x-www-form-urlencoded'
		【'Content-Type': 'application/json'】
	}
}).then(function(data){
	return data.text();
}).then(function(data){
	console.log(data);
});
-----服务器端获取psw
【req.body.uname】
```

### Fetch响应结果

- text()将返回体转换为字符串格式
- json()==JSON.parse(responseText)

```
fetch('http://localhost:3000/json').then(function(data) {
	//json()相当于JSON.parse(responseText) 对字符串进行转换成对象格式
	return data.json();
}).then(function(data) {
	console.log(data);
})
```



### axios语法

axios：专门调用后台接口的JS库

```
axios.get('/adata').then(A=>{
	console.log(A.data);	//data属性名是固定的，用于获取后台响应数据
})
```

### axios常用API

1. get：查询数据
2. delete：删除数据 用法与`get`一样

- 通过URL地址传递参数

```
在URL地址后以?进行传参
axios.get('/ax?id=123').then(A=>{
	console.log(A.data);
})

----服务器端获取ID
app.get('/axa', (req, res) => {
    res.send('axa-get传递参数' + req.query.id)
});
```

- 通过restful选项传递参数

```
在URL地址后以/进行传参
axios.get('/ax/123').then(A=>{
	console.log(A.data);
})

----服务器端获取ID
app.get('/axa/:id', (req, res) => {
    res.send('axa-get传递参数' + req.params.id)
});
```

- 通过params选项传递参数

```
axios.get('/axa',{
	params:{
		id:123
	}
}).then(A=>{
	console.log(A.data);
})

----服务器端口 还是调用的get请求方式
app.get('/axa', (req, res) => {
    res.send('axa-get-URL传递参数' + req.query.id)
});
```

3. post：添加数据 
4. put：修改数据与`post`类似【一般情况下url后面加上/ID】

- ★通过选项传递参数（默认传递json格式的数据）

```
axios.post('/axa',{
	uname:'张三',
	psw:123
	}).then(A=>{
	console.log(A.data);
})

----服务器端
app.post('/axa', (req, res) => {
    res.send('axa-添加-put-通过选项传递参数' + req.body.uname + '----' + req.body.psw)
});
```

- 通过URLSearchParams传递参数

```
const params = new URLSearchParams();
params.append('参数1','值1');
params.append('参数2','值2');

axios.post('/axa',params).then(A=>{
	console.log(A.data);
})
```
### axios响应结果

1. data：实际响应回来的数据
2. headers：响应头信息
3. status：响应状态码
4. statusText：响应状态信息

```
axios.post('/axios-json').then(A=>{
	console.log(A.data);
})

----服务器端
app.get('/axios-json', (req, res) => {
    res.json({
        uname: 'zs',
        age: 18
    })
});
```

### axios的全局配置

- axios.defaults.timeout=3000;超时时间
- axios.defaults.baseURL='http://localhost:3000/XX';默认地址
- axios.defaults.headers['xx']='XXXXXXXXXXXXXXXX';设置请求头

### axios拦截器

1. 请求拦截器

   - 在请求发送之前设置一些信息

   ![](00-常用文件\images\axios请求拦截器.png)

   ```
   添加一个请求拦截器
   axios.interceptors.request.use(function(config){
   	//在请求发出之前进行一些信息设置
   	return config;
   },function(err){
   	//响应错误信息
   });
   ```

2. 响应拦截器

   - 在获取数据之前对数据进行加工

   

   ![](00-常用文件\images\axios响应拦截器.png)

```
添加一个响应拦截器
axios.interceptors.response.use(function(res){
	//在请求发出之前进行一些信息设置
	return res;
},function(err){
	//响应错误信息
});
```

### async和await【ES7—>异步调用】

- async关键字用于函数上(返回值是Promise实例对象)
- await关键字用于async函数中

```
async function fun(id){
	const A = await axios.get('/XX');
	return A;
}

fun.then(B=>{
	console.log(B);
})
```

### async和await处理多个异步请求

```
async function fun() {
	var info = await axios.get('async1');
	var A = await axios.get('async2?info=' + info.data);
	return A.data;
}
        
fun().then(function(data) {
	console.log(data);
})
```

## Vue-Router

`本质`：对应关系

- 后端路由

概念：根据不同的URL，返回不同的内容

本质：URL请求地址与服务器资源之间的对应关系

- 前端路由

概念：根据不同的`用户事件`，显示不同的页面内容

本质：`用户事件`与`事件处理函数`之间的对应关系

<img src="00-常用文件\images\前端路由.png"/>

1. SPA(Single Page Application)单页面应用程序

2. 实现原理：基于URL地址的hash值

3. 实现SPA—>前端路由



**功能**：

- 嵌套的路由/视图表
- 模块化的、基于组件的路由配置
- 路由参数、查询、通配符
- 基于 Vue.js 过渡系统的视图过渡效果
- 细粒度的导航控制
- 带有自动激活的 CSS class 的链接
- HTML5 历史模式或 hash 模式，在 IE9 中自动降级
- 自定义的滚动条行为

### 基本使用步骤

#### 1. 引入相关库文件

   ```
    <script src="vue.js"></script>
    <script src="vue-router.js"></script>
   ```

#### 2. 添加路由链接

```
<div class="box">
	//router-link是vue提供的标签，默认被渲染为a标签
	//to属性 默认渲染为href属性
	//to属性的值 默认渲染为#开头的hash地址
	<router-link to='/user'>User</router-link>
	<router-link to='/register'>Register</router-link>
</div>
```

#### 3. 添加路由填充位(路由占位符)

```
<div class="box">
	//通过路由规则匹配到的组件都会渲染到router-view所在位置
	<router-view></router-view>
</div>
```

#### 4. 定义路由组件【路由链接对应路由组件】

```
<script>
	var User = {
		template:'<div>User组件</div>'
	}
		var Register = {
		template:'<div>Register组件</div>'
	}
</script>
```

#### 5. ★配置路由规则并创建路由实例

```
var router = new VueRouter({
	//routes是所有路由规则数组
	routes:[
		//每个路由规则都是一个配置对象，至少包括path和component属性
		//path表示路由规则匹配的hash地址
		//component表示当前路由规则对应展示的组件
		//一一对应
		{path:'/user',component:User},
		{path:'/register',component:Register}
	]
})
```

#### 6. 把路由挂在到Vue根实例中

```
var vm = new Vue({
	el: '.box',
	data: {
		},
	router:路由名,
})
```

### 路由重定向`redirect`

访问地址A的时候，强制跳转到地址B，展示组件内容

```
var router = new VueRouter({
	//routes是所有路由规则数组
	routes:[
		//从/原地址—>重定向到'/user'
		{path:'/',redirect：'/user'},
		{path:'/user',component:User},
		{path:'/register',component:Register}
	]
})
```

### 嵌套路由

```
//父级组件
<div class="box">
	<router-link to='/fathera'>fathera</router-link>
	<router-link to='/fatherb'>fatherb</router-link>

	<router-view></router-view>
</div>

<script>
var fathera = {
	template: `<h1>fathera组件</h1>`
}
var fatherb = {
	template:` <h1>fatherb组件</h1>`
}
	
var router = new VueRouter({
	//routes是所有路由规则数组
	routes: [
	{path: '/',redirect: '/fathera'}, 
	{path: '/fathera',component: fathera}, 
	{path: '/fatherb',component: fatherb,}
	];
});
	var vm = new Vue({
	el: '.box',
	data: {},
	//挂载
	router:router,
})
```

```
//如果在father-b上面嵌套另外两个路由的话
<div class="box">
	<router-link to='/fathera'>fathera</router-link>
	<router-link to='/fatherb'>fatherb</router-link>

	<router-view></router-view>
</div>

<script>
//定义路由组件
var fathera = {
	template: `<h1>fathera组件</h1>`
}
var fatherb = {	
	//在father-b的模板上进行书写router-link和router-view
	template:`
	<div>
	<router-link to='/fatherb/sona'>sona</router-link>
	<router-link to='/fatherb/sonb'>sonb</router-link>

	<router-view></router-view>
	</div>`
}
//
var sona = {
	template: `<h2>sona</h2>`
}
var sonb = {
	template: `<h2>sonb</h2>`
}
	
var router = new VueRouter({
	//routes是所有路由规则数组
	routes: [
	{path: '/',redirect: '/fathera'}, 
	{path: '/fathera',component: fathera}, 
	//配置路由规则children子路由规则
	{path: '/fatherb',component: fatherb,children:[{
		{path: '/fatherb/sona',component: sona},
		{path: '/fatherb/sonb',component: sonb}
	}]
	];
});
	var vm = new Vue({
	el: '.box',
	data: {},
	//挂载
	router:router,
})
```

### 动态路由匹配

```
//配置路由规则的时候，在路径path内输入'/:id'的话找相对应的组件名称
var router = new VueRouter({
	routes:[
	{path:'/user/:id',component:User}
	]
});

//定义路由组件的里面插入插值表达式
const User = {
	//获取:id里面的参数 所以$router.params.id
	template:`<div>User:{{$router.params.id}}</div>`
}
```

### 动态路由传递参数

`$route`属性不够灵活

1. props的值为布尔型

```
var router = new VueRouter({
	routes:[
	{path:'/user/:id',component:User,props:true}
	]
});

//定义路由组件的里面插入插值表达式
const User = {
	//使用props获取ID
	props:['id']
	template:`<div>User用户ID:{{id}}</div>`
}
```

2. props的值为对象类型

```
var router = new VueRouter({
	routes:[
	{path:'/user/:id',component:User,props:{uname:'zs',age:18}}
	]
});

//定义路由组件的里面插入插值表达式
const User = {
	//使用props获取对象
	props:['uname','age']
	//id接收不到 就需要下面的props的值为函数类型
	template:`<div>User用户:{{id+'----'+uname+'-----'+age}}</div>`
}
```

3. ★props的值为函数类型

```
var router = new VueRouter({
	routes:[
	{path:'/user/:id',component:User,props:router=>({uname:'zs',age:18,id:router.params.id}})
	]
});

//定义路由组件的里面插入插值表达式
const User = {
	//使用props获取对象
	props:['uname','age','id']
	//id接收不到 就需要下面的props的值为函数类型
	template:`<div>User用户:{{id+'----'+uname+'-----'+age}}</div>`
}
```

### 命名路由

概念：为了方便表示路由的路径，给路由器起的别名

```
routes:[
	{
	path:'/user/:id',
	//这个路由规则的名字为user
	name:'user',
	component:User
	}
]


//需要绑定属性 :to
<router-link :to="{name:'user',params:{id:123}}">内容</router-link>
```

### 编程式导航

1. 声明式导航：通过`点击链接`实现的导航【<a></a>或Vue中<router-link></router-link>】
2. 编程式导航：通过调用`JavaScript`形式的API实现的导航
   - this.$router.push('hash地址')

   - this.$router.go(n)

```
const User = {
	template:'<div><button @click='goRegister'>跳转到注册页面</button></div>'
	methods:{
		goRegister:function(){
			//编程式导航
			this.$router.push('/register');
		}
	}
}
```
```
//字符串（路径名称）
router.push('/home')
//对象
router.push({path:'/home'})
//命名路由
router.push({name:'/home',params:{id:123}})
//带查询参数 /A?uname=zs
router.push({path:'/A'},query:{uname:'zs'})
```



## 前端模块化

**模块化**：就是把单独的一个功能封装到一个模块(文件)中，模块之间相互隔离，但是可以通过特定的接口公开内部成员，也可以依赖别的模块

好处：方便代码的重用，提高开发效率，方便后期维护

- 浏览器模块化规范

![](E:\Git\Web\00-常用文件\images\浏览器端模块化规范.png)

- 服务器端模块化规范

![](E:\Git\Web\00-常用文件\images\服务器端模块化规范.png)

### ES6模块化

- ES6模块化规范—浏览器&服务器统一
  - 每个js文件都是一个独立的模块
  - 导入模块成员使用`import`关键字
  - 暴露模块成员使用`export`关键字

- Node.js中通过`babel`体验ES6模块化

1. npm install --save-dev @babel/core @babel/cli @babel/preset-env @babel/node
2. npm install --save @babel/polyfill
3. 项目根目录下创建文件babel.config.js
4. 添加如下内容

```
const presets = [
	["@babel/env",{
	targets:{
		edge:"17",
		firefox:"60",
		chrome:"67",
		safari:"11.1"
		}
	}]
];
module.exports={presets};
```

5. 通过npx babel-node index.js执行代码

### ES6模块化基本语法

1. 默认导出语法（**！！只允许一次export default！！**）

```
export default {
	成员变量,
	成员函数,
}
```

2. 默认导入语法

```
import 接收的名称(任意取) from './地址'
```

3. 按需导出**可以重复使用多次**

```
export let A =10;
export let B =20;
export let C =30;
```

4. 按需导入

```
import {接收的名字(与导出的名称一一对应) from './地址'}
		{A as diyige}
		可以通过as进行起别名
```

5. 直接导入并执行模块代码

```
for(let i = 1;i<3;i++){
	console.log(i);
}

//直接导入
import './地址'
```



## webpack

1. 提供友好的模块化支持
2. 代码压缩混淆
3. 处理js兼容问题
4. 性能优化

### 基本使用

1. 新建项目空白目录，并运行`npm init -y`初始化管理配置文件package.json
2. 右键新建src源代码目录（以后所有的文件都存放在这个文件中）
3. 在src文件夹中新建index.html首页文件
4. 编写index.html
5. 安装`jQuery` :npm install jquery -s

### 在项目中安装和配置webpack

1. 安装webpack相关的包
   - npm install webpack webpack-cli -D
2. 在根目录下创建`webpack.config.js`配置文件
3. 编辑`webpack.config.js`文件，进行初始化操作

```
module.exports = {
	//编译模式 development开发模式(代码不会压缩)
			  production产品模式(上线，进行压缩)
	mode:'development'
}
```

4. `package.json`的`script`节点下，新增dev脚本

```
"script":{
	"dev":"webpack"	//可以通过npm run 执行
}
```

5. 在终端执行`npm run dev`启动webpack进行打包


### 手动配置打包的入口与出口

   - 默认打包的是src下的index.js
   
   - 默认输出的是dist文件下的main.js

修改`webpack.config.js`配置打包的入口与出口

```
const path = require('path')	//导入路径模块

module.exports={
	entry:path.join(__dirname,'./src/index.js'),//打包入口
	output:{
		path:path.join(__dirname,'./dist'),	//存放路径
		filename:'bundle.js'	//输出文件名称
	}
}
```

     ### 自动打包

1. 运行`npm install webpack-dev-server -D`安装项目自动打包的工具
2. 修改`package.json`中`scripts`的`dev`：

```
"scripts":{
	"dev":"webpack-dev-server"
}
```

3. 再此之前一定要`"dev":"webpack"`的时候npm run dev一下
4. 将src中的index.html中的script的引用路径为src='/bundle.js'【该文件是虚拟的，放在了内存】
5. 运行`npm run dev`
6. 在浏览器http://localhost:8080 查看自动打包结果

### 生成预览页面html-webpack-plugin

1. 运行 `npm install html-webpack-plugin -D`,安装生成预览页面插件
2. 修改`webpack.config.js`文件

```
//引入插件
const HtmlWebpackPlugin = require('html-webpack-plugin')

//创建实例
const htmlPlugin = new HtmlWebpackPlugin({	//创建实例对象
	template:'./src/index.html',	//指定用到的模板文件
	filename:'index.html'		//指定生成的文件，放在内存中，不显示
})

//export
module.exports = {
	plugins:[htmlPlugin]	//数组是webpack打包期间用到的插件列表
}
```

3. 重新执行`npm run dev`

- 配置完成后，`npm run dev`之后能直接弹出网址

  1. 在`package.json`配置

  ```
  //--open 打包完成后自动打开浏览器页面
  //--host 配置IP地址
  //--prot 配置端口
  
  "scripts":{
  	"dev","webpack-dev-server --open --host 127.0.0.1 --port 8888"
  }
  ```

  

## webpack加载器loader

通过loader打包非js模块
- webpack默认只能打包`.js`的模块文件
- 非js模块文件需要调用loader加载器

![](00-常用文件\images\webpack打包处理文件模块.png)

### 打包处理css文件

1. 运行`npm install style-loader css-loader -D`安装处理css文件的loader
2. 在`webpack.config.js`中`module`的`rules`数组中添加规则

```
module.exports = {
//所有第三方文件模块的匹配规则
	module:{
		rules:[
		{test:/\.css$,use:['style-loader','css-loader']}
		]
	}
}
```

- test表示匹配文件的类型 /正则表达式$/ $:表示以css结尾 
- use表示对应要调用的loader

3. 运行`npm run dev`
   - 注意：
     - use数组中指定的loader顺序是固定的 'style-loader','css-loader'
     - 多个loader的调用顺序是：从后往前调用
4. 在`index.js`中导入css

```
import './css/index.css'
```



### 打包处理less文件

1. 运行`npm install less-loader less -D`
2. 在`webpack.config.js`中`module`的`rules`数组中添加规则

```
module.exports = {
//所有第三方文件模块的匹配规则
	module:{
		rules:[
		{test:/\.less$,use:['style-loader','css-loader','less-loader']}
		]
	}
}
```

3. 在`index.js`中导入less

```
import './css/index.less'
```

### 打包处理scss文件

1. 运行`npm install sass-loader node-sass -D`
2. 在`webpack.config.js`中`module`的`rules`数组中添加规则

   - **loader名为【sass】**
   - **文件名后缀为【scss】**

```
module.exports = {
//所有第三方文件模块的匹配规则
	module:{
		rules:[
		{test:/\.scss$,use:['style-loader','css-loader','sass-loader']}
		]
	}
}
```

3. 在`index.js`中导入scss

```
import './css/index.scss'
```

### 配置postCSS自动添加css兼容前缀

1. 运行`npm install postcss-loader autoprefixer -D`
2. 在项目根目录中创建配置文件`postcss.config.js`

```
//导入插件
const autoprefixer = require('autoprefixer')

module.exports={
	plugins:[autoprefixer]	//挂在插件
}
```

3. 在`webpack.config.js`中`module`的`rules`中添加：

```
module.exports = {
//所有第三方文件模块的匹配规则
	module:{
		rules:[
		{test:/\.css$,use:['style-loader','css-loader','postcss-loader']}
		]
	}
}
```

### 打包样式表内的图片和字体文件

1. 运行`npm install url-loader file-loader -D`插件
2. 在`webpack.config.js`中`module`的`rules`中添加：

```
module.exports = {
//所有第三方文件模块的匹配规则
	module:{
		rules:[
		{test:/\.jpg|png|gif|bmp|ttf|eot|svg|woff|woff2$/,use:['url-loader?limit=16490']}
		]
	}
}
```

- ?之后的是loader的参数项
- limit用来指定图片的大小，单位是字节（ byte）

### 打包处理js的高级语法

1. 运行`npm install babel-loader @babel/core @babel/runtime -D`babel的转换器相关的包
2. 安装babel语法插件相关的包 `npm install @babel/preset-env @babel/plugin-transform-runtime @babel/plugin-proposal-class-properties -D`
3. 在根目录中，创建配置文件`babel.config.js`

```
module.exports = {
    presets: ['@babel/preset-env'],
    plugins: ['@babel/plugin-transform-runtime', '@babel/plugin-proposal-class-properties']
}
```

4. 在`webpack.config.js`中`module`的`rules`中添加：

```
module.exports = {
//所有第三方文件模块的匹配规则
	module:{
		rules:[
		{test:/\.js$/,use:'babel-loader',exclude:/node_modules/}
		]
	}
}
```

## Vue单文件组件

- template：组件的模板区域
- script：业务逻辑区域
- style：样式区域

```
<template>
	模板
</template>

<script>
	业务逻辑
	导出
	export default{
		data:(){return{}},	//私有数据
		methods:{}	//处理函数
	}
</script>

<style scoped>
	样式区域
</style>
```

### webpack中配置Vue组件的加载器

1. 运行`npm install vue-loader vue-template-compiler -D`
2. 在`webpack.config.js`中添加`vue-loader`配置：

```
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
//所有第三方文件模块的匹配规则
	module:{
		rules:[
		{test:/\.vue$/,loader:'vue-loader'}
		]
	},

	plugins:[
	//插件
	new VueLoaderPlugin();//引入插件
	]
}
```

### 在webpack项目中使用Vue

1. 运行`npm install vue -s`安装Vue
2. 在`src`中`index.js`入口文件中通过

```
import Vue from 'vue' //导入vue构造函数
```

3. 创建vue的实例对象，指定el区域
4. 通过render函数渲染根组件

```
//1.导入Vue构造函数
import Vue from 'vue'
//2.导入App根组件(App这个名字可以随便起) 特指某一个组件
import App from './components/app.vue'

//3.实例对象
const vm = new Vue({
    //el是控制的区域
    el: '#app',
    //通过render函数渲染根组件 特指App组件
    render: h => h(App)
})
```

## webpack打包发布

通过`webpack.json`文件配置打包命令

```
"scripts":{
	//用于打包的命令
	"build":"webpack -p",
	//用于开发调试的命令
	"dev":"webpack-dev-server --open --host 127.0.0.1 --port 8888",
}
```

- 运行打包程序 `npm run build`
  - 此时会生成`dist`目录文件



## Vue脚手架

**Vue脚手架**：快速生成Vue项目的基础架构

### 使用步骤

安装3.x版本Vue脚手架

- `npm install -g @vue/cli`

### 创建Vue项目

1. 基于`交互式命令行`的方式，创建新版Vue项目

   ```
   vue create [my-project]项目名称
   ```

2. 基于`图形化界面`的方式，创建新版Vue项目

   ```
   vue ui
   ```

### Vue脚手架生成的项目结构分析

![](00-常用文件\images\Vue脚手架生成的项目结构分析.png)

### Vue脚手架—自定义配置

1. 想要自动打开Vue项目，并且更改端口

- 第一种（不推荐）

   - 打开`package.json`文件中的最底部添加`vue`

```
{
	...,
	"vue":{
		"devServer":{
			"port":8888,	//端口号
			"open":true		//自动打开
		}
	}
}
```

- ★第二种（推荐）
  - 单独定义到`vue.config.js`中
    - 在项目的根目录中创建`vue.config.js`
    - 在该文件进行配置

```
module.exports={
	devServer:{
		port:8878,
		open:true
	}
}
```

## Element-UI

### 基本使用

1. 基于命令行手动安装

   - 安装依赖包`npm install element-ui -s`
   - 打开`src`中的`main.js`(打包入口文件)，导入Element-UI相关资源

   ```
   //导入组件库
   import ElementUI from 'element-ui'
   //导入组件相关样式
   import 'element-ui/lib/theme-chalk/index.css'
   //配置Vue插件
   Vue.use(ElementUI)
   ```

   

2. 