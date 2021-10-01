// 每次发ajax请求前会会调用这个函数
$.ajaxPrefilter(function (options) {
    options.url = "http://api-breakingnews-web.itheima.net" + options.url
 
})