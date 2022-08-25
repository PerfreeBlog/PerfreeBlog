package com.perfree.service.impl;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.perfree.commons.Pager;
import com.perfree.directive.DirectivePage;
import com.perfree.mapper.CommentMapper;
import com.perfree.model.Comment;
import com.perfree.service.ArticleService;
import com.perfree.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.HashMap;
import java.util.List;

@Service
@Transactional
public class CommentServiceImpl implements CommentService {
    @Autowired
    private CommentMapper commentMapper;

    @Autowired
    private ArticleService articleService;


    /**
     * 评论管理列表数据
     * @param pager pager
     * @return Pager<Comment>
     */
    public Pager<Comment> list(Pager<Comment> pager, String userId) {
        PageHelper.startPage(pager.getPageIndex(), pager.getPageSize());
        List<Comment> comments = commentMapper.getList(pager.getForm().getContent(), pager.getForm().getArticleType(), userId);
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
        articleService.articleCommentSub(idArr);
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
     * 获取最新的评论(后台首页)
     * @return List<Comment>
     */
    public List<Comment> getCommentListByDashboard(int count) {
        return commentMapper.getCommentListByDashboard(count);
    }

    public DirectivePage<HashMap<String, String>> getCommentByArticleId(DirectivePage<HashMap<String, String>> commentPage) {
        PageHelper.startPage(commentPage.getPageIndex(), commentPage.getPageSize());
        List<Comment> comments = commentMapper.getCommentByArticleId(commentPage.getForm());
        PageInfo<Comment> pageInfo = new PageInfo<>(comments);
        commentPage.setTotal(pageInfo.getTotal());
        commentPage.setData(pageInfo.getList());
        return commentPage;
    }

    public int add(Comment comment) {
        comment.setCreateTime(new Date());
        comment.setPid(comment.getPid()==null ? -1: comment.getPid());
        comment.setTopPid(comment.getTopPid()==null ? -1: comment.getTopPid());
        articleService.articleCommentAdd(comment.getArticleId());
        return commentMapper.add(comment);
    }

    /**
     * @description 最近的评论
     * @author Perfree
     * @date 2021/4/23 10:56
     */
    public List<Comment> getRecentComment(int count) {
        return commentMapper.getRecentComment(count);
    }

    /** 
     * @description 根据id获取评论
     * @param id  id
     * @return com.perfree.model.Comment 
     * @author Perfree
     */ 
    public Comment getById(Long id) {
        return commentMapper.getById(id);
    }

    /**
     * 根据文章id获取评论分页数据(API)
     * @param pager pager
     * @return Pager<Comment>
     */
    public Pager<Comment> getApiCommentByArticleId(Pager<Comment> pager) {
        PageHelper.startPage(pager.getPageIndex(), pager.getPageSize());
        List<Comment> comments = commentMapper.getApiCommentByArticleId(pager.getForm());
        PageInfo<Comment> pageInfo = new PageInfo<>(comments);
        pager.setTotal(pageInfo.getTotal());
        pager.setData(pageInfo.getList());
        return pager;
    }
}
