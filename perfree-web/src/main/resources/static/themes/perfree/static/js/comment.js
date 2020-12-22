let form, notice , layer;
initComment();

/**
 * 初始化评论
 */
function initComment() {
    layui.config({
        base: '/static/public/libs/layuiComponents/'
    }).extend({
        notice: 'notice/notice'
    })
    // 评论框初始化
    layui.use(['form','notice','layer'], function() {
        form = layui.form; notice = layui.notice; layer = layui.layer;
        notice.options = {
            closeButton: true,//显示关闭按钮
            debug: false,//启用debug
            positionClass: "toast-top-right",//弹出的位置,
            showDuration: "300",//显示的时间
            hideDuration: "1000",//消失的时间
            timeOut: "2000",//停留的时间
            extendedTimeOut: "1000",//控制时间
            showEasing: "swing",//显示时的动画缓冲方式
            hideEasing: "linear",//消失时的动画缓冲方式
            iconClass: 'toast-info', // 自定义图标，有内置，如不需要则传空 支持layui内置图标/自定义iconfont类名
            onclick: null, // 点击关闭回调
        };

        $('#commentListBox').on('click', '.p-comment-reply-btn', function () {
            $(this).parent().parent().parent().append($("#p-comment-box"));
            $("#pid").val($(this).attr('data-pid'));
            $("#topPid").val($(this).attr('data-topPid'));
            $(".p-cancel-reply").show();
            $("#content").focus();
        });

        $('#commentListBox').on('click', '.p-cancel-reply', function () {
            cancelReply();
        });

        $('.p-comment-box').on('click', '#submitComment', function () {
            submitComment();
        });
    });
}

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
                console.log( $("#content"))
                $("#content").val('');
                cancelReply();
                const article = $("#articleId").val();
                $("#commentListBox").load("/article/"+article+" #commentList",null,function(){
                    location.hash = "#comment-"+ result.data.id;
                });
                notice.success("评论成功");
            } else if (result.code === -1) {
                notice.error("该文章已关闭评论功能");
            }else if (result.code === -2) {
                notice.error("请填写名称");
            }else if (result.code === -3) {
                notice.error("请填写邮箱");
            }else if (result.code === -4) {
                notice.error("评论过于频繁,请稍候再试");
            } else {
                notice.error(result.msg);
            }
        },
        error : function() {
            notice.error("网络异常,评论失败");
        }
    });
}


function cancelReply() {
    $(".p-cancel-reply").hide();
    $("#commentListBox").after($("#p-comment-box"));
    $("#pid").val('');
    $("#topPid").val('');
}