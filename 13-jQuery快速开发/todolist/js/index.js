$(function() {
    load();
    //按下回车 把数据存入localStorage里
    $("#title").on("keyup", function(event) {
        if (event.keyCode === 13) {
            if ($(this).val() === "") {
                alert("请输入内容！");
            } else {
                //先读取本地数据 存放到这个local数组中
                var local = getData();
                //现在还是存储在local数组内,如果增加内容就需要数组追加内容 需要把local数组存储到localStorage里
                //不断输入 就追加到数组local内 (以这种格式进行追加)
                local.push({ title: $(this).val(), done: false });
                // 把数组存储到本地数据内
                saveData(local);
                //渲染加载数据
                load();
                //清空输入框内的值
                $(this).val("");
            }
        }
    });

    //点击最后a标签 进行删除操作
    //这里的删除不是移除li 而是在本地存储中删除对应元素
    //步骤 1、先获取本地数据 2、删除修改对应的数据 3、本地数据保存 4、重新渲染li
    $("ol,ul").on("click", "a", function() {
        // 1、先获取本地数据 
        var data = getData();
        // 2、删除对应的数据(给当前a设置一个自定义属性 在生成的时候添加上index值即可)
        var index = $(this).attr("id");
        data.splice(index, 1);
        // 3、本地数据保存 
        saveData(data);
        // 4、重新渲染li
        load();
    })

    //正在进行和已经完成进行互换操作
    $("ul,ol").on("click", "input", function() {
        // 1、先获取本地数据 
        var data = getData();
        // 2、修改对应的数据
        var index = $(this).siblings("a").attr("id");
        data[index].done = $(this).prop("checked");
        // 3、本地数据保存
        saveData(data);
        // 4、重新渲染li
        load();
    })


    //读取本地数据
    function getData() {
        var data = localStorage.getItem("todolist");
        if (data !== null) {
            //本地存储数据的格式是字符串格式 需要转换JSON.parse()
            return JSON.parse(data);
        } else {
            return [];
        }
    }
    //保存本地存储数据
    function saveData(data) {
        localStorage.setItem("todolist", JSON.stringify(data))
    }
    //渲染加载数据
    function load() {
        $("ol,ul").empty();
        var data = getData();
        var donecount = 0;
        var todocount = 0;
        $.each(data, function(index, value) {
            // index是数组中的索引号
            // value是数组中的值
            //给ol添加li
            if (value.done) {
                donecount++;
                $("ul").prepend("<li><input type='checkbox' checked='checked'></input><p>" + value.title + "</p><a href='javascript:;' id=" + index + "></a></li>");
            } else {
                todocount++;
                $("ol").prepend("<li><input type='checkbox'></input><p>" + value.title + "</p><a href='javascript:;' id=" + index + "></a></li>");
            }
        });
        $("#todocount").text(todocount);
        $("#donecount").text(donecount);
    }

})