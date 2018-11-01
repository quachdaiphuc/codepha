var _token = $("input[name='_token']").val()

$('.active-repo').on('click', function () {
    let owner = $(this).data('owner')
    let repository = $(this).data('repository')
    let url = ROOT_APP + '/admin/repos/create-hook'

    $.ajax(url, {
        type: 'post',
        data: {
            _token:_token,
            owner: owner,
            repository: repository
        },
        success: function (data) {
            toastr.success(data.meta.message.main)
        },
        error: function (xhr, status, error) {
            toastr.error(error)
        }
    })
})
