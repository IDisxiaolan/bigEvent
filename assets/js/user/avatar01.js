$(() => {
    const { form, layer } = layui
    const $image = $('#image')
    $image.cropper({
        aspectRatio: 1 / 1,
        crop: function(event) {

        },
        preview: '.img-preview'
    });
    $('#upload_btn').click(function() {
        $('#file').click()
    })
    $('#file').change(function() {
        if (this.files.length == 0) return
        const imgUrl = URL.createObjectURL(this.files[0])
        $image.cropper('replace', imgUrl)
            // $image.cropper('destroy').prpo('src'.imgUrl).cropper({})


    })

    $('.layui-btn-danger').click(function() {
        console.log('hello');
        const avatarUrl = $image.cropper('getCroppedCanvas', {
                width: 100,
                height: 100
            }).toDataURL('images/png')
            // console.log(avatarUrl);
        const search = new URLSearchParams()
        search.append('avatar', avatarUrl)

        axios.post('/my/update/avatar', search)
            .then(function(res) {
                console.log(res)
                if (res.status !== 0) return layer.msg('上传失败')
                window.parent.getUserInfo()
            })

    })


})