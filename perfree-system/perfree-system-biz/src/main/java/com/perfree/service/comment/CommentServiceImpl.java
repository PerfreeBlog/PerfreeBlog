package com.perfree.service.comment;

import cn.hutool.http.HtmlUtil;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.perfree.cache.CommentStintCache;
import com.perfree.cache.OptionCacheService;
import com.perfree.commons.common.PageResult;
import com.perfree.commons.exception.ServiceException;
import com.perfree.commons.utils.MyBatisUtils;
import com.perfree.commons.utils.WebUtils;
import com.perfree.constant.CommentConstant;
import com.perfree.constant.OptionConstant;
import com.perfree.constant.UserConstant;
import com.perfree.controller.auth.comment.vo.*;
import com.perfree.controller.common.comment.vo.CommentPageByArticleIdReqVO;
import com.perfree.controller.common.comment.vo.CommentPageByTopPidReqVO;
import com.perfree.convert.comment.CommentConvert;
import com.perfree.enums.ErrorCode;
import com.perfree.enums.OptionEnum;
import com.perfree.mapper.CommentMapper;
import com.perfree.mapper.UserMapper;
import com.perfree.model.Comment;
import com.perfree.model.User;
import com.perfree.security.SecurityFrameworkUtils;
import com.perfree.security.vo.LoginUserVO;
import com.perfree.service.async.AsyncService;
import jakarta.annotation.Resource;
import org.apache.commons.lang3.StringUtils;
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

    @Resource
    private UserMapper userMapper;

    @Resource
    private OptionCacheService optionCacheService;

    @Resource
    private AsyncService asyncService;

    @Resource
    private CommentStintCache commentStintCache;


    @Override
    public PageResult<CommentRespVO> commentPage(CommentPageReqVO pageVO) {
        IPage<CommentRespVO> page = MyBatisUtils.buildPage(pageVO, pageVO.getSortingFields());
        IPage<CommentRespVO> commentPage = commentMapper.commentPage(page, pageVO);
        return new PageResult<>(commentPage.getRecords(), commentPage.getTotal());
    }

    @Override
    public CommentRespVO queryById(Integer id) {
        return commentMapper.queryById(id);
    }

    @Override
    public PageResult<CommentRespVO> queryChildCommentPage(CommentChildPageReqVO pageVO) {
        IPage<CommentRespVO> page = MyBatisUtils.buildPage(pageVO, pageVO.getSortingFields());
        IPage<CommentRespVO> commentPage = commentMapper.queryChildCommentPage(page, pageVO);
        return new PageResult<>(commentPage.getRecords(), commentPage.getTotal());
    }

    @Override
    @Transactional
    public Boolean del(Integer id) {
        commentMapper.del(id);
        return true;
    }

    @Override
    @Transactional
    public Boolean updateStatus(CommentUpdateStatusReqVO commentUpdateStatusReqVO) {
        Comment comment = CommentConvert.INSTANCE.convertByUpdateStatusReqVO(commentUpdateStatusReqVO);
        commentMapper.updateById(comment);
        // 是否开启了邮件通知
        String isSendMail = optionCacheService.getDefaultValue(OptionEnum.COMMENT_IS_SEND_MAIL.getKey(), OptionConstant.OPTION_IDENTIFICATION_SYSTEM_SETTING, OptionConstant.OPTION_PUBLIC_FALSE);
        if (isSendMail.equals(OptionConstant.OPTION_PUBLIC_TRUE)) {
            asyncService.sendCommentMail(comment.getId(), true);
        }
        return true;
    }

    @Override
    public PageResult<CommentRespVO> pageByArticleId(CommentPageByArticleIdReqVO pageVO) {
        IPage<CommentRespVO> page = MyBatisUtils.buildPage(pageVO, pageVO.getSortingFields());
        IPage<CommentRespVO> commentPage = commentMapper.pageByArticleId(page, pageVO);
        return new PageResult<>(commentPage.getRecords(), commentPage.getTotal());
    }

    @Override
    public PageResult<CommentRespVO> pageByTopPid(CommentPageByTopPidReqVO pageVO) {
        IPage<CommentRespVO> page = MyBatisUtils.buildPage(pageVO, pageVO.getSortingFields());
        IPage<CommentRespVO> commentPage = commentMapper.pageByTopPid(page, pageVO);
        return new PageResult<>(commentPage.getRecords(), commentPage.getTotal());
    }

    @Override
    public Comment addComment(CommentAddReqVO reqVO) {
        // 评论频率限制
        String commentStint = optionCacheService.getDefaultValue(OptionEnum.WEB_COMMENT_IS_STINT.getKey(), OptionConstant.OPTION_IDENTIFICATION_SYSTEM_SETTING, OptionConstant.OPTION_PUBLIC_FALSE);
        if (commentStint.equals(OptionConstant.OPTION_PUBLIC_TRUE) && null != commentStintCache.getCommentStint(WebUtils.getClientIP())) {
            throw new ServiceException(ErrorCode.COMMENT_STINT_ERROR);
        }
        LoginUserVO loginUser = SecurityFrameworkUtils.getLoginUser();
        if(null == loginUser && StringUtils.isBlank(reqVO.getUserName())) {
            throw new ServiceException(ErrorCode.COMMENT_USER_NAME_NOT_EMPTY);
        }
        if(null == loginUser && StringUtils.isBlank(reqVO.getEmail())) {
            throw new ServiceException(ErrorCode.COMMENT_EMAIL_NOT_EMPTY);
        }
        if (null != loginUser) {
            User user = userMapper.selectById(loginUser.getId());
            reqVO.setUserId(user.getId());
        } else {
            reqVO.setAvatar(UserConstant.DEFAULT_AVATAR);
        }
        reqVO.setIp(WebUtils.getClientIP());
        reqVO.setDevice(WebUtils.getDevice());

        Comment comment = CommentConvert.INSTANCE.convertByAddReqVO(reqVO);

        // 是否开启了评论审核
        String isReview = optionCacheService.getDefaultValue(OptionEnum.WEB_COMMENT_IS_REVIEW.getKey(), OptionConstant.OPTION_IDENTIFICATION_SYSTEM_SETTING, OptionConstant.OPTION_PUBLIC_FALSE);
        if (isReview.equals(OptionConstant.OPTION_PUBLIC_TRUE)) {
            comment.setStatus(CommentConstant.COMMENT_STATUS_AUDIT);
        }

        comment.setContent(HtmlUtil.filter(comment.getContent()));
        commentMapper.insert(comment);

        if (commentStint.equals(OptionConstant.OPTION_PUBLIC_TRUE)) {
            commentStintCache.putCommentStint(WebUtils.getClientIP(), comment.getArticleId().toString());
        }

        // 是否开启了邮件通知
        String isSendMail = optionCacheService.getDefaultValue(OptionEnum.COMMENT_IS_SEND_MAIL.getKey(), OptionConstant.OPTION_IDENTIFICATION_SYSTEM_SETTING, OptionConstant.OPTION_PUBLIC_FALSE);
        if (isSendMail.equals(OptionConstant.OPTION_PUBLIC_TRUE)) {
            asyncService.sendCommentMail(comment.getId(), false);
        }
        return comment;
    }

    @Override
    @Transactional
    public void delByArticleId(Integer articleId) {
        commentMapper.delByArticleId(articleId);
    }

    @Override
    public List<CommentRespVO> getLatestComment(Integer num) {
        return commentMapper.getLatestComment(num);
    }

    @Override
    public List<CommentRespVO> getCommentByArticleId(Integer articleId) {
        return commentMapper.getCommentByArticleId(articleId);
    }
}
