$(function() {
    const { form, layer } = layui
    $('.link a').click(function() {
        $('.layui-form').toggle()
    })

    form.verify({
        pass: [
            /^\w{6,12}$/,
            '密码必须6到12位'
        ],
        samePass: function(value) {
            if (value !== $('#pass').val()) {
                return '两次密码不一致'
            }
        }
    })
    $('.reg-form').submit(function(e) {
        e.preventDefault()
        axios.post('/api/reguser', $(this).serialize())
            .then(function(res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg('注册失败')
                }
                return layer.msg('注册成功')
            })
        $('.reg-form a').click()
    })
    $('.login-form').submit(function(e) {
        e.preventDefault()
        axios.post('/api/login', $(this).serialize())
            .then(function(res) {
                if (res.status !== 0) {
                    return layer.msg('登录失败')
                }
                layer.msg('登录成功')
                localStorage.setItem('token', res.token)
                location.href = './index.html'
                    // console.log(res);
            })

    })
})