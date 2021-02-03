$(() => {
    const { form, layer } = layui
    const query = {
        pagenum: '1', //页码值
        pagesize: '2', //	每页显示多少条数据
        cate_id: '', //文章分类的 Id
        state: '' //返回状态;已发布、草稿
    }

    //时间格式化
    // template.defaults.imports.dateformat = function(data) {
    //     var data = new Date(data);
    //     var year = data.getFullYear();
    //     var month = addZero(data.getMonth() + 1);
    //     var day = addZero(data.getDate());
    //     var hour = addZero(data.getHours());
    //     var minute = addZero(data.getMinutes());
    //     var second = addZero(data.getSeconds());
    //     return year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
    // }
    template.defaults.imports.dateformat = function(data) {
        return moment(data).format("YYYY/MM/DD, HH:mm:ss");
    }

    function addZero(val) {
        if (val < 10) {
            return "0" + val;
        } else {
            return val;
        }
    };
    //获取文章列表
    getlist()

    function getlist() {
        axios.get('/my/article/list', { params: query })
            .then(function(res) {
                if (res.status !== 0) return
                layer.msg('获取文章列表成功！')
                console.log(res);
                const htmlStr = template('tpl', res)
                $('tbody').html(htmlStr)
            })
    }

    initCate()
        // 初始化文章分类的方法
    function initCate() {
        axios.get('/my/article/cates')
            .then(function(res) {
                if (res.status !== 0) return layer.msg('获取分类数据失败！')
                var htmlStr = template('tpl-cate', res)
                $('[name=cate_id]').html(htmlStr)
                form.render()
            })
    }
    $('.form-search').on('submit', function(e) {
        e.preventDefault()
            // 获取表单中选中项的值
        var cate_id = $('[name=cate_id]').val()
        var state = $('[name=state]').val()
            // 为查询参数对象 q 中对应的属性赋值
        query.cate_id = cate_id
        query.state = state
        getlist()
    })
})