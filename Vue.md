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

