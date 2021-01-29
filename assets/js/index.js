$(() => {
    getUserInfo()

    $('#tuichu').click(function() {
        localStorage.removeItem('token')
        location.href = 'login.html'
    })
})

function getUserInfo() {

    const layer = layui
    axios.get('/my/userinfo')
        .then(function(res) {
            // console.log(res);
            if (res.status !== 0) { return layer.msg('获取用户信息失败!') }
            const { data } = res

            const name = data.nickname || data.username
                //2.昵称渲染
            $('.nickname').text(`欢迎${name}`)
                //3.头像
            if (data.user_pic) {
                $('.avatar').attr('src', data.user_pic).show()
                $('.text-avatar').hide()
            } else {
                $('.avatar').hide()
                $('.text-avatar').text(name[0].toUpperCase()).show()
            }
        })

}