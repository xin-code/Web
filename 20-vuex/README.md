## Vue组件之间共享数据的方式

### 0. 单页面传值

```
<template>
  <div>
    <span>{{msg}}</span>
  </div>
</template>

<script>
export default {
  data () {
    return {
      msg: '单页面传值'
    }
  }
}
</script>
```


### 1. 父—>子 ：(父组件用v-bind给子组件绑定数据)	`:`动态数据绑定

     **父：自定义属性名 + 数据（要传递）=> :value="数据"**
    
     **子：props ["父组件上的自定义属性名“] =>进行数据接收**

![](..\00-常用文件\images\父子传递-父传子.png)

- 父组件
  - 首先在`script`标签内引入子组件 
  - 定义一个`components`局部注册组件 命名为`son` 把son组件写到模板区域
    - *component*是注册全局组件
    - *components*是局部注册组件
  - 在注册组件中，绑定一个动态自定义属性名并且赋值`:自定义属性名="xx"`

```
<template>
  <div id="father">
    <h1>父组件</h1>
    <span>父传子-父</span>
    <input type="text" v-model="con">
    <son :msg="con"></son>
  </div>
</template>

<script>
// 引入子组件
import son from '../components/fatherToSonSon.vue'

export default {
  name: 'father',
  components: {
    son
  },
  data () {
    return {
      con: ''
    }
  }
}
</script>

<style lang="less" scoped>
</style>
```

- 子组件
  - 通过`script`属性中的`props`进行接收`自定义属性名` 
    - props是单项数据流（只允许父—>子）
    - 可以直接进行传值【父传子】

```
<template>
  <div id="son">
    <h1>子组件</h1>
    <span>父传子-子</span>
    <p>我是：{{ msg }}</p>
  </div>
</template>

<script>
export default {
  name: 'son',
  props: ['msg'],
  data () {
    return {

    }
  }
}
</script>

<style lang="less" scoped>
</style>
   
```


### 2. 子—>父：

     **子：this.$emit('自定义事件名称', 数据)  子组件标签上绑定@自定义事件名称='回调函数'**
    
     **父：methods: {  回调函数() {    //逻辑处理 }  }**

   ![](..\00-常用文件\images\父子传递-子传父.png)

- 子组件
  - 首先在`子组件`绑定(事件)，并且定义一个函数，把子组件的值传递给`父组件`

```
<template>
  <div>
    <h1>子组件</h1>
    <span>子传父-子</span>
    <!-- 双向绑定到sonVal内 -->
    <input type="text" v-model="sonVal">
    <!-- 进行传值操作 -->
    <input type="button" value="传值到父元素" @click="sonClick">
  </div>
</template>

<script>
export default {
  data () {
    return {
      sonVal: 'yes!'
    }
  },
  methods: {
    sonClick () {
      // 利用$emit方法 把子组件的值传递给父元素
      this.$emit('mySonVal', this.sonVal)
    }
  }
}
</script>

<style lang="less" scoped>
</style>

```

- 父组件
  - 那么父组件在接收子组件的时候，@绑定的属性`mySonVal`就是默认带有参数的

```
<template>
  <div>
    <h1>父组件</h1>
    <span>子传父-父</span>
    <input type="text" v-model="con">
    <son :val="name" @mySonVal="fatherHandle"></son>
  </div>
</template>

<script>
// 导入子组件
import son from '../components/sonToFatherSon'

export default {
  data () {
    return {
      con: ''
    }
  },
  components: {
    son
  },
  methods: {
    fatherHandle (con) {
      this.con = con
    }
  }

}
</script>

<style lang="less" scoped>
</style>

```



### 3. 兄弟之间：EventBus

![](..\00-常用文件\images\兄弟传递.png)


   1. 首先在`main.js`中定义一个EventBus

      ```
      Vue.prototype.$eventBus = new Vue();
      ```

   2. 父组件

      - 导入两个兄弟模板

   3. 子组件兄弟1：数据发送方：$emit(“事件名称”，“参数”)发送组件

      ```
      <template>
        <div>
          <h1>子组件 兄弟1</h1>
          <span>兄弟之间传递---</span>
          <input type="text" v-model="con" @change="handleChange(con)">
        </div>
      </template>
      
      <script>
      export default {
        data () {
          return {
            con: ''
          }
        },
        methods: {
          handleChange (val) {
            this.$eventBus.$emit('brotheronecome', this.con)
          }
        }
      }
      </script>
      
      <style lang="less" scoped>
      </style>
      ```

   4. 子组件兄弟2：数据接收方：$on(“事件名称”，“接收参数”)接收组件 

      ```
      <template>
        <div>
          <h1>子组件 兄弟2</h1>
          <span>兄弟之间传递</span>
          <p>接收的参数为---{{text}}</p>
        </div>
      </template>
      
      <script>
      export default {
        data () {
          return {
            text: ''
          }
        },
        mounted () {
          this.$eventBus.$on('brotheronecome', (val) => {
            this.text = val
          })
        }
      }
      </script>
      
      <style lang="less" scoped>
      </style>
      
      ```

# Vuex

`Vuex`是实现组件全局状态(数据)管理的一种机制，可以方便的**实现组件之间数据的共享**

![](..\00-常用文件\images\Vuex.png)

使用Vuex的好处：

1、集中管理共享数据，易于开发和后期维护。

2、高效实现组件之间的数据共享，提高开发效率。

3、存储在vuex中的数据都是响应式的，能够实时保持数据与页面的同步。

只有组件之间共享的数据才需要存到vuex中，组件的私有数据还是存放在自身的data中。


## 基本使用

1. 安装Vuex依赖包

   ```
   npm install vuex --save
   ```

2. 导入Vuex包

   ```
   import Vuex from 'vuex'
   Vue.use(Vuex)
   ```

3. 创建store对象(出现单独文件夹store文件夹，配置index.js)

   ```
   export default new Vuex.Store({
   	//state 中存放的就是全局共享的数据
   	state:{ count:0 }
   })
   ```

4. 将store对象挂载到vue实例中

   ```
   new Vue({
   	el:'#app',
   	router:h=>h(app),
   	router,
   	store
   })
   ```

## 核心概念

安装Vuex时，默认出现的store中`index.js`的配置

```
export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {}
})
```

### 1. State

**作用：提供公共数据源，所有共享数据统一放到 Store的State中进行存储**

```
export default new Vuex.Store({
  state: {
  	count:0
  },
})
```

- 组件访问State中数据的方式

  - :one: 第一种调用方式[根组件]

    **在`template`中this是可以省略的**

    ```
    this.$store.state.全局数据名称
    ```

  - :two: 第二种调用方式[子组件]

    - 从vuex中按需导入`mapState`函数

    ```
    import { mapState } from 'vuex'
    ```

    - 通过刚才导入的mapState函数，映射为:sunny:computed计算

    ```
    computed:{
    	...mapState(['count'])
    }
	  
    <template>
    	<div>
    		<h1>当前最新的count值为：{{count}}</h1>		// 直接渲染出来
    	</div>
    </template>
    ```
  
  


### 2. Mutations

**作用：用来变更State中的数据**

```
mutations:{
	add(state){
		// 变更状态
		state.count++
	}
}
```

- 在子组件中通过methods方法进行调用mutations
  - :one: 调用mutations的第一种方法：

    ```
methods:{
			handle() {
		        this.$store.commit('add')
			}
}
    ```
  
  - :two: 调用mutations的第二种方法：
    - 从vuex中按需导入mapMutations
  
    ```
  import { mapMutations } from 'vuex'
    ```
    
    - 通过刚才导入的mapMutations函数，映射为:star:**methods**方法
    
    ```
    methods:{
    	...mapMutations(['add']),
    	handle(){
    	this.add()
    	}
    }
    ```
    
  
- 传递参数

  ```
  // store 中 index.js配置
  mutations:{
  	add(state,step){
  		// 变更状态
  		state.count+=step
  	}
  }
  
  //子组件中的配置
  methods:{
  	handle() {
  		this.$store.commit('add',5)		//传递参数
  	}
  }
  ```
  

### 3. Actions

**作用：执行异步任务** 同样也是使用`commit`进行修改State中的值

- :one:第一种方法：

```
// store 中 index.js配置
actions:{
	addAsync(context){
		setTimeout(()=>{				//延迟一秒进行操作
			context.commit('add')
		},1000)
	}
}
//子组件中的配置
methods:{
	handle() {
		this.$store.dispatch('addAsync')		//调用actions
	}
}
```

- 传递参数

```
actions:{
	addAsync(context,step){				//接收参数
		setTimeout(()=>{				//延迟一秒进行操作
			context.commit('addN', step)
		},1000)
	}
}
//子组件中的配置
methods:{
	handle() {
		this.$store.dispatch('addAsync',5)		//调用actions,传递参数5
	}
}
```

- :two:第二种方法：

  - 从vuex中按需导入mapActions

  ```
  import { mapActions } from 'vuex'
  ```

  - 通过刚才导入的mapActions函数，映射为:star: **methods**方法

  ```
  // store中index.js的actions
  actions:{
  subAsyncD (context) {
  	setTimeout(() => {
  		context.commit('sub')
  	}, 1000)
  },
  subAsyncND (context, step) {
  	setTimeout(() => {
  		context.commit('subN', step)
  	}, 1000)
  }
  
  
  methods:{
  	// 此处定义的数组内的为store中index.js中actions中的名字
   	...mapActions(['subAsyncD', 'subAsyncND']),
  	// 定义的方法subNumD 然后调用方法
  	subNumD () {
        this.subAsyncD()
      },
  	subNumND () {
        this.subAsyncND(5)
      }
  }
  ```
  


### 4. Getters

**作用：对store中的数据进行加工处理变成新的数据 **

- store中index.js中的getters

```
export default new Vuex.Store({
  state: {
    count: 0
  },
  getters: {
    showNum (state) {
      return '当前的值为：[+"state.count"+]'
    }
  }
})
```

- :one: 调用getters的第一种方法：

```
this.$store.getters.名称(showNum)
```

- :two:调用getters的第二种方法：

  - 从vuex中按需导入mapGetters

    ```
    import {mapGetters} from 'vuex'
    ```

  - 通过刚才导入的mapGetters函数，映射为:sunny: **computed**计算

    ```
    computed:{
    	// 此处定义的数组内的为store中index.js中getters中的名字
     	...mapActions(['showNum'])
    }
    
    
    <template>
      <div>
        <h1>{{showNum}}</h1>		// 直接渲染出来
      </div>
    </template>
    ```

