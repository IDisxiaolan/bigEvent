$(function() {
    const { layer, form } = layui
    let state;
    getCaseList()
        //1.0发送请求获取文章分类列表,渲染到select
    function getCaseList() {
        axios.get('/my/article/cates')
            .then(res => {
                // console.log(res);
                if (res.status !== 0) return layer.msg('获取失败')

                res.data.forEach(item => {
                    $('.fenlei').append(`<option value="${item.Id}">${item.name}</option>`)
                })
                form.render();
            })
    }
    //2.0富文本
    initEditor()

    //3.0初始化裁剪cropper
    $image = $('#image')
        //3.1 裁剪比例;预览区域
    $image.cropper({
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    });
    //3.2点击上传触发input点击事件
    $('#fengmian').click(function() {
            $('#file').click()
        })
        // 3.3监听input的change事件  拿到files  创建对应的 URL 地址 ,替换裁剪区域图片 
    $('#file').change(function() {
            if (this.files[0].length == 0) return
            console.log(this.files);
            const imgUrl = URL.createObjectURL(this.files[0])
            $image.cropper('replace', imgUrl)
        })
        //4.0 form表单创建 参数为1.0title 2.0cate_id 3.0conten 4.0cover_img 5.0state的FormData对象 
    $('.publish-form').submit(function(e) {
        e.preventDefault()
        const fd = new FormData(this)
        fd.forEach(item => {
            console.log(item); //1.0title 2.0cate_id 3.0conten
        })
        fd.append('state', state)
            //将封面裁剪过后的图片， 输出为一个文件对象
        $image.cropper('getCroppedCanvas', {
            width: 400,
            height: 280
        }).toBlob(blob => {
            console.log(blob);
            fd.append('cover_img', blob) //4.0cover_img

            sublishArticle(fd) //传参
        })
    })
    $('.last-row button').click(function() {
            state = $(this).data('state') //5.0state
            console.log(state);
        })
        // 5.0发送请求
    function sublishArticle(fd) {
        axios.post('/my/article/add', fd)
            .then(res => {
                if (res.status !== 0) return layer.msg('发布文章失败')

                layer.msg(state == '草稿' ? '发布草稿成功' : '发布文章成功')

            })
    }
})