package com.perfree.mapper;


import com.perfree.model.Comment;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.List;

@Mapper
@Component
public interface CommentMapper {
    /**
     * 评论列表数据
     * @param content content
     * @return List<Comment>
     */
    List<Comment> getList(@Param("content") String content,@Param("articleType") String articleType,  @Param("userId") String userId);

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


    List<Comment> getCommentByArticleId(HashMap<String, String> form);

    List<Comment> getChildComment(String id);

    Comment getParentCommentByPid(String pid);

    int add(Comment comment);

    List<Comment> getRecentComment(int count);

    /**
     * @description 根据id获取评论
     * @param id  id
     * @author Perfree
     */
    Comment getById(Long id);

    List<Comment> getApiCommentByArticleId(Comment comment);
}
