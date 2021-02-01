$(() => {
    let index
    const { form } = layui
    getCateList()

    function getCateList() {
        axios.get('/my/article/cates')
            .then(function(res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg('获取分类列表失败')

                }
                layer.msg('获取分类列表成功')
                const htmlStr = template('tpl', res)
                $('tbody').html(htmlStr)
            })
    }

    $('.add_btn').click(function() {
        index = layer.open({
            type: 1,
            title: '添加文章分类',
            content: $('.addform').html(),
            area: ['500px', '250px']
        });
    })
    $(document).on('submit', '.addform', function(e) {
        e.preventDefault()
        axios.post('/my/article/addcates', $(this).serialize())
            .then(res => {
                console.log(res);
                if (res.status !== 0) return "提交失败"
                layer.close(index);
                getCateList()
            })
    })


    $(document).on('click', '.edit-btn', function(e) {
        e.preventDefault()
        index = layer.open({
            type: 1,
            title: '添加文章分类',
            content: $('.edit-container').html(),
            area: ['500px', '250px']
        });
        const id = $(this).data('id')

        axios.get(`/my/article/deletecate/${id}`)
            .then(function(res) {
                console.log(res);
                if (res.status !== 0) return
                    // form.val()
            })
    })
    $(document).on('sunblit', 'edit-btn', function(e) {
        e.preventDefault()
        axios('/my/article/updatecate', $(this).serialize())
            .then(function(res) {
                if (res.status !== 0) return
                layer.msg('更新成功')
                layer.close(index)
                getCateList()
            })
    })
})