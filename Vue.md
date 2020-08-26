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

### 1.  父组件—>子组件 接收属性props

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