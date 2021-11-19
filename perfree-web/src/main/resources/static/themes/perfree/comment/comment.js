$('#commentListBox').on('click','.p-comment-reply-btn',function() {
    $(this).parent().parent().parent().append($("#p-comment-box"));
    $("#pid").val($(this).attr('data-pid'));
    $("#topPid").val($(this).attr('data-topPid'));
    $(".p-cancel-reply").show();
    $("#content").focus();
});

$('#commentListBox').on('click','.p-cancel-reply',function() {
    cancelReply();
});

$('.p-comment-box').on('click','#submitComment',function() {
    submitComment();
});


function submitComment() {
    var form = $("#commentForm").serializeArray()
    var data = {};
    $.each(form,function(i,v){
        data[v.name] = v.value;
    })
    $.ajax({
        type: "POST",
        url: "/comment/submitComment" ,
        contentType: "application/json",
        data: JSON.stringify(data),
        success: function (result) {
            if (result.code === 200) {
                $("#content").val('');
                cancelReply();
                const article = $("#articleId").val();
                $("#commentListBox").load("/article/"+article+" #commentList",null,function(){
                    location.hash = "#comment-"+ result.data.id;
                });
                alert("评论成功");
            }else if (result.code === 201) {
                alert("评论成功,正在等待管理员审核");
            } else if (result.code === -1) {
                alert("该文章已关闭评论功能");
            }else if (result.code === -2) {
                alert("请填写名称");
            }else if (result.code === -3) {
                alert("请填写邮箱");
            }else if (result.code === -4) {
                alert("评论过于频繁,请稍候再试");
            } else if (result.code === -5) {
                alert("请正确填写邮箱");
            } else {
                alert(result.msg);
            }
        },
        error : function() {
            alert("网络异常,评论失败");
        }
    });
}


function cancelReply() {
    $(".p-cancel-reply").hide();
    $("#commentListBox").after($("#p-comment-box"));
    $("#pid").val('');
    $("#topPid").val('');
}

