$(document).ready(function(){
    $('.delete').on('click', function(e){
        $target = $(e.target);
        const id = $target.attr('data-id');
        $.ajax({
            type: 'DELETE',
            url: '/post/'+id,
            success: function(res){
                alert('data deleted');
                window.location.href='/';
            },
            error: function(err){
                console.log(err);
            }
        })
        confirm("Do You Want To Delete This Post ?")
        window.location.href='/';
    })
})

$(document).ready(function(){
    $('.update').on('click', function(e){
        $target = $(e.target);
        $target.attr('data-id');
        alert('data updated');
        location.reload;
    })
})