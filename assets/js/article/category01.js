$(() => {
    let index = null
        // let index02 = null
    const { form, layer } = layui
    readerList()

    function readerList() {
        axios.get('/my/article/cates')
            .then(function(res) {
                if (res.status !== 0) return layer.msg('获取文章类别')
                const htmlStr = template('tpl-table', res)
                $('tbody').html(htmlStr)
            })
    }

    $('#edit-add').click(function() {
        inedx = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章分类',
            content: $('#dialog-add').html()
        })
    })


    $(document).on('submit', '#form-add', function(e) {
        e.preventDefault()
        axios.post('/my/article/addcates', $(this).serialize())
            .then(function(res) {
                if (res.status !== 0) return layer.msg('新增文章分类失败！')
                layer.close(layer.index)
                layer.msg('新增文章分类成功！')
                readerList()
            })
    })


    $(document).on('click', '.btn-edit', function(e) {

        index = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '修改文章分类',
            content: $('#dialog-edit').html()
        })


        var id = $(this).data('id')
        console.log(id);
        // 发起请求获取对应分类的数据
        axios.get(`/my/article/cates/${id}`)
            .then(function(res) {
                if (res.status !== 0) return
                form.val('form-edit', res.data)
            })
    })

    $(document).on('submit', '#form-edit', function(e) {
        e.preventDefault()
        axios.post('/my/article/updatecate', $(this).serialize())
            .then(function(res) {
                if (res.status !== 0) return layer.msg('修改文章分类失败')
                layer.close(layer.index)
                readerList()
            })
    })


    $(document).on('click', '.btn-delete', function() {
        var id = $(this).attr('data-id')
        console.log(id);
        layer.confirm('is not?', { icon: 3, title: '提示' }, function(index) {
            //do something
            axios.get('/my/article/deletecate/' + id)
                .then(function(res) {
                    console.log(res);
                    if (res.status !== 0) return layer.msg('删除文章分类失败！')
                    layer.msg('删除文章分类成功')
                    readerList()
                })
            layer.close(index);
        });
        //eg2
        // layer.confirm('is not?', function(index) {
        //     //do something

        //     layer.close(index);
        // });
    })
})