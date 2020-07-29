window.addEventListener('load', function() {
    var focus = document.querySelector('.focus');
    var arrow_l = document.querySelector('.arrow-l');
    var arrow_r = document.querySelector('.arrow-r');
    //1、鼠标经过轮播图的时候 左箭头与右键头的显示与隐藏
    //显示
    focus.addEventListener('mouseenter', function() {
        arrow_l.style.display = 'block';
        arrow_r.style.display = 'block';
    })

    //隐藏
    focus.addEventListener('mouseleave', function() {
        arrow_l.style.display = 'none';
        arrow_r.style.display = 'none';
    })

    //2、动态生成小圆圈for循环 从focus中的小li中 生成个数放入ol中
    var ul = focus.querySelector('ul');
    var circle = focus.querySelector('.circle');
    //查看有几个li
    // console.log(ul.children);
    for (var i = 0; i < ul.children.length; i++) {
        // 创建一个li
        var dot = document.createElement('li');
        // 放入到ol中
        circle.appendChild(dot);
        //3、设置小圆圈 点击变成当前属性  ★排他思想
        dot.addEventListener('click', function() {
            //干掉其他人
            for (var i = 0; i < circle.children.length; i++) {
                circle.children[i].className = '';
            } //留下我自己
            this.className = 'current';

        })
    }
    //设置第一个小圆圈是current类
    circle.children[0].className = 'current';



})