# 21-vuex-todolist

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).



# Todolist

1. 安装依赖运行依赖包

   ```
   axios
   ant-design-vue
   ```

2. 挂载store

   ```
   import store from './store'
   
   new Vue({
     store,
     render: (h) => h(App)
   }).$mount('#app')
   ```

3. 调用列表

   ```
   actions: {
     getList (context) {
   	axios.get('/list.json').then(({ data }) => {
   		console.log(data)
   	})
     }
   }
   ```



## 疑难点

 1. 输入框改变的时候，获取变化后的内容(实时变化)

```
 <input @change="handleInputChange">  
 
 methods:{
    handleInputChange (e) {
      console.log(e.target.value)
    }
 }
```

2. 去除字符串两端的空格

```
this.String.trim()
```

3. 根据ID查找索引项

```
// findIndex会循环数组中的每一项，每循环一次 都用x来接收，用x的id和传递过来的id进行比较 如果相等 则用index进行接收
const index = Array.findIndex(x => x.id===id)
```

4. 删除数组中的元素

```
// 在原数组进行修改。元素的位置，删除几项
Array.splice(index,1)
```

5. 复选框改变事件

```
// 为change事件绑定一个函数
<checkbox @change="(e)=>{checkboxStatusChanged(e,scope.id)}"></checkbox>

methods:{
	// 监听复选框选中状态变化的事件
	checkboxStatusChanged(e,id){
	console.log(e)
	console.log(id)
	}
}
```

6. 过滤

```
// 【数组的过滤 (每一项数据x，如果x的状态为false的话 是一个新的数组)】.length的长度
return Array.filter(x=> x.done===false).length
```

