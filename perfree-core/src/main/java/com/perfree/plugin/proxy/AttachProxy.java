package com.perfree.plugin.proxy;

import com.perfree.model.Attach;

/**
 * 附件代理: 插件可继承该类,对附件上传等事件进行操作
 */
public abstract class AttachProxy {

    /**
     * 附件存库之前的操作
     * @param attach 附件信息对象
     * @return Comment
     */
    public Attach attachSaveBefore(Attach attach) {
        return attach;
    }

    /**
     * 附件存库之后的操作
     * @param attach 附件信息对象
     * @return Comment
     */
    public Attach attachSaveAfter(Attach attach) {
        return attach;
    }
}
