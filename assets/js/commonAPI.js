axios.defaults.baseURL = 'http://ajax.frontend.itheima.net'

// 添加请求拦截器
axios.interceptors.request.use(function(config) {

    var token = localStorage.getItem('token') || ''
    if (config.url.startsWith('/my')) {
        config.headers.Authorization = token
    }
    return config;
}, function(error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function(response) {
    // 对响应数据做点什么
    const { message, status } = response.data
    if (message == '身份认证失败！' && status == 1) {
        //跳转在清除token
        location.href = 'login.html'
        localStorage.removeItem('token')
    }
    return response.data;
}, function(error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});