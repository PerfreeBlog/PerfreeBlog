package com.perfree.service.comment;

import com.baomidou.mybatisplus.extension.service.IService;
import com.perfree.model.Comment;

/**
 * <p>
 *  服务类
 * </p>
 *
 * @author perfree
 * @since 2023-09-27
 */
public interface CommentService extends IService<Comment> {

    /**
     * 获取评论数量
     * @return Long
     */
    Long getCommentCount();
}
