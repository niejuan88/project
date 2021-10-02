$(function () {
    // 调用用户信息函数
    getUserInfo()
    // 退出事件

    $("#btnLogOut").click(function () {
        layui.layer.confirm('确认退出登录吗', {icon: 3, title:'提示'}, function(index){
          // 清除本地存储token
        localStorage.removeItem("token")
        // 跳转登录页面
        location.href="/login.html"
            
            layer.close(index);
          });
         
        
    })
})

// 获取用户信息函数
function getUserInfo() {
    $.ajax({
        method: "GET",
        url: "/my/userinfo",
        // headers: {
        //     Authorization:localStorage.getItem("token") || ""
        // },
        success: function (res) {
            if (res.status != 0) {
                return layui.layer.msg("获取用户信息失败")
            }
            // 调用渲染用户信息函数
          renderUserinfo(res.data)
        },
        // 请求成功不成功都会调的有个函数未用户认证进入主页
        // complete: function (res) {
        //     console.log(res)
        //     // 如果身份认证失败
        //     if(res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！") {
        //         // 清除token 返回登录页 
        //         localStorage.removeItem("token")
        //         location.href = "/login.html" 
        //   }
        // }
    })
}
// 渲染用户信息函数
function renderUserinfo(user) {
    // 1.获取用户名字
    var name = user.nickname || user.username
    // 2.渲染用户名字
    $(".welcome").html("欢迎&nbsp;&nbsp;" + name)
    // 3.获取用户头像
    if (user.user_pic != null) {
        // 如果有头像就渲染头像
        $(".layui-nav-img").show().attr("src",user.user_pic)
        $(".text-avatar").hide()
    } else {
        // 没有头像就渲染名字
        $(".layui-nav-img").hide()
        var first=name[0].toUpperCase()
        $(".text-avatar").html(first).show()
    }
}
