window.addEventListener('load', function() {
    //手机号
    var regtel = /^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
    //密码
    var regpsw = /^[a-zA-Z]\w{5,17}$/;

    var tel = document.querySelector('#tel');
    var psw = document.querySelector('#psw');
    regexp(tel, regtel);
    regexp(psw, regpsw);

    function regexp(ele, reg) {
        ele.addEventListener('blur', function() {
            if (reg.test(this.value)) {
                // console.log('正确');
                //this.nextElementSibling下一个兄弟 span
                this.nextElementSibling.className = 'success';
                this.nextElementSibling.innerHTML = '<i class="success_icon"></i>恭喜你输入正确！';
            } else {
                // console.log('错误');
                this.nextElementSibling.className = 'error';
                this.nextElementSibling.innerHTML = '<i class="error_icon"></i>格式不正确，请从新输入';
            }
        })
    }

    //确认密码
    var conpsw = document.querySelector('#conpsw');
    conpsw.addEventListener('blur', function() {
        if (this.value == psw.value) {
            this.nextElementSibling.className = 'success';
            this.nextElementSibling.innerHTML = '<i class="success_icon"></i>恭喜你输入正确！';
        } else {
            this.nextElementSibling.className = 'error';
            this.nextElementSibling.innerHTML = '<i class="error_icon"></i>两次输入不一致！';
        }
    })
})