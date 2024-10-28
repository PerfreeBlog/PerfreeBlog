package com.perfree.service.async;

import cn.hutool.core.date.DateUtil;
import com.perfree.cache.OptionCacheService;
import com.perfree.commons.utils.WebUtils;
import com.perfree.constant.ArticleConstant;
import com.perfree.constant.CommentConstant;
import com.perfree.constant.MailTemplateConstant;
import com.perfree.constant.OptionConstant;
import com.perfree.controller.auth.article.vo.ArticleRespVO;
import com.perfree.controller.auth.comment.vo.CommentRespVO;
import com.perfree.enums.OptionEnum;
import com.perfree.mail.MailService;
import com.perfree.mapper.ArticleMapper;
import com.perfree.mapper.CommentMapper;
import jakarta.annotation.Resource;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.util.HashMap;

@Service
public class AsyncServiceImpl implements AsyncService{

    @Value("${server.port}")
    private int serverPort;

    @Resource
    private CommentMapper commentMapper;

    @Resource
    private ArticleMapper articleMapper;

    @Resource
    private MailService mailService;

    @Resource
    private OptionCacheService optionCacheService;

    @Override
    @Async
    public void sendCommentMail(Integer commentId, boolean isUpdateStatus) {
        String webSite = optionCacheService.getDefaultValue(OptionEnum.WEB_SITE.getKey(), OptionConstant.OPTION_IDENTIFICATION_SYSTEM_SETTING, WebUtils.getUrl(serverPort));

        CommentRespVO commentRespVO = commentMapper.queryById(commentId);
        ArticleRespVO articleById = articleMapper.getArticleById(commentRespVO.getArticleId());

        HashMap<String, String> params = new HashMap<>();
        params.put("content", commentRespVO.getContent());
        params.put("userName", null != commentRespVO.getUserInfo()? commentRespVO.getUserInfo().getUserName() : commentRespVO.getUserName());
        params.put("articleTitle", commentRespVO.getArticleTitle());
        if (commentRespVO.getArticleType().equals(ArticleConstant.ARTICLE_TYPE_JOURNAL)) {
            params.put("url", webSite + "/journal");
        }
        if (commentRespVO.getArticleType().equals(ArticleConstant.ARTICLE_TYPE_ARTICLE)) {
            params.put("url", webSite + "/article/" + commentRespVO.getArticleSlug());
        }
        if (commentRespVO.getArticleType().equals(ArticleConstant.ARTICLE_TYPE_PAGE)) {
            params.put("url", webSite + "/page/" + commentRespVO.getArticleSlug());
        }

        params.put("commentTime", DateUtil.format(commentRespVO.getCreateTime(), "yyyy-MM-dd HH:mm:ss"));
        params.put("avatar", webSite + (null != commentRespVO.getUserInfo()? commentRespVO.getUserInfo().getAvatar() : commentRespVO.getAvatar()));
        params.put("website", null != commentRespVO.getUserInfo()? commentRespVO.getUserInfo().getWebsite() : commentRespVO.getWebsite());
        params.put("device", commentRespVO.getDevice());
        params.put("ip", commentRespVO.getIp());
        String commentEmail = null != commentRespVO.getUserInfo()? commentRespVO.getUserInfo().getEmail() : commentRespVO.getEmail();
        params.put("email", commentEmail);
        params.put("status", commentRespVO.getStatus().equals(CommentConstant.COMMENT_STATUS_AUDIT) ? "待审核" : "正常");

        // 给文章作者发邮件
        if (null != articleById && null != articleById.getUser()
                && StringUtils.isNotBlank(articleById.getUser().getEmail())
                && !commentEmail.equals(articleById.getUser().getEmail())
                && !isUpdateStatus) {
            mailService.sendMailByTemplateCode(MailTemplateConstant.COMMENT_EMAIL_CODE, articleById.getUser().getEmail(), params);
        }

        // 如果是待审核的,到这儿就结束了
        if (commentRespVO.getStatus().equals(CommentConstant.COMMENT_STATUS_AUDIT)) {
            return;
        }

        // 判断是否是回复内容,如果不是,返回,反之给其发邮件
        if (commentRespVO.getTopPid().equals(CommentConstant.COMMENT_TOP_VALUE)) {
            return;
        }

        CommentRespVO parentComment = commentMapper.queryById(commentRespVO.getPid());
        String parentEmail = null != parentComment.getUserInfo()? parentComment.getUserInfo().getEmail() : parentComment.getEmail();
        if (StringUtils.isBlank(parentEmail)) {
            return;
        }
        // 如果和文章作者邮箱一样,不发送,避免重复发送
        if (null != articleById && null != articleById.getUser() && parentEmail.equals(articleById.getUser().getEmail())) {
            return;
        }
        // 自己回复自己不发
        if(commentEmail.equals(parentEmail)) {
            return;
        }
        params.put("parentContent", parentComment.getContent());
        mailService.sendMailByTemplateCode(MailTemplateConstant.COMMENT_REVERT_EMAIL_CODE, parentEmail, params);
    }

    @Override
    @Async
    public void sendFindPasswordMail(String random, String email) {
        HashMap<String, String> params = new HashMap<>();
        params.put("random", random);
        mailService.sendMailByTemplateCode(MailTemplateConstant.FIND_PASSWORD_CODE, email, params);
    }
}
