$(function() {
    var form = layui.form

    form.verify({
        pass: [
            /^\w{6,12}$/,
            '密码6到12位'
        ],
        confirmPass: function(val) {
            if (val !== $('#pwd').val()) {
                return '两次密码不一致'
            }
        }
    })

    $('.layui-form').submit(function(e) {
        e.preventDefault()
        axios.post('/my/updatepwd', $(this).serialize())
            .then(function(res) {
                if (res.status !== 0) {
                    return layer.msg('修改密码失败!')
                }
                layer.msg('修改密码成功')
                $('.layui-form')[0].reset()
            })
    })
})