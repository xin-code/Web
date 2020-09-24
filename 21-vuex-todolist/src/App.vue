<template>
  <div id="app">
    <a-input placeholder="请输入任务"
             class="my_ipt"
             :value="inputValue"
             @change="handleInputChange" />
    <a-button type="primary"
              @click="addItemToList">添加事项</a-button>

    <a-list bordered
            :dataSource="infoBtnview"
            class="dt_list">
      <a-list-item slot="renderItem"
                   slot-scope="item">
        <!-- 复选框 -->
        <a-checkbox :checked="item.done"
                    @change="(e)=>{checkboxStatusChanged(e,item.id)}">{{item.info}}</a-checkbox>
        <!-- 删除链接 -->
        <a slot="actions"
           @click="removeItemById(item.id)">删除</a>
      </a-list-item>

      <!-- footer区域 -->
      <div slot="footer"
           class="footer">
        <!-- 未完成的任务个数 -->
        <span>{{unDoneLength}}条剩余</span>
        <!-- 操作按钮 -->
        <a-button-group>
          <a-button :type="key === 'all' ? 'primary': 'default'"
                    @click="viewkey('all')">全部</a-button>
          <a-button :type="key === 'undone' ? 'primary': 'default'"
                    @click="viewkey('undone')">未完成</a-button>
          <a-button :type="key === 'done' ? 'primary': 'default'"
                    @click="viewkey('done')">已完成</a-button>
        </a-button-group>
        <!-- 把已经完成的任务清空 -->
        <a @click="clear">清除已完成</a>
      </div>
    </a-list>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'app',
  data () {
    return {
    }
  },
  created () {
    this.$store.dispatch('getList')
  },
  computed: {
    ...mapState(['inputValue', 'key']),
    ...mapGetters(['unDoneLength', 'infoBtnview'])
  },
  methods: {
    // 输入框发生变化 双向数据绑定到state中
    handleInputChange (e) {
      // console.log(e.target.value)
      this.$store.commit('toInputValue', e.target.value)
    },
    // 添加数据
    addItemToList () {
      if (this.inputValue.trim().length <= 0) {
        return this.$message.warning('输入框不能为空！')
      }
      this.$store.commit('addIteminState')
    },
    // 删除数据
    removeItemById (id) {
      // console.log(id)
      this.$store.commit('removeItem', id)
    },
    // 当复选框被选中时，状态发生变化
    checkboxStatusChanged (e, id) {
      // console.log(e.target.checked)
      // console.log(id)
      const params = {
        id: id,
        done: e.target.checked
      }
      this.$store.commit('changeStatus', params)
    },
    // 清除已完成
    clear () {
      this.$store.commit('clearDone')
    },
    // 点击按钮发生变化
    viewkey (key) {
      // console.log(key)
      this.$store.commit('changeKey', key)
    }
  }
}
</script>

<style scoped>
#app {
  padding: 10px;
}

.my_ipt {
  width: 500px;
  margin-right: 10px;
}

.dt_list {
  width: 500px;
  margin-top: 10px;
}

.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
