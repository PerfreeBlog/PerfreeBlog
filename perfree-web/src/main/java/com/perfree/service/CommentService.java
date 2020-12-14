package com.perfree.service;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.perfree.common.Pager;
import com.perfree.directive.DirectivePage;
import com.perfree.mapper.CommentMapper;
import com.perfree.model.Article;
import com.perfree.model.Comment;
import com.perfree.model.Tag;
import com.perfree.model.User;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.HashMap;
import java.util.List;

@Service
@Transactional
public class CommentService {
    @Autowired
    private CommentMapper commentMapper;

    /**
     * 评论管理列表数据
     * @param pager pager
     * @return Pager<Comment>
     */
    public Pager<Comment> list(Pager<Comment> pager) {
        PageHelper.startPage(pager.getPageIndex(), pager.getPageSize());
        List<Comment> comments = commentMapper.getList(pager.getForm());
        PageInfo<Comment> pageInfo = new PageInfo<>(comments);
        pager.setTotal(pageInfo.getTotal());
        pager.setData(pageInfo.getList());
        pager.setCode(Pager.SUCCESS_CODE);
        return pager;
    }

    /**
     * 删除评论
     * @param idArr idArr
     * @return int
     */
    public int del(String[] idArr) {
        return commentMapper.del(idArr);
    }

    /**
     * 修改状态
     * @param comment comment
     * @return int
     */
    public int changeStatus(Comment comment) {
        comment.setUpdateTime(new Date());
        return commentMapper.changeStatus(comment);
    }

    /**
     * 获取评论数量
     * @return Long
     */
    public Long getCommentCount() {
        return commentMapper.getCommentCount();
    }

    /**
     * 获取最新的22条评论(后台首页)
     * @return List<Comment>
     */
    public List<Comment> getCommentListByDashboard() {
        return commentMapper.getCommentListByDashboard();
    }

    public DirectivePage<HashMap<String, String>> getCommentByArticleId(DirectivePage<HashMap<String, String>> commentPage) {
        PageHelper.startPage(commentPage.getPageIndex(), commentPage.getPageSize());
        List<Comment> comments = commentMapper.getCommentByArticleId(commentPage.getForm());
        PageInfo<Comment> pageInfo = new PageInfo<>(comments);
        commentPage.setTotal(pageInfo.getTotal());
        commentPage.setData(pageInfo.getList());
        return commentPage;
    }

    public int add(Comment comment, User user) {
        comment.setCreateTime(new Date());
        comment.setUserId(user.getId());
        comment.setPid(comment.getPid()==null ? -1: comment.getPid());
        return commentMapper.add(comment);
    }
}
