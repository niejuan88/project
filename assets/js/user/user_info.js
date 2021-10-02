$(function () {
    var form = layui.form;
    form.verify({
        nickname: function (value) {
            if(value.length > 6){
                return "用户昵称必须1-6位"
            }
        }
    })
    initUserInfo()
    // 1.获取用户信息,渲染到表单中显示
    function initUserInfo() {
            $.ajax({
            method: "GET",
            url: "/my/userinfo",
            success: function (res) {
                if (res.status != 0) {
                   return layui.layer.msg("获取用户信息失败！")
               }
                layui.form.val("formUserInfo",res.data);
            }
        })
    }
    // 2.修改用户信息提交表单
    $(".layui-form").submit(function (e) {
        e.preventDefault()
        $.ajax({
            method: "POST",
            url: "/my/userinfo",
            data: $(this).serialize(),
            success: function (res) {
                if (res.status != 0) {
                   return layui.layer.msg("修改用户信息失败！")
                }
                layui.layer.msg(res.message)
                // 修改成功后左侧立刻刷新显示更改的用户名
                window.parent.getUserInfo()
            }
        })
    })
 
        // 3.重置按钮
    $("#resetBtn").on("click", function (e) {
        e.preventDefault()
        // 获取用户信息,渲染到表单中显示
        initUserInfo()
    })
})