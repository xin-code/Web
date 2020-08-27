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



### 2.  子组件—>父组件 利用自定义事件
```
子组件通过自定义事件向父组件传递消息
template:`<标签 @click='$emit("自定义事件名称",参数)'></标签>`		//子组件模板内这样写

父组件监听子组件事件
<div class="box">
<标签 :改变的属性>{{msg}}</标签>										//msg指的是父组件内的data中msg
<子组件名 @:自定义事件名称='函数名 参数的接收$event'></子组件名>

</div>

var vue = new Vue({
	el:'.box',
	data:{
		msg:'',
	},
	methods:{
		函数名:function(value){									//接收的参数传入父级的函数内$event—>value
			//处理逻辑
		}
	}
})
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
   		<slot></slot>						//插槽位置在slot位置内 最后输出的结果为：ERROR+内容部分
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
      <p slot='header'>标题信息</p>				//根据名字匹配 <slot name='header'></slot>
      
      <p>主要内容1</p>							//无名字 则默认填充到无名字的内部 <slot></slot>
      <p>主要内容2</p>
      
      <p slot='footer'>底部信息</p>			//根据名字匹配<slot name='footer'></slot>
    </子组件名>
    
方法二、
 	<子组件名>
 		<template slot='header'>		//固定写法 临时包裹信息，不会把template渲染到页面中
 			<p>标题信息1</p>
 			<p>标题信息2</p>
 		</template>
 		
 			<p>XX</p>
 			<p>XX</p>
 		
 		<template slot='footer'>		//固定写法
 			<p>底部信息1</p>
 			<p>底部信息2</p>
 		</template>
    </子组件名>
```

### 作用域插槽 

应用场景：**父组件对子组件的内容进行加工处理**

