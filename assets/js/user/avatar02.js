$(() => {


    // 1.1 获取裁剪区域的 元素对象
    var $image = $('#image')
        // 1.2 配置选项
    const options = {
            // 纵横比
            aspectRatio: 1,
            // 指定预览区域
            preview: '.img-preview'
        }
        // 1.3 创建裁剪区域
    $image.cropper(options)

    $('#upload').click(function() {
        $('#file').click()
    })

    $('#file').change(function(e) {
        if (e.target.fils === 0) {
            return layer.msg('请选择照片！')

        }
        var file = e.target.files[0]
        var imgURL = URL.createObjectURL(file)
        console.log(imgURL);

        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', imgURL) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域
    })
    var dataURL = $image
        .cropper('getCroppedCanvas', {
            // 创建一个 Canvas 画布
            width: 100,
            height: 100
        })
        .toDataURL('image/png')

    axios.post('/my/update/avatar', avatar dataURL)
})