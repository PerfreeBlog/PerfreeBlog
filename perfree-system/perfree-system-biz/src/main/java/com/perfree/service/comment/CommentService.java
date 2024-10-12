package com.perfree.service.comment;

import com.baomidou.mybatisplus.extension.service.IService;
import com.perfree.commons.common.PageResult;
import com.perfree.controller.auth.comment.vo.*;
import com.perfree.controller.common.comment.vo.CommentPageByArticleIdReqVO;
import com.perfree.controller.common.comment.vo.CommentPageByTopPidReqVO;
import com.perfree.model.Comment;

import java.util.List;

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
     * 评论分页
     * @param commentPageReqVO commentPageReqVO
     * @return PageResult<CommentRespVO>
     */
    PageResult<CommentRespVO> commentPage(CommentPageReqVO commentPageReqVO);

    /**
     * 根据id获取评论信息
     * @param id id
     * @return CommentRespVO
     */
    CommentRespVO queryById(Integer id);

    /**
     * @param pageReqVO pageReqVO
     * @return PageResult<CommentRespVO>
     */
    PageResult<CommentRespVO> queryChildCommentPage(CommentChildPageReqVO pageReqVO);

    /**
     * 根据id删除评论
     * @param id id
     * @return Boolean
     */
    Boolean del(Integer id);

    /**
     * 修改评论状态
     * @param commentUpdateStatusReqVO  commentUpdateStatusReqVO
     * @return Boolean
     */
    Boolean updateStatus(CommentUpdateStatusReqVO commentUpdateStatusReqVO);

    /**
     * 根据文章id获取评论分页列表
     * @param pageVo pageVo
     * @return PageResult<CommentRespVO>
     */
    PageResult<CommentRespVO> pageByArticleId(CommentPageByArticleIdReqVO pageVo);

    /**
     * 根据topPid加载所有子级评论
     * @param pageVO CommentPageByTopPidReqVO
     * @return PageResult<CommentRespVO>
     */
    PageResult<CommentRespVO> pageByTopPid(CommentPageByTopPidReqVO pageVO);

    /**
     * 新增评论
     * @param reqVO reqVO
     * @return Comment
     */
    Comment addComment(CommentAddReqVO reqVO);

    /**
     * 根据文章id删除评论
     * @param articleId articleId
     */
    void delByArticleId(Integer articleId);

    List<CommentRespVO> getLatestComment(Integer num);

    List<CommentRespVO> getCommentByArticleId(Integer articleId);

}
