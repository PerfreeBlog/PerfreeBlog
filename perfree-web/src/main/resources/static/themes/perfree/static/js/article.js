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
