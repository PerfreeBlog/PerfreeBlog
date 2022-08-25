package com.perfree.service;

import com.perfree.commons.Pager;
import com.perfree.directive.DirectivePage;
import com.perfree.model.Comment;

import java.util.HashMap;
import java.util.List;

/**
 * @description CommentService
 * @author Perfree
 * @date 2021/11/15 10:02
 */
public interface CommentService {

    /**
     * 评论管理列表数据
     * @param pager pager
     * @return Pager<Comment>
     */
    Pager<Comment> list(Pager<Comment> pager, String userId);

    /**
     * 删除评论
     * @param idArr idArr
     * @return int
     */
    int del(String[] idArr);

    /**
     * 修改状态
     * @param comment comment
     * @return int
     */
    int changeStatus(Comment comment);

    /**
     * 获取评论数量
     * @return Long
     */
    Long getCommentCount();

    /**
     * 获取最新的评论(后台首页)
     * @return List<Comment>
     */
    List<Comment> getCommentListByDashboard(int count);

    DirectivePage<HashMap<String, String>> getCommentByArticleId(DirectivePage<HashMap<String, String>> commentPage);

    int add(Comment comment);

    /**
     * @description 最近的评论
     * @author Perfree
     * @date 2021/4/23 10:56
     */
    List<Comment> getRecentComment(int count);

    /**
     * @description 根据id获取评论
     * @param id  id
     * @return com.perfree.model.Comment
     * @author Perfree
     */
    Comment getById(Long id);

    /**
     * 根据文章id获取评论分页数据(API)
     * @param pager pager
     * @return Pager<Comment>
     */
    Pager<Comment> getApiCommentByArticleId(Pager<Comment> pager);

}
