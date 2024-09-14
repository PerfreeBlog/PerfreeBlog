package com.perfree.mapper;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.perfree.commons.mapper.BaseMapperX;
import com.perfree.controller.auth.comment.vo.CommentPageReqVO;
import com.perfree.controller.auth.comment.vo.CommentRespVO;
import com.perfree.controller.common.comment.vo.CommentPageByArticleIdReqVO;
import com.perfree.controller.common.comment.vo.CommentPageByTopPidReqVO;
import com.perfree.model.Comment;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * <p>
 *  Mapper 接口
 * </p>
 *
 * @author perfree
 * @since 2023-09-27
 */
@Mapper
public interface CommentMapper extends BaseMapperX<Comment> {

    IPage<CommentRespVO> commentPage(IPage<CommentRespVO> page, @Param("pageVO") CommentPageReqVO pageVO);

    CommentRespVO queryById(@Param("id") Integer id);

    List<CommentRespVO> queryByTopPid(@Param("topPid") Integer topPid);

    default void del(Integer id){
        delete(new LambdaQueryWrapper<Comment>().eq(Comment::getId, id).or().eq(Comment::getPid, id));
    }

    IPage<CommentRespVO> pageByArticleId(IPage<CommentRespVO> page, @Param("pageVO") CommentPageByArticleIdReqVO pageVO);

    IPage<CommentRespVO> pageByTopPid(IPage<CommentRespVO> page, @Param("pageVO") CommentPageByTopPidReqVO pageVO);
}
