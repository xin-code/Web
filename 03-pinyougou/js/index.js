window.addEventListener('load', function() {
    var focus = document.querySelector('.focus');
    var arrow_l = document.querySelector('.arrow-l');
    var arrow_r = document.querySelector('.arrow-r');
    //1、鼠标经过轮播图的时候 左箭头与右键头的显示与隐藏
    //显示
    focus.addEventListener('mouseenter', function() {
        arrow_l.style.display = 'block';
        arrow_r.style.display = 'block';
        //鼠标悬停 停止轮播图事件
        clearInterval(timer);
        //清除定时器变量
        timer = null;
    })

    //隐藏
    focus.addEventListener('mouseleave', function() {
        arrow_l.style.display = 'none';
        arrow_r.style.display = 'none';
        //鼠标离开 继续轮播图事件
        timer = setInterval(function() {
            //手动调用点击事件
            arrow_r.click();
        }, 4000);
    })

    //2、动态生成小圆圈for循环 从focus中的小li中 生成个数放入ol中
    var ul = focus.querySelector('ul');
    var ol = focus.querySelector('ol');
    //聚焦图的长度
    var focusWidth = focus.offsetWidth;
    //查看有几个li
    // console.log(ul.children);
    for (var i = 0; i < ul.children.length; i++) {
        // 创建一个li
        var li = document.createElement('li');
        //并且设置一个自定义属性setAttribute 用来再点击小圆圈的时候 能够知道索引号
        li.setAttribute('index', i);
        // 放入到ol中
        ol.appendChild(li);
        //3、设置小圆圈 点击变成当前属性  ★排他思想
        li.addEventListener('click', function() {
            //干掉其他人
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
            } //留下我自己
            this.className = 'current';

            //4、点击小圆圈后 可以进行图片移动 
            //当点击到小圆圈 那么就可以获得索引号。用getAttribute
            var index = this.getAttribute('index');
            //打印一下图片的自定义序号 console.log(index);
            //算法：小圆圈的索引号*图片的宽度 = ul移动的距离 往左走 就是负的
            //打印一下图片的宽度 console.log(focusWidth);
            animate(ul, -index * focusWidth);
        })
    }
    //设置第一个小圆圈是current类
    ol.children[0].className = 'current';

    //5、克隆操作 克隆(true 深复制)第一张滚动图 翻到ul 最后面
    //因为在生成小圆圈的后面写的 所以没有多一个小圆圈
    var first = ul.children[0].cloneNode(true);
    ul.appendChild(first);

    //6、点击右侧按钮 图片滚动一张
    //声明一个变量 每点击一次 就自增1 图片往后滚动一次
    var num = 0;
    var circle = 0;
    //flag 节流阀
    flag = true;
    arrow_r.addEventListener('click', function() {
        if (flag) {
            flag = false //关闭节流阀

            //进行判断是否到最后一张
            if (num == ul.children.length - 1) {
                ul.style.left = 0;
                num = 0;
            }
            //如果这样进行右点击操作的话 会出现漏底的现象，需要把第一张图片做一个克隆 到最后一张
            num++;
            animate(ul, -num * focusWidth, function() {
                flag = true;
            });

            //7、点击右侧按钮(也在点击按钮事件内) 则 下面的小圆圈一起变化 
            circle++;

            //优化
            circle = circle == ol.children.length ? 0 : circle;

            //调用函数
            circleChange();
        }
    })

    //8、点击左侧侧按钮 图片滚动一张
    arrow_l.addEventListener('click', function() {
        if (flag) {
            flag = false;

            //进行判断是否为第一张
            if (num == 0) {
                num = ul.children.length - 1;
                ul.style.left = num * focusWidth + 'px';
            }
            //如果这样进行右点击操作的话 会出现漏底的现象，需要把第一张图片做一个克隆 到最后一张
            num--;
            animate(ul, -num * focusWidth, function() {
                flag = true;
            });

            //9、点击左侧按钮(也在点击按钮事件内) 则 下面的小圆圈一起变化 
            circle--;

            //优化
            circle = circle < 0 ? ol.children.length - 1 : circle;

            //调用函数
            circleChange();
        }
    })

    function circleChange() {
        //current 类 排他思想 有BUG 是因为图片有5张 克隆了一张 实际有4个小圆圈
        for (var i = 0; i < ol.children.length; i++) {
            //干掉其他人
            ol.children[i].className = '';
        }
        //留下我自己
        ol.children[circle].className = 'current';
    }

    //10.添加定时器
    var timer = setInterval(function() {
        //手动调用点击事件
        arrow_r.click();
    }, 4000);

    //刷新页面调用一次
    toggleTool();
    //电梯导航条
    $(window).scroll(function() {
        toggleTool();
        //滚动时相对应的模块自动转换电梯导航栏的current
        $(".floor .w").each(function(index, element) {
            if ($(document).scrollTop() >= $(element).offset().top) {
                $(".fixedtool li").eq(index).addClass("fixedtool_cur").siblings().removeClass("fixedtool_cur");
            }
        })
    });

    //点击电梯导航栏滚动到相对应模块
    $(".fixedtool li").on("click", function() {
        var contop = $(".floor .w").eq($(this).index()).offset().top;
        // 页面效果滚动
        $("html,body").stop().animate({
            scrollTop: contop,
        });
        // 添加当前类
        $(this).addClass("fixedtool_cur").siblings().removeClass("fixedtool_cur");
    });

    //电梯导航栏显示与隐藏封装函数
    function toggleTool() {
        if ($(document).scrollTop() >= $(".recommend").offset().top) {
            $(".fixedtool").fadeIn();
        } else {
            $(".fixedtool").fadeOut();
        }
    }
})