var that;
class Tab {
    constructor(id) {
        that = this;
        //起名字 最大的盒子为main
        this.main = document.querySelector(id);
        this.add = this.main.querySelector('.tabadd');
        this.ul = this.main.querySelector('.fisrstnav ul:first-child');
        this.tabscon = this.main.querySelector('.tabscon');
        this.init();
    }

    //0、初始化功能
    init() {
        this.update();
        this.add.onclick = this.addTab;
        //给所有li绑定点击事件
        for (var i = 0; i < this.lis.length; i++) {
            this.lis[i].index = i;
            this.lis[i].onclick = this.toggleTab;
            this.removeicon[i].onclick = this.removeTab;
            this.spans[i].ondblclick = this.editTab;
            this.section[i].ondblclick = this.editTab;
        }
    }
    update() {
        this.lis = this.main.querySelectorAll('li');
        this.section = this.main.querySelectorAll('section');
        this.removeicon = this.main.querySelectorAll('.icon-guanbi');
        this.spans = this.main.querySelectorAll('.fisrstnav li span:first-child');
    }

    //1、切换功能
    toggleTab() {
            console.log(this.index);
            that.clearClass();
            this.className = 'liactive';
            that.section[this.index].className = 'conactive';
        }
        //删除操作
    clearClass() {
        for (var i = 0; i < this.lis.length; i++) {
            this.lis[i].className = '';
            this.section[i].className = '';
        }
    }

    //2、添加功能
    addTab() {
        var random = Math.random();
        //(1)创建li元素和section元素
        that.clearClass();
        var li = '<li class="liactive"><span>新标签页</span><span class="iconfont icon-guanbi"></span></li>';
        var section = '<section class="conactive">测试' + random + '</section>';
        //(2)把这两个追加到父元素内
        that.ul.insertAdjacentHTML('beforeend', li);
        that.tabscon.insertAdjacentHTML('beforeend', section);
        that.init();
    }

    //3、删除功能
    removeTab(e) {
        //阻止冒泡
        e.stopPropagation();
        var index = this.parentNode.index;
        // console.log(index);
        //remove可以直接删除指定的元素
        that.lis[index].remove();
        that.section[index].remove();
        that.init();
        //删除不是选择状态的li 原来保持不变
        if (document.querySelector('.liactive')) return;
        //删除选中状态的li 前一个li变成选定状态
        index--;
        //手动调用事件
        that.lis[index] && that.lis[index].click();
    }

    //4、修改功能
    editTab() {
        var str = this.innerHTML;
        // alert(11);
        // 双击禁止选定文字
        window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
        this.innerHTML = '<input type="text" />';
        var input = this.children[0];
        input.value = str;
        //文本框内的文字处于选定状态
        input.select();
        //离开文本框 就把 文本框内的值给span
        input.onblur = function() {
                this.parentNode.innerHTML = input.value;
            }
            //按下回车同样也可赋值
        input.onkeyup = function(e) {
            if (e.keyCode == 13) {
                //手动调用表单失去焦点事件
                this.blur();
            }
        }
    }
}

new Tab('#tab');