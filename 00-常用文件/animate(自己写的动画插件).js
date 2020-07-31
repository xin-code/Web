//动画函数
//包括1.回调函数 2.缓动动画
function animate(obj, target, callback) {
    //首先调用一次停止计时器，是因为只让计时器工作一次
    clearInterval(obj.timer);
    //设置计时器
    obj.timer = setInterval(function() {
        //停止计时器
        if (obj.offsetLeft == target) {
            clearInterval(obj.timer);
            //如果存在回调函数，再调用
            // if (callback) {
            //     callback();
            // }
            callback && callback();
            //如果当前位置和目标值不相等的话，就进行移动
        } else {
            var step = (target - obj.offsetLeft) / 10;
            step = step > 0 ? Math.ceil(step) : Math.floor(step);
            //把每次10像素变成一个慢慢变小的值 把10换成一个慢慢变小的变量
            // obj.style.left = obj.offsetLeft + 10 + 'px';
            //(目标值-现在位置)/10
            obj.style.left = obj.offsetLeft + step + 'px';
        }
    }, 15);
}