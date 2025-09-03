package com.perfree.service.comment;

import cn.hutool.http.HtmlUtil;
import com.mybatisflex.solon.service.impl.ServiceImpl;
import com.perfree.cache.CommentStintCache;
import com.perfree.cache.OptionCacheService;
import com.perfree.commons.exception.ServiceException;
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
import org.apache.commons.lang3.StringUtils;
import org.noear.solon.annotation.Component;
import org.noear.solon.annotation.Inject;
import org.noear.solon.data.annotation.Transaction;

import java.util.List;

/**
 * <p>
 *  服务实现类
 * </p>
 *
 * @author perfree
 * @since 2023-09-27
 */
@Component
public class CommentServiceImpl extends ServiceImpl<CommentMapper, Comment> implements CommentService {

    @Inject
    private CommentMapper commentMapper;

    @Inject
    private UserMapper userMapper;

    @Inject
    private OptionCacheService optionCacheService;

    @Inject
    private AsyncService asyncService;

    @Inject
    private CommentStintCache commentStintCache;


    @Override
    public List<CommentRespVO> commentPage(CommentPageReqVO pageVO) {
        List<CommentRespVO> commentPage = commentMapper.commentPage(pageVO);
        return commentPage;
    }

    @Override
    public CommentRespVO queryById(Integer id) {
        return commentMapper.queryById(id);
    }

    @Override
    public List<CommentRespVO> queryChildCommentPage(CommentChildPageReqVO pageVO) {
        List<CommentRespVO> commentRespVOList = commentMapper.queryChildCommentPage(pageVO);
        return commentRespVOList;
    }

    @Override
    @Transaction
    public Boolean del(Integer id) {
        commentMapper.del(id);
        return true;
    }

    @Override
    @Transaction
    public Boolean updateStatus(CommentUpdateStatusReqVO commentUpdateStatusReqVO) {
        Comment comment = CommentConvert.INSTANCE.convertByUpdateStatusReqVO(commentUpdateStatusReqVO);
        updateById(comment);
        // 是否开启了邮件通知
        String isSendMail = optionCacheService.getDefaultValue(OptionEnum.COMMENT_IS_SEND_MAIL.getKey(), OptionConstant.OPTION_IDENTIFICATION_SYSTEM_SETTING, OptionConstant.OPTION_PUBLIC_FALSE);
        if (isSendMail.equals(OptionConstant.OPTION_PUBLIC_TRUE)) {
            asyncService.sendCommentMail(comment.getId(), true);
        }
        return true;
    }

    @Override
    public List<CommentRespVO> pageByArticleId(CommentPageByArticleIdReqVO pageVO) {
        List<CommentRespVO> commentRespVOList = commentMapper.pageByArticleId(pageVO);
        return commentRespVOList;
    }

    @Override
    public List<CommentRespVO> pageByTopPid(CommentPageByTopPidReqVO pageVO) {
        List<CommentRespVO> commentRespVOList = commentMapper.pageByTopPid(pageVO);
        return commentRespVOList;
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
            User user = userMapper.selectOneById(loginUser.getId());
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
    @Transaction
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
