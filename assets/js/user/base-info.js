$(() => {
    const { layer, form } = layui

    function initUserInfo() {
        axios.get('/my/userinfo')
            .then(function(res) {
                if (res.status !== 0) return layer('获取用户列表失败')
                const { data } = res
                form.val("formUserInfo", data)
            })

        form.verify({
            nick: function(value) {
                if (value.length > 6) {
                    return '昵称长度必须在 1 ~ 6 个字符之间！'
                }
            }
        })
    }
    initUserInfo()
    $('.base-userform').submit(function(e) {
            e.preventDefault()
            axios.post('/my/userinfo', $(this).serialize())
                .then(function(res) {
                    if (res.status !== 0) return layer.msg('修改信息失败!')
                    layer.msg('修改信息成功!')
                    window.parent.getUserInfo()
                })

        })
        // $("#reset-btn").click(function(e) {
        //     e.preventDefault()
        //     initUserInfo()
        // })
})