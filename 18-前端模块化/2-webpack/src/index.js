import $ from 'jquery'
import './css/index.css'
import './css/index.less'
import './css/index.scss'


$(function() {
    $('li:odd').css('backgroundColor', 'pink');
    $('li:even').css('backgroundColor', 'skyblue');
})

class Person {
    static info = '123'
}
console.log(Person.info);

//```````````````````````````

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