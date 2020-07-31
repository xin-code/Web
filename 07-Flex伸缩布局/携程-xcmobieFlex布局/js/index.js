window.addEventListener('load', function() {
    // 获取元素
    var focus = document.querySelector('.focus');
    var ul = focus.children[0];
    var width = focus.offsetWidth;
    var ol = focus.querySelector('ol');
    var num = 0;
    //开启定时器
    var timer = setInterval(function() {
        num++;
        var yidongjuli = -num * width;
        ul.style.transition = 'all .5s';
        ul.style.transform = 'translateX(' + yidongjuli + 'px)';
    }, 1000);
    //transitionend 判断是否完成过渡完成
    ul.addEventListener('transitionend', function() {
        // 无缝滚动 
        if (num >= 3) {
            num = 0;
            //去掉过渡效果 跳到过渡位置
            ul.style.transition = 'none';
            //最新索引号 去 下一张图片
            var yidongjuli = -num * width;
            ul.style.transform = 'translateX(' + yidongjuli + 'px)';
        } else if (num <= 0) {
            num = 2;
            ul.style.transition = 'none';
            var yidongjuli = -num * width;
            ul.style.transform = 'translateX(' + yidongjuli + 'px)';
        }
        //小圆点 跟随变化
        //把ol里面的li带有current 的类选出来remove掉
        ol.querySelector('.current').classList.remove('current');
        //让当前索引号的小li加上current
        ol.children[num].classList.add('current');
    });
    //手指滑动轮播图
    //初始化
    var startX = 0;
    //移动距离
    var moveX = 0;
    //触摸元素 touchstart
    //节流阀
    var flag = false;
    ul.addEventListener('touchstart', function(e) {
        startX = e.targetTouches[0].pageX;
        clearInterval(timer);
    });
    //移动手指 touchmove
    ul.addEventListener('touchmove', function(e) {
        moveX = e.targetTouches[0].pageX - startX;
        var translateX = -num * width + moveX;
        ul.style.transition = 'none';
        ul.style.transform = 'translateX(' + translateX + 'px)';
        //手指按下后，在进行判断效果  否则不进行下面的判断
        flag = true;
        //取消默认屏幕滚动行为
        e.preventDefault();
    });
    //离开手指 touchend 
    ul.addEventListener('touchend', function() {
        if (flag) {
            // 大于50px 就跳到下一张图片
            if (Math.abs(moveX) > 50) {
                //如果是右滑 就是播放上一张 moveX是正值
                if (moveX > 0) {
                    num--;
                } else {
                    //如果是左滑 就是播放下一张 moveX是负值
                    num++;
                }
                var translateX = -num * width;
                ul.style.transition = 'all .3s';
                ul.style.transform = 'translateX(' + translateX + 'px)';
            } else {
                //小于50px 还是本张轮播图
                var translateX = -num * width;
                ul.style.transition = 'all .3s';
                ul.style.transform = 'translateX(' + translateX + 'px)';
            }
        }
        //手指离开重新开始计时器
        clearInterval(timer);
        timer = setInterval(function() {
            num++;
            var yidongjuli = -num * width;
            ul.style.transition = 'all .5s';
            ul.style.transform = 'translateX(' + yidongjuli + 'px)';
        }, 1000);
    });
    //返回顶部事件
    var goback = document.querySelector('.goback');
    var local_nav = document.querySelector('.local_nav');
    window.addEventListener('scroll', function() {
        if (window.pageYOffset >= local_nav.offsetTop) {
            goback.style.display = 'block';
        } else {
            goback.style.display = 'none';
        }
    });
    //点击返回顶部
    goback.addEventListener('click', function() {
        window.scroll(0, 0);
    });

})