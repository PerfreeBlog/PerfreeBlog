hljs.initHighlightingOnLoad();
let notyf = new Notyf({
    duration: 1500,
    position: {
        x: 'right',
        y: 'top',
    },
    types: [
        {
            type: 'warning',
            background: 'orange',
            icon: {
                className: 'material-icons',
                tagName: 'i',
                text: 'warning'
            }
        },
        {
            type: 'success',
            background: 'rgb(103, 204, 134)'
        },
        {
            type: 'error',
            background: 'rgb(225, 91, 100)',
            duration: 2000,
            dismissible: true
        }
    ]
});
initViewer();
initEvent();
function initViewer() {
    $(".d-post-content").viewer({
        url: 'src'
    })
}

function initEvent() {
    like();
    initLike();
    comment();
}

function comment() {
    $(".comment-btn").click(function (){
       if ($(this).parent('.p-post-info').children('.journal-comment').length > 0) {
           $(this).parent('.p-post-info').children('.journal-comment').remove()
       } else {
           $(this).parent('.p-post-info').append(`<div class="journal-comment" data-article-id="${$(this).attr('data-article-id')}"></div>`);
           let comment = new perfreeComment();
           comment.customInit( $(this).parent('.p-post-info').children('.journal-comment'));
       }
    });
}

function like(){
    $(".like-btn").click(function (){
        let that = $(this);
        let greats = localStorage.getItem('great');
        if (greats) {
            let greatArr = greats.split(',');
            if (greatArr.indexOf(that.attr("data-id")) >= 0) {
                return;
            }
        }
        $.get('/article/like?id='+that.attr("data-id"), function (res) {
            if (res.code === 200) {
                let count = Number(that.text()) + 1;
                that.html('<i class="fa fa-heart"></i> ' + count);
                let great = localStorage.getItem('great');
                if (great && great !== '') {
                    great += ',';
                } else {
                    great = '';
                }
                localStorage.setItem('great', great + that.attr("data-id"))
                notyf.success('点赞成功~');
            } else {
                notyf.error(res.msg);
            }
        })
    });
}

function initLike(){
    let greats = localStorage.getItem('great');
    if (greats) {
        let greatArr = greats.split(',');
        $('.like-btn').each(function(){
            if (greatArr.indexOf($(this).attr("data-id")) >= 0) {
                $(this).html('<i class="fa fa-heart"></i> ' + $(this).text());
            }
        });

    }
}