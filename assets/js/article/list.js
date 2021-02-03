$(() => {
    const { layer, form, laypage } = layui
    getCaseList()

    function getCaseList() {
        axios.get('/my/article/cates')
            .then(res => {
                // console.log(res);
                if (res.status !== 0) return layer.msg('获取失败')
                res.data.forEach(item => {
                    var htmlStr = template('tpl-cate', res)
                    $('[name=cate_id]').html(htmlStr)
                    form.render();
                })
            })
    }
    const query = {
        pagenum: 1,
        pagesize: 2,
        cate_id: '',
        state: ''
    }


    function renderTable() {
        axios.get('/my/article/list', { params: query })
            .then(function(res) {
                console.log(res);
                if (res.status !== 0) return
                const htmlStr = template('tpl', res)

                $('tbody').html(htmlStr)

                randerPage(res.total)
            })
    }
    renderTable()

    function randerPage(total) {
        laypage.render({
            elem: 'test1' //注意，这里的 test1 是 ID，不用加 # 号
                ,
            count: total //数据总数，从服务端得到.,
                ,
            limit: query.pagesize //每页显示的数量
                ,
            limits: [2, 3, 4, 5] //每页的数据条数
                ,
            curr: query.pagenum //当前页码值
                ,
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            jump: function(obj, first) {
                //obj包含了当前分页的所有参数，比如：
                console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
                console.log(obj.limit); //得到每页显示的条数

                query.pagenum = obj.curr //把点击的页码值给 pagenum
                query.pagesize = obj.limit
                    //首次不执行
                if (!first) {
                    //do something
                    renderTable() //重新渲染页面
                }
            }
        })
    }

    $('#shaixuan').click(function(e) {
        e.preventDefault()
        const cate_id = $('#cate-sel').val()
        const state = $('#state').val()
        query.cate_id = cate_id
        query.state = state

        //发送请求前 修改页面值 01
        quer1.pagenum = 1;
        renderTable()
    })

    $('tbody').on('click', '.del', function() {
            console.log('hello');
            const id = $(this).attr('data-id')

            layer.confirm('确认删除吗?', { icon: 3, title: '提示' }, function(index) {
                axios.get(`/my/article/delete/${id}`)
                    .then(function(res) {
                        if (res.status !== 0) {
                            return layer.msg('删除失败!')
                        }
                        layer.msg('删除成功!')
                        if ($('.del-btn').length == 1 && query.pagenum !== 1) {
                            query.pagenum--;
                        }
                        renderTable()
                    })
                layer.close(index)
            })
        })
        //点击编辑 带着参数id 跳转到 edit.html
    $('tbody').on('click', '.edit-btn', function() {
        const id = $(this).data('id')
        location.href = `./edit.html?id=${id}`

        window.parent.$('layui-this').next().find('a').click()
    })
})