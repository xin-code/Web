# Vuex

`Vuex`是实现组件全局状态(数据)管理的一种机制，可以方便的**实现组件之间数据的共享**

![](..\00-常用文件\images\Vuex.png)

使用Vuex的好处：

1、集中管理共享数据，易于开发和后期维护。

2、高效实现组件之间的数据共享，提高开发效率。

3、存储在vuex中的数据都是响应式的，能够实时保持数据与页面的同步。

只有组件之间共享的数据才需要存到vuex中，组件的私有数据还是存放在自身的data中。



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

      