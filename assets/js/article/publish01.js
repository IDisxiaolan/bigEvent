$(() => {
    const { form, layer } = layui
    // 加载文章分类
    initCate()
    let state = null;

    //1.渲染select选择框
    function initCate() {
        axios.get('/my/article/cates')
            .then(function(res) {
                if (res.status !== 0) return
                console.log(res);
                //下拉选择框
                var htmlStr = template('tpl', res)
                $('#dropdown').html(htmlStr)
                form.render()
            })
    }
    //2.富文本
    initEditor()
        //3.0文章封面
    $('#fengmian').click(function(e) {
        e.preventDefault()
        $('#photo').click()
    })
    var $image = $('#image')
        //3.1初始化裁剪器
    var options = { // 3.2 裁剪选项
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }
    $image.cropper(options) //3.3初始化裁剪区域

    //3.4将选择的图片设置到裁剪区域中
    $('#photo').change(function() {
            // console.log(this.files);
            if (this.files.length == 0) return
                // 根据文件，创建对应的 URL 地址
            var imgUrl = URL.createObjectURL(this.files[0])
            $image.cropper('replace', imgUrl)
        })
        // ==============================
        //4.0form表单 formData数据        1.0title 2.0cate_id 3.0conten 4.0cover_img 5.0state
    $('#biaodan').on('submit', function(e) {
            e.preventDefault()
                // 4:.1.2.3
            const formData = new FormData(this)
            formData.append('state', current)

            $image
                .cropper('getCroppedCanvas', {
                    width: 400,
                    height: 280
                })
                .toBlob(blob => {
                    formData.append('cover_img', blob)
                })
            formData.forEach(item => {
                console.log(item);
            })
            sublishArticle(formData)


        })
        //4.5 state
    $('.fabuOrcaogao button').click(function() {
            current = $(this).data('state')
        })
        //5.0发送请求
    function sublishArticle(formData) {
        axios.post('/my/article/add', formData)
            .then(res => {
                if (res.status !== 0) return layer.msg('发布文章失败')
                layer.msg(state == '草稿' ? '发布草稿成功' : '发布文章成功')
                    // window.parent.$('.layui-this').prve().find('a').click()
            })
    }

})