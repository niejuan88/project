$(function () {
    // 登录注册切换
    $("#link_reg").on("click", function () {
        $(".reg-box").show()
        $(".login-box").hide()
    })
    $("#link_login").on("click", function () {
        $(".login-box").show()
        $(".reg-box").hide()
    })
     
  
    // 注册再次确认密码
    var form = layui.form
    form.verify({
    pwd: [
      /^[\S]{6,12}$/
      ,'密码必须为6到12位数字字母，且不能出现空格'
      ],
   repwd: function (value) {
       var pwd = $('.reg-box [name="password"]').val()
       if (pwd !== value) {
           return "两次密码不一致！"
       }
   }
    });


    var layer =layui.layer
    // 监听注册表单提交事件
    $("#form_reg").on("submit", function (e) {
        // 阻止表单提交默认行为
        e.preventDefault()
        var data={ username: $('.reg-box [name="username"]').val(), password: $('.reg-box [name="password"]').val()}
        // 发ajax post请求
        $.post("/api/reguser",data ,function (res) {
            if (res.status != 0) {
             return layer.msg(res.message)
            }
            layer.msg("注册成功,请登录！")
            $("#link_login").click()
        })     
    })
    2
    // 监听登录表单提交事件
    $("#form_login").submit(function (e) {
        // 阻止表单提交默认行为
        e.preventDefault()
        // 发接口请求       
        $.ajax({
            url: "/api/login",
            method: "post",
            //快速获取表单数据
            data: $(this).serialize(),
            success:function (res) {
                if (res.status != 0) {
                  return  layer.msg("登录失败！")
                }
                layer.msg("登录成功")
                // 获取token值存到本地存储
                localStorage.setItem("token", res.token)
                // 登录成功后跳转主页
                location.href="/index.html"
            }
        })   
    })
})
