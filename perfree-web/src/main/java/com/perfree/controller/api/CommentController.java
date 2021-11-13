package com.perfree.controller.api;

import cn.hutool.http.HtmlUtil;
import com.perfree.commons.*;
import com.perfree.controller.BaseApiController;
import com.perfree.model.Article;
import com.perfree.model.Comment;
import com.perfree.model.Option;
import com.perfree.model.User;
import com.perfree.service.ArticleService;
import com.perfree.service.CommentService;
import com.perfree.service.MailService;
import com.perfree.service.OptionService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import net.sf.ehcache.CacheManager;
import net.sf.ehcache.Ehcache;
import net.sf.ehcache.Element;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

@RestController
@CrossOrigin
@Api(value = "评论相关",tags = "评论模块")
@RequestMapping("/api/comment")
public class CommentController extends BaseApiController {
    //缓存
    private static final CacheManager cacheManager = CacheManager.newInstance();
    @Autowired
    private CommentService commentService;
    @Autowired
    private ArticleService articleService;
    @Autowired
    private OptionService optionService;
    @Autowired
    private MailService mailService;

    @PostMapping("/submitComment")
    @ApiOperation(value = "提交评论内容", notes = "提交评论内容")
    public ResponseBean submitComment(@RequestBody @Valid Comment comment, HttpServletRequest request){
        Article article = articleService.getById(comment.getArticleId().toString());
        if(article.getIsComment() == 0) {
            return ResponseBean.error(-1,"该文章已关闭评论功能" , null);
        }
        User user = getLoginUser(request);
        if (user == null) {
            if (StringUtils.isBlank(comment.getUserName())) {
                return ResponseBean.error(-2,"请填写名称" , null);
            }
            if (StringUtils.isBlank(comment.getEmail())) {
                return ResponseBean.error(-3,"请填写邮箱" , null);
            }
            if (!ValidUtil.isEmail(comment.getEmail())) {
                return ResponseBean.error(-5,"请正确填写邮箱" , null);
            }
            if (!canComment(IpUtil.getIpAddr(request), comment.getArticleId().toString())) {
                return ResponseBean.error(-4 ,"评论过于频繁,请稍候再试", null);
            }
            comment.setAvatar(GravatarUtil.getGravatar(comment.getEmail()));
        } else {
            comment.setUserId(user.getId());
            comment.setAvatar(user.getAvatar());
            comment.setEmail(user.getEmail());
            comment.setUserName(user.getUserName());
            comment.setWebsite(user.getWebsite());
        }

        Option optionByKey = optionService.getOptionByKey(Constants.OPTION_WEB_COMMENT_IS_REVIEW);
        if (optionByKey != null && StringUtils.isNotBlank(optionByKey.getValue()) &&
                optionByKey.getValue().equals(String.valueOf(Constants.COMMENT_STATUS_REVIEW))){
            comment.setStatus(Constants.COMMENT_STATUS_REVIEW);
        } else {
            comment.setStatus(Constants.COMMENT_STATUS_NORMAL);
        }
        comment.setContent(HtmlUtil.filter(comment.getContent()));
        if (commentService.add(comment) > 0) {
            if (comment.getStatus() == Constants.COMMENT_STATUS_NORMAL) {
                mailService.commentMailSend(comment);
                return ResponseBean.success("评论成功", comment);
            }
            mailService.commentMailSend(comment);
            return ResponseBean.error(201 ,"评论成功,正在等待管理员审核", null);
        }
        return ResponseBean.fail("评论失败", null);
    }


    @PostMapping("/getCommentByArticleId")
    @ApiOperation(value = "根据文章ID获取评论分页列表", notes = "根据文章ID获取评论分页列表")
    public Pager<Comment> getCommentByArticleId(@RequestBody Pager<Comment> pager) {
        return commentService.getApiCommentByArticleId(pager);
    }


    /**
     * 利用缓存设置短时间内不能二次评论
     * @param articleId articleId
     * @param Ip Ip
     */
    public boolean canComment(String Ip, String articleId){
        //查询缓存
        Ehcache cache = cacheManager.getEhcache("commentCache");
        Element element = cache.get(Ip + "_comment");
        if(element == null){
            cache.put(new Element(Ip + "_comment", articleId));
           return true;
        }
        return false;
    }
}
