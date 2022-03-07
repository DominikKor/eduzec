$(document).ready(function(){
    $('.cast-vote').on('click',function(){
        var _vote_type=$(this).closest('[vote_type]').attr('vote_type');
        var _id = $(this).closest('[id]').attr('id');
        var _vote_to=$(this).closest('[vote_to]').attr('vote_to');
        // Ajax starts here i guess
        $.ajax({
            url:'/save-vote',
            type:'post',
            data:{
                vote_type:_vote_type,
                vote_to:_vote_to,
                id:_id,
                csrfmiddlewaretoken:csrf_token,
            },
            dataType:'json',
            beforeSend:function(){

            },
            success:function(res){
                if(res.bool==true){
                    if (_vote_to == "question")
                        obj = "question"
                    else
                        obj = "answer"
                    votes = parseInt($('.voting[id=' + _id + ']').find('.' + obj + '_votes').text())
                    if (_vote_type == "upvote")
                        $('.voting[id=' + _id + ']').find('.' + obj + '_votes').html(votes + 1)
                    else
                        $('.voting[id=' + _id + ']').find('.' + obj + '_votes').html(votes - 1)
                }
            }
        });
    });
});


$(document).ready(function(){
    $('.save-comment').on('click',function(){
        var _answerid=$(this).data('answer');
        var _comment=$('.comment-text[id=' + _answerid + ']').val();
        // Ajax starts here i guess
        $.ajax({
            url:'/save-comment',
            type:'post',
            data:{
                comment:_comment,
                answerid:_answerid,
                csrfmiddlewaretoken:csrf_token,
            },
            dataType:'json',
            beforeSend:function(){
                $('.save-comment').addClass('disabled').text('saving...');
            },
            success:function(res){
                if(res.bool==true){
                    $('.comment-text[id=' + _answerid + ']').val('');
                    // Append Element or somethin
                    var _html="<div class='card animate__animated animate__fadeInDown'>\
                        <div class='card-body'>\
                            <p><a href='#'>" + $('.save-comment').attr('user') + "</a><text> - </text>" + _comment + "</p>\
                        </div>\
                    </div>";
                    $('.comment-wrapper[id=' + _answerid + ']').append(_html);
                }
                $('.save-comment').removeClass('disabled').text('Comment');
            }
        });
    });
});
