window.addEventListener('load', function() {
    var preview_img = document.querySelector('.preview_img');
    var mask = document.querySelector('.mask');
    var big = document.querySelector('.big');

    //鼠标经过出现
    preview_img.addEventListener('mouseover', function() {
        mask.style.display = 'block';
        big.style.display = 'block';
    })

    //鼠标离开消失
    preview_img.addEventListener('mouseout', function() {
        mask.style.display = 'none';
        big.style.display = 'none';
    })

    //鼠标在小图内的坐标 并且让放大镜跟随鼠标
    preview_img.addEventListener('mousemove', function(e) {
        var smallX = e.pageX - this.offsetLeft;
        var smallY = e.pageY - this.offsetTop;
        // console.log(smallX, smallY);
        //鼠标在跟随放大镜的中间offsetWidth 本身的宽度 offsetHeight本身的高度
        var sX = smallX - mask.offsetWidth / 2;
        var sY = smallY - mask.offsetHeight / 2;
        //小盒子内mask的最大移动距离为：
        var maskMax = preview_img.offsetWidth - mask.offsetWidth;
        //放大镜X轴不可以出来 进行if判断
        if (sX <= 0) {
            sX = 0;
        } else if (sX > maskMax) {
            sX = maskMax;
        }
        //放大镜Y轴不可以出来 进行if判断
        if (sY <= 0) {
            sY = 0;
        } else if (sY > maskMax) {
            sY = maskMax;
        }
        //遮挡层 的移动距离 X与Y
        mask.style.left = sX + 'px';
        mask.style.top = sY + 'px';

        //让右边放大镜的图进行跟随移动
        var bigImage = document.querySelector('.bigImage');
        // 大盒子内最大移动距离
        var bigMax = bigImage.offsetWidth - big.offsetWidth;
        //大盒子的移动距离= 小盒子遮挡层的移动距离*大盒子最大移动距离/遮挡层最大移动距离
        //bigX =sX*bigMax / maskMax
        //bigY =sY*bigMax / maskMax
        var bigX = sX * bigMax / maskMax;
        var bigY = sY * bigMax / maskMax;
        bigImage.style.left = -bigX + 'px';
        bigImage.style.top = -bigY + 'px';
    })

})