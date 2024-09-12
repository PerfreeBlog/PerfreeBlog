package com.perfree.service.comment;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.perfree.commons.common.PageResult;
import com.perfree.commons.utils.MyBatisUtils;
import com.perfree.commons.utils.SortingFieldUtils;
import com.perfree.controller.auth.comment.vo.CommentPageReqVO;
import com.perfree.controller.auth.comment.vo.CommentRespVO;
import com.perfree.controller.auth.comment.vo.CommentUpdateStatusReqVO;
import com.perfree.controller.common.comment.vo.CommentPageByArticleIdReqVO;
import com.perfree.convert.comment.CommentConvert;
import com.perfree.mapper.CommentMapper;
import com.perfree.model.Comment;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * <p>
 *  服务实现类
 * </p>
 *
 * @author perfree
 * @since 2023-09-27
 */
@Service
public class CommentServiceImpl extends ServiceImpl<CommentMapper, Comment> implements CommentService {

    @Resource
    private CommentMapper commentMapper;

    @Override
    public PageResult<CommentRespVO> commentPage(CommentPageReqVO pageVO) {
        SortingFieldUtils.handleDefaultSortingField(pageVO);
        IPage<CommentRespVO> page = MyBatisUtils.buildPage(pageVO, pageVO.getSortingFields());
        IPage<CommentRespVO> commentPage = commentMapper.commentPage(page, pageVO);
        return new PageResult<>(commentPage.getRecords(), commentPage.getTotal());
    }

    @Override
    public CommentRespVO queryById(Integer id) {
        return commentMapper.queryById(id);
    }

    @Override
    public List<CommentRespVO> queryByTopPid(Integer topPid) {
        return commentMapper.queryByTopPid(topPid);
    }

    @Override
    @Transactional
    public Boolean del(Integer id) {
        commentMapper.del(id);
        return true;
    }

    @Override
    @Transactional
    public Boolean commentService(CommentUpdateStatusReqVO commentUpdateStatusReqVO) {
        Comment comment = CommentConvert.INSTANCE.convertByUpdateStatusReqVO(commentUpdateStatusReqVO);
        commentMapper.updateById(comment);
        return true;
    }

    @Override
    public PageResult<CommentRespVO> pageByArticleId(CommentPageByArticleIdReqVO pageVO) {
        IPage<CommentRespVO> page = MyBatisUtils.buildPage(pageVO, pageVO.getSortingFields());
        IPage<CommentRespVO> commentPage = commentMapper.pageByArticleId(page, pageVO);
        return new PageResult<>(commentPage.getRecords(), commentPage.getTotal());
    }

    @Override
    public List<CommentRespVO> queryChildByTopPid(Integer topPid) {
        return commentMapper.queryChildByTopPid(topPid);
    }
}
