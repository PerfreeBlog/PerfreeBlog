let info = '<i class="mdui-icon material-icons mdui-text-color-grey">info_outline</i> ';
let error = '<i class="mdui-icon material-icons mdui-text-color-red">close</i> ';
let warning = '<i class="mdui-icon material-icons mdui-text-color-yellow">warning</i> ';
let success = '<i class="mdui-icon material-icons mdui-text-color-blue">check</i> ';
// 当前messageId
let currMessageId;
// 当前confirmId
let currConfirmId;

/**
 * 信息框
 * @param type 类型: info error warning success
 * @param content 内容
 * @param removeTime 移除时间
 */
function pMessage(type, content, removeTime = 2000) {
    $("#" + currMessageId).remove();
    currMessageId = guid();
    let typeHtml;
    switch (type) {
        case 'info':
            typeHtml = info;
            break;
        case 'error':
            typeHtml = error;
            break;
        case 'warning':
            typeHtml = warning;
            break;
        case 'success':
            typeHtml = success;
            break;
    }
    let html = `<div class="messageBox"><div class="message mdui-shadow-2" id="`+ currMessageId +`">
                    ` + typeHtml + content +`
                </div></div>`;
    $("body").append(html);
    setTimeout(() => {
        $("#" + currMessageId).remove();
    }, removeTime);
}

function pConfirm(title,content,cancelCallBack, confirmCallBack) {
    currConfirmId = guid();
    let confirmHtml = `
                 <div class="mdui-dialog confirm-box" id="`+ currConfirmId +`">
                    <div class="mdui-dialog-title">`+title+`</div>
                    <div class="mdui-dialog-content confirm-content">`+content+`</div>
                    <div class="mdui-dialog-actions">
                        <button class="mdui-btn mdui-ripple" mdui-dialog-close>取消</button>
                        <button class="mdui-btn mdui-ripple" mdui-dialog-confirm>确定</button>
                    </div>
                </div>`;
    $('body').append(confirmHtml);
    let dialog = document.getElementById(currConfirmId);
    dialog.addEventListener('closed.mdui.dialog', function () {
        if (cancelCallBack) {
            cancelCallBack();
        }
        console.log('cancel')
        $("#"+currConfirmId).remove();
    });
    dialog.addEventListener('confirm.mdui.dialog', function () {
        if (confirmCallBack) {
            confirmCallBack();
        }
        console.log('open');
        console.log('confirm')
        $("#"+currConfirmId).remove();
    });
    let confirm = new mdui.Dialog('#'+currConfirmId);
    confirm.open();

}

/**
 * uuid
 * @returns {string}
 */
function guid() {
    return Number(Math.random().toString().substr(3, 3) + Date.now()).toString(36);
}