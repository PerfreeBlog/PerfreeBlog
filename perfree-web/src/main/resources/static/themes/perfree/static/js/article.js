initViewer();
hljs.initHighlightingOnLoad();
/**
 * 初始化图片查看
 */
function initViewer() {
    const articleContentDetail = document.getElementById('a-article-content-detail');
    if (articleContentDetail){
        new Viewer(articleContentDetail, {
            url: 'src'
        });
    }
}

/**
 * 初始化数学公式
 */
function initMatch() {
    renderMathInElement(document.body,
        {
            delimiters: [
                {left: "$$", right: "$$", display: true},
                {left: "$", right: "$", display: false}
            ]
        }
    );
}


jQuery(document).ready(function(){
    buildCTable();
});
function buildCTable() {
    let hs = $(".a-article-content-detail").find("h1,h2,h3,h4,h5,h6");
    if (hs.length < 2) return;
    let s = "";
    s += '<div class="roundDiv" >';
    s += '<div class="f-floor-title">文章目录</div>';
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
            hs.eq(i).html('<a name="t' + i + '" id="t' + i + '"></a>' + hs.eq(i).html());
        }
    }
    while (ol_cnt > 0) {
        s += "</ol>";
        ol_cnt--;
    }
    s += "</ol></div>";
    s += '<div style="clear:both"></div>';
    $(".f-floor").append(s);
}
$(".f-floor").on('click','a',function(){
    $('html, body').animate({scrollTop: $($(this).attr("data-href")).offset().top - 60}, 300)
});
