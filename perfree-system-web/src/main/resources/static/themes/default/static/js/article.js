hljs.initHighlightingOnLoad();
let tocLocation = [];
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
buildCTable();
like();
initLike();
function initViewer() {
    const articleContentDetail = document.getElementById('d-article-content');
    if (articleContentDetail){
        new Viewer(articleContentDetail, {
            url: 'src'
        });
    }
}

function buildCTable() {
    let hs = $("#d-article-content").find("h1,h2,h3,h4,h5,h6");
    if (hs.length < 2) return;
    let s = "";
    s += '<div class="roundDiv" >';
    s += '<ol">';
    let old_h = 0, ol_cnt = 0;
    for (let i = 0; i < hs.length; i++) {
        let h = parseInt(hs[i].tagName.substr(1), 10);
        if (!old_h) old_h = h;
        if (h > old_h) {
            s += "<ol>";
            ol_cnt++;
        } else if (h < old_h && ol_cnt > 0) {
            s += "</ol>";
            ol_cnt--;
        }
        if (h === 1) {
            while (ol_cnt > 0) {
                s += "</ol>";
                ol_cnt--;
            }
        }
        old_h = h;
        let tit = hs.eq(i).text().replace(/^[\d.、\s]+/g, "");
        tit = tit.replace(/[^a-zA-Z0-9_\-\s\u4e00-\u9fa5]+/g, "");
        if (tit.length < 100) {
            //将每一个h标签拼接到s上，生成目录
            s += '<li><a data-href="#t' + i + '">' + tit + "</a></li>";
            //给文章中的h标签加上id
            hs.eq(i).html('<a name="t' + i + '" id="t' + i + '" class="d-toc-a"></a>' + hs.eq(i).html());
        }
    }
    while (ol_cnt > 0) {
        s += "</ol>";
        ol_cnt--;
    }
    s += "</ol></div>";
    s += '<div style="clear:both"></div>';
    $(".d-toc").append(s);
    $(".d-toc-a").each(function (i){
        tocLocation[i] = $(this).offset().top;
    });
    activeToc();
}

$(".d-toc").on('click','a',function(){
    window.scroll({
        top: $($(this).attr("data-href")).offset().top - 65,
        behavior: "smooth"
    })
});

let scrollTimer;
$(window).scroll(function() {
    activeToc();
});

function activeToc(){
    let scrollTop = $(window).scrollTop();
    let currIndex = 0;
    for(let i = 0; i <= tocLocation.length; i++){
        if(scrollTop >= (tocLocation[i] - 70)){
            currIndex = i;
        }
    }
    $(".roundDiv li").each(function (i){
        if (currIndex === i) {
            $(this).addClass("active-toc");
        } else {
            $(this).removeClass("active-toc");
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