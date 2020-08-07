$(function() {
    //1、最下面的全选(checkedall)和全不选 按钮 更改 内容区域的勾选状态(con-checked)
    $(".checkedall").change(function() {
        //全选按钮是否勾选
        $(".con-checked, .checkedall").prop("checked", $(this).prop("checked"));
        //添加背景颜色
        if ($(this).prop("checked")) {
            $(".cart-item").addClass("check-cart-item");
        } else {
            $(".cart-item").removeClass("check-cart-item");
        }
    });
    //2、小按钮(con-checked)判断有几个 如果全部选择 那么就勾选全选(checkedall)
    $(".con-checked").change(function() {
        //小按钮勾选的个数$(".con-checked:checked").length;
        //小按钮的个数$(".con-checked").length
        if ($(".con-checked:checked").length === $(".con-checked").length) {
            $(".checkedall").prop("checked", true);
        } else {
            $(".checkedall").prop("checked", false);
        }
        //添加背景颜色
        if ($(this).prop("checked")) {
            $(this).parents(".cart-item").addClass("check-cart-item");
        } else {
            $(this).parents(".cart-item").removeClass("check-cart-item");
        }
    });
    //3、购物车增减商品数量
    //当点击+号(increment)就先自增 后赋值给文本框
    $(".increment").click(function() {
        let num = $(this).siblings(".itxt").val();
        num++;
        $(this).siblings(".itxt").val(num);
        //修改商品小计
        //获取单品商品的价格
        let price = $(this).parents(".p-num").siblings(".p-price").html();
        //截取字符串 把￥截掉
        price = price.substr(1);
        //单品商品的小计
        // $(this).parent().parent().siblings(".p-sum").text("￥" + num * price);
        $(this).parents(".p-num").siblings(".p-sum").text("￥" + (num * price).toFixed(2));
        getSum();
    });
    //当点击-号(decrement)就先自减 后赋值给文本框
    //如果值为1 则不能继续减
    $(".decrement").click(function() {
        let num = $(this).siblings(".itxt").val();
        // console.log(num);
        if (num == 1) {
            return false;
        }
        num--;
        $(this).siblings(".itxt").val(num);
        //4、修改商品小计
        //获取单品商品的价格
        let price = $(this).parents(".p-num").siblings(".p-price").html();
        // console.log(price);
        //截取字符串 把￥截掉
        price = price.substr(1);
        // console.log(price);
        //单品商品的小计
        // $(this).parent().parent().siblings(".p-sum").text("￥" + num * price);
        $(this).parents(".p-num").siblings(".p-sum").text("￥" + (num * price).toFixed(2));
        getSum();
    });
    //BUG 如果用户直接修改文本框内的值 那么就不会自动修改商品小计
    //5、input表单change事件
    $(".itxt").change(function() {
        let num = $(this).val();
        let price = $(this).parents(".p-num").siblings(".p-price").html();
        price = price.substr(1);
        $(this).parents(".p-num").siblings(".p-sum").text("￥" + (num * price).toFixed(2));
        getSum();
    });
    getSum();
    //6、计算总计和总额 进行封装一个函数使用
    function getSum() {
        let total = 0; //总件数
        let sum = 0; //总价格
        //总件数
        $(".itxt").each(function(index, domEle) {
            //index是索引号 不要 domEle是每个元素的值
            total += parseInt($(domEle).val());
        });
        $(".amount-sum em").text(total);

        //总价格
        $(".p-sum").each(function(index, domEle) {
            sum += parseFloat($(domEle).text().substr(1));
        });
        $(".price-sum em").text("￥" + sum.toFixed(2));
    }
    //7、删除商品模块
    //商品后面的删除按钮
    $(".p-action a").click(function() {
        $(this).parents(".cart-item").remove();
        getSum();
    });
    //删除选中的商品
    $(".operation .remove-batch").click(function() {
        $(".con-checked:checked").parents(".cart-item").remove();
        getSum();
    });
    //清理购物车
    $(".operation .clear-all").click(function() {
        $(".cart-item-list").empty();
        getSum();
    })

    //8、选中商品添加背景模块
    //小的复选框 选中添加背景图片 否则移除

})