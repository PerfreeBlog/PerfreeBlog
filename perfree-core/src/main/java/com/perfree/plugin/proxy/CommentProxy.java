package com.perfree.plugin.proxy;

import com.perfree.commons.ResponseBean;
import com.perfree.model.Comment;

/**
 * 评论代理: 插件可继承该类,对评论事件进行操作
 */
public abstract class CommentProxy {

    /**
     * 评论保存之后操作
     * @param comment comment
     * @return Comment
     */
    public Comment commentSaveAfter(Comment comment) {
        return comment;
    }

    /**
     * 是否允许存库,如允许存库则返回null,反之返回对应的响应信息
     * @param comment comment
     * @return Comment
     */
    public ResponseBean commentIsSave(Comment comment) {
        return null;
    }

    /**
     * 评论保存之前操作
     * @param comment comment
     * @return Comment
     */
    public Comment commentSaveBefore(Comment comment) {
        return comment;
    }
}
