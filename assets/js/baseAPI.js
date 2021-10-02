// 每次发ajax请求前会会调用这个函数
$.ajaxPrefilter(function (options) {
    options.url = "http://api-breakingnews-web.itheima.net" + options.url;
        if (options.url.indexOf("/my/")) {
            options.headers= {
                Authorization:localStorage.getItem("token") || ""
            }  
        }
    // 请求成功不成功都会调的有个函数未用户认证进入主页
     options.complete=function (res) {
            // 如果身份认证失败
            if(res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！") {
                // 清除token 返回登录页 
                localStorage.removeItem("token")
                location.href = "/login.html" 
          }
        }
 
})