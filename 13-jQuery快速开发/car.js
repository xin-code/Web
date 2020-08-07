$(function() {
    //最下面的全选(checkedall)和全不选 按钮 更改 内容区域的勾选状态(con-checked)
    $(".checkedall").change(function() {
        //全选按钮是否勾选
        // console.log($(this).prop("checked"));
        $(".con-checked, .checkedall").prop("checked", $(this).prop("checked"));
    });
    //小按钮(con-checked)判断有几个 如果全部选择 那么就勾选全选(checkedall)
    $(".con-checked").change(function() {
        //小按钮是否勾选
        // console.log($(this).prop("checked"));
        //小按钮勾选的个数$(".con-checked:checked").length;
        //小按钮的个数$(".con-checked").length
        if ($(".con-checked:checked").length === $(".con-checked").length) {
            $(".checkedall").prop("checked", true);
        } else {
            $(".checkedall").prop("checked", false);
        }
    })

})