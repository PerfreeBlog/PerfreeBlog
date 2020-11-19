package com.perfree.mapper;


import com.perfree.model.Comment;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Component;

import java.util.List;

@Mapper
@Component
public interface CommentMapper {
    /**
     * 评论列表数据
     * @param comment comment
     * @return List<Comment>
     */
    List<Comment> getList(Comment comment);

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
}
