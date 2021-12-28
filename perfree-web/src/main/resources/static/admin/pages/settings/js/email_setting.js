var editor = CodeMirror.fromTextArea(document.getElementById("code"), {
    mode: 'text/html',
    theme: 'dracula',
    lineNumbers: true,
    styleActiveLine: true,
    matchTags: {bothTags: true},
    extraKeys: {"Alt-/": "autocomplete"},	// 高亮当前行
});
var layer, form, upload;

layui.use(['util','form', 'layer','upload'], function(){
    layer = layui.layer;
    util = layui.util;
    form = layui.form;
    loadFileContent($($("#fileList li")[0]).attr("path"), $($("#fileList li")[0]).text());
    $($("#fileList li")[0]).addClass("active");
});

/**
 * 加载文件内容至编辑器
 */
function loadFileContent(path, name) {
    let loadIndex = layer.load();
    $.ajax({
        type: "POST",
        url: "/admin/emailSetting/getFileContent",
        data: {path: path},
        success: function (d) {
            layer.close(loadIndex);
            if (d.code === 200) {
                editor.setValue(d.data);
                $("#currEditFile").text(name);
                $("#path").val(path);
                editor.setOption("mode","text/html");
            } else {
                layer.msg("加载文件失败", {icon: 2});
            }
        },
        error: function () {
            layer.close(loadIndex);
            layer.msg("加载文件失败", {icon: 2});
        }
    });
}

$("#fileList").on("click","li",function () {
    loadFileContent($(this).attr("path"), $(this).text());
    $("#fileList li").removeClass("active");
    $(this).addClass("active");
});


$(".p-container").on("click",".saveFileBtn",function () {
    save();
});

window.addEventListener("keydown", function(e) {
    if((e.key==='s'||e.key==='S')&&(navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)){
        e.preventDefault();
        save();
    }
}, false);

function save() {
    if ($("#path").val() === "" || !$("#path").val()){
        layer.msg("请先选择要编辑的模板", {icon: 2});
        return;
    }
    let loadIndex = layer.load();
    $.ajax({
        type: "POST",
        url: "/admin//emailSetting/saveFileContent",
        data: {path: $("#path").val(), content: editor.getValue()},
        success: function (d) {
            layer.close(loadIndex);
            if (d.code === 200) {
                layer.msg("文件保存成功", {icon: 1});
            } else {
                layer.msg("文件保存失败", {icon: 2});
            }
        },
        error: function () {
            layer.close(loadIndex);
            layer.msg("文件保存失败", {icon: 2});
        }
    });
}