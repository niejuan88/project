$(function () {
    // 密码规则
    var form = layui.form
    form.verify({
       pwd: [
        /^[\S]{6,12}$/
        ,'密码必须6到12位，且不能出现空格'
        ],
        samePwd: function (value) {
            if (value == $('[name="oldPwd"]').val()) {
                return "新旧密码不能相同！"
            }
        },
        rePwd: function (value) {
            if (value !== $('[name="newPwd"]').val()) {
               return "两次输入密码不一致！"
           }
        }
    })
    // 监听表单提交
    $(".layui-form").submit(function (e) {
        e.preventDefault()
        $.ajax({
            method: "POST",
            url: "/my/updatepwd",
            data: $(this).serialize(),
            success: function (res) {
                if (res.status != 0) {
                   return layui.layer.msg(res.message)
                }
                layui.layer.msg("密码修改成功！")
                // 修改成功后清空输入内容
                $(".layui-form")[0].reset()  
            }
            
       })
    })

})