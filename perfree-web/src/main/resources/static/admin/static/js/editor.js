var layer,markdownEditor,richEditor;

/**
 * 初始化编辑器
 */
function initEditor(editorMode, content){
    layui.use(['layer', 'form', 'xmSelect'], function () {
        layer = layui.layer;
        if (editorMode === "html") {
            initRichEditor(content);
            $("#editorMode").val("html");
            $(".switchEditor").text("切换为Markdown编辑器");
        } else {
            initMarkdownEditor(content);
            $("#editorMode").val("markdown");
            $(".switchEditor").text("切换为富文本编辑器");
        }
    });
}


/**
 * 切换编辑器
 */
function switchEditor(){
    layer.confirm('如果当前编辑器有内容则会自动清空,确定要切换编辑器吗?', {icon: 3, title: '提示'}, function (index) {
        layer.close(index);
        let i = layer.load();
        if ($("#editorMode").val() === "markdown") {
            if (markdownEditor) {
                markdownEditor.editor.remove();
            }
            initRichEditor("");
            $("#editorMode").val("html");
            localStorage.setItem("editor", "html");
            $(".switchEditor").text("切换为Markdown编辑器");
        } else {
            $("#editorMode").val("markdown");
            if (richEditor) {
                richEditor.destroy();
            }
            initMarkdownEditor("");
            localStorage.setItem("editor", "markdown");
            $(".switchEditor").text("切换为富文本编辑器");
        }
        layer.close(i);
    });
}

/**
 * 初始化富文本编辑器
 */
function initRichEditor(content){
    $("#editorBox").html("<div id='editor'></div>");
    ClassicEditor.create( document.querySelector( '#editor' ), {
        licenseKey: '',
        placeholder: '请输入文章内容',
        toolbar: {
            items: [ "sourceEditing", '|',
                'heading', 'bold', 'italic','fontFamily', 'fontSize', 'fontColor', 'fontBackgroundColor', "removeFormat",  '|',
                'blockQuote', 'horizontalLine','link', 'code', 'codeBlock', '|',
                'insertTable', 'numberedList', 'bulletedList', 'undo', 'redo', 'findAndReplace'],
            shouldNotGroupWhenFull: true
        },
        simpleUpload: {
            uploadUrl: '/admin/attach/ckEditorUpload',
        },
        image: {
            toolbar: [
                'imageTextAlternative',
                'imageStyle:alignBlockLeft',
                'imageStyle:alignBlockRight',
                'imageStyle:block',
                'imageStyle:inline',
                'imageStyle:side',
                'imageStyle:alignLeft',
                'imageStyle:alignRight'
            ]
        },
        table: {
            contentToolbar: [
                'tableColumn',
                'tableRow',
                'mergeTableCells',
                'tableProperties',
                'tableCellProperties'
            ]
        },
        htmlSupport: {
            allow: [{
                name: /.*/,
                attributes: true,
                classes: true,
                styles: true
            }]
        }
    }).then( editor => {
        richEditor = editor;
        $(".ck-toolbar__items").append(`
                <button class="ck ck-button ck-off" type="button" onclick="openSelectImPanel(3, null,richEditor,null, null, null, null)">
                    <i class="fa fa-picture-o" aria-hidden="true"></i>
                    <span class="ck ck-tooltip ck-tooltip_s">
                        <span class="ck ck-tooltip__text">添加图片</span>
                    </span>
                    <span class="ck ck-button__label">添加图片</span>
                </button>`);

        $(".ck-toolbar__items").append(`
                <button class="ck ck-button ck-off" type="button" onclick="openSelectVideoPanel(3, richEditor,null, null, null, null)">
                    <i class="fa fa-video-camera" aria-hidden="true"></i>
                    <span class="ck ck-tooltip ck-tooltip_s">
                        <span class="ck ck-tooltip__text">添加视频</span>
                    </span>
                    <span class="ck ck-button__label">添加视频</span>
                </button>`);

        $(".ck-toolbar__items").append(`
                <button class="ck ck-button ck-off" type="button" onclick="openSelectAttachPanel(3,richEditor,null, null, null, null)">
                    <i class="fa fa-file-archive-o" aria-hidden="true"></i>
                    <span class="ck ck-tooltip ck-tooltip_s">
                        <span class="ck ck-tooltip__text">添加附件</span>
                    </span>
                    <span class="ck ck-button__label">添加附件</span>
                </button>`);
        $(".ck-toolbar__items").append(`
                <button class="ck ck-button ck-off" type="button" onclick="editorFullscreen(2)">
                    <i class="fa fa-arrows-alt" aria-hidden="true"></i>
                    <span class="ck ck-tooltip ck-tooltip_s">
                        <span class="ck ck-tooltip__text">全屏</span>
                    </span>
                    <span class="ck ck-button__label">全屏</span>
                </button>`);
        richEditor.setData(content);
        richEditor.focus();
    }).catch( error => {
        console.error( 'Oops, something went wrong!' );
        console.error( 'Please, report the following error on https://github.com/ckeditor/ckeditor5/issues with the build id and the error stack trace:' );
        console.warn( 'Build id: hn79tswrd14y-4un3e0lq37od' );
        console.error( error );
    });
}


/**
 * 初始化markdown编辑器
 */
function initMarkdownEditor(content) {
    $("#editorBox").html("<div id='editor'></div>");
    markdownEditor = editormd("editor", {
        htmlDecode : true,
        placeholder: '请输入文章内容',
        width: "100%",
        height: '680',
        name: "mdContent",
        syncScrolling: "single",
        path: "/static/public/libs/editormd/lib/", //注意2：你的路径
        saveHTMLToTextarea: false,
        tex: true, // 开启科学公式TeX语言支持，默认关闭
        watch: false,
        imageUpload: true,
        imageUploadURL : "/admin/attach/upload",
        markdown: content,
        imageFormats: ["jpg", "jpeg", "gif", "png", "bmp", "webp"],
        toolbarIcons: function () {
            return [
                "undo", "|",
                "bold", "del", "italic", "quote", "ucwords", "uppercase", "lowercase", "|",
                "h1", "h2", "h3", "h4", "h5", "h6", "|",
                "list-ul", "list-ol", "hr", "|","customImg","customVideo", "customAttach","|",
                "link", "reference-link",  "code", "preformatted-text", "code-block", "table", "datetime", "|",
                "goto-line", "watch", "preview", "clear", "search","customFullscreen"
            ]
        },
        toolbarIconsClass: {
            customImg: "fa-picture-o",
            customVideo: "fa-video-camera",
            customAttach: "fa-file-archive-o",
            customFullscreen: "fa-arrows-alt"
        },
        toolbarHandlers: {
            customImg: function (cm, icon, cursor, selection) {
                openSelectImPanel(2, null, markdownEditor, cm, icon, cursor, selection);
            },
            customVideo: function (cm, icon, cursor, selection) {
                openSelectVideoPanel(1, markdownEditor, cm, icon, cursor, selection);
            },
            customAttach: function (cm, icon, cursor, selection) {
                openSelectAttachPanel(1, markdownEditor, cm, icon, cursor, selection);
            },
            customFullscreen: function () {
                editorFullscreen(1);
            }
        },
        lang: {
            toolbar: {
                customImg: "插入图片",
                customVideo: "插入视频",
                customAttach: "插入附件"
            }
        },
        onload : function() {
            initPasteDragImg(this);
        }
    });
}

function editorFullscreen(type) {
    if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
    } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullScreen) {
        document.documentElement.webkitRequestFullScreen();
    } else if (document.documentElement.msRequestFullscreen) {
        document.documentElement.msRequestFullscreen();
    } else {
        console.info("当前浏览器不支持部分全屏！");
    }

    $("#editorBox").addClass("fullscreen");

    if (type === 1) {
        markdownEditor.resize("100%", "100%");
    }
    if (type === 2) {
        $(".ck-editor__main").css({height: "100%"});
        richEditor.sourceElement.nextElementSibling.setAttribute( 'id', 'ck-editor__full' );
    }

    window.onresize = function () {
        if (isFullscreen() === false && type === 1) {
            $("#editorBox").removeClass("fullscreen");
            markdownEditor.resize("100%", "680");
        }
        if (isFullscreen() === false && type === 2) {
            $(".ck-editor__main").css({height: "620px"});
            $("#editorBox").removeClass("fullscreen");
            richEditor.sourceElement.nextElementSibling.removeAttribute( 'id');
        }
    }
}

function isFullscreen() {
    return document.fullscreenElement ||
        document.msFullscreenElement ||
        document.mozFullScreenElement ||
        document.webkitFullscreenElement || false;
}

/**
 * markdown编辑器复制粘贴图片
 * @param Editor
 */
function initPasteDragImg(Editor){
    let doc = document.getElementById(Editor.id)
    doc.addEventListener('paste', function (event) {
        let items = (event.clipboardData || window.clipboardData).items;
        let file = null;
        if (items && items.length) {
            // 搜索剪切板items
            for (let i = 0; i < items.length; i++) {
                if (items[i].type.indexOf('image') !== -1) {
                    file = items[i].getAsFile();
                    break;
                }
            }
        } else {
            console.log("当前浏览器不支持");
            return;
        }
        if (!file) {
            console.log("粘贴内容非图片");
            return;
        }
        uploadImg(file,Editor);
    });
    let dashboard = document.getElementById(Editor.id)
    dashboard.addEventListener("dragover", function (e) {
        e.preventDefault()
        e.stopPropagation()
    })
    dashboard.addEventListener("dragenter", function (e) {
        e.preventDefault()
        e.stopPropagation()
    })
    dashboard.addEventListener("drop", function (e) {
        e.preventDefault()
        e.stopPropagation()
        let files = this.files || e.dataTransfer.files;
        uploadImg(files[0],Editor);
    })
}

/**
 * markdown编辑器上传图片
 * @param file
 * @param Editor
 */
function uploadImg(file,Editor){
    let i = layer.load();
    let formData = new FormData();
    let fileName=new Date().getTime()+"."+file.name.split(".").pop();
    formData.append('file', file, fileName);
    $.ajax({
        url: Editor.settings.imageUploadURL,
        type: 'post',
        data: formData,
        processData: false,
        contentType: false,
        dataType: 'json',
        success: function (data) {
            layer.close(i);
            if(data.code === 200){
                Editor.insertValue("![]("+data.data.url+")");
            }else{
                console.log(data);
                alert("上传失败");
            }
        }
    });
}
