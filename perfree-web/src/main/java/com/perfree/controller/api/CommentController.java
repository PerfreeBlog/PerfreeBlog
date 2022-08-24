package com.perfree.controller.api;

import cn.hutool.http.HtmlUtil;
import com.perfree.base.BaseApiController;
import com.perfree.commons.*;
import com.perfree.model.Article;
import com.perfree.model.Comment;
import com.perfree.model.Option;
import com.perfree.model.User;
import com.perfree.plugin.PluginHolder;
import com.perfree.plugin.PluginInfo;
import com.perfree.plugin.proxy.CommentProxy;
import com.perfree.plugin.utils.PluginsUtils;
import com.perfree.service.ArticleService;
import com.perfree.service.CommentService;
import com.perfree.service.MailService;
import com.perfree.service.OptionService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import net.sf.ehcache.CacheManager;
import net.sf.ehcache.Ehcache;
import net.sf.ehcache.Element;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import springfox.documentation.annotations.ApiIgnore;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin
@Api(value = "评论相关",tags = "评论相关")
@RequestMapping(value = {"/api/comment", "/comments"})
@SuppressWarnings("all")
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
    @ApiOperation(value = "提交评论内容", notes = "提交评论内容(如未登录或没有token,则用户名/邮箱为必填)")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "content", value = "评论内容", dataTypeClass = String.class, required = true),
            @ApiImplicitParam(name = "articleId", value = "文章id", dataTypeClass = Integer.class),
            @ApiImplicitParam(name = "pid", value = "父级评论id", dataTypeClass = Integer.class),
            @ApiImplicitParam(name = "topPid", value = "顶级评论ID", dataTypeClass = Integer.class),
            @ApiImplicitParam(name = "userName", value = "用户名", dataTypeClass = String.class),
            @ApiImplicitParam(name = "website", value = "网址", dataTypeClass = String.class),
            @ApiImplicitParam(name = "email", value = "邮箱", dataTypeClass = String.class)
    })
    @AccessCacheLock
    public ResponseBean submitComment(@ApiIgnore @Valid Comment comment, @ApiIgnore HttpServletRequest request){
        Article article = articleService.getById(comment.getArticleId().toString());
        if(article.getIsComment() == 0) {
            return ResponseBean.error(-1,"该文章已关闭评论功能" , null);
        }
        User user = getLoginUser(request);
        comment.setReadAvatar(false);
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
            comment.setAvatar(GravatarUtil.getGravatar(comment.getEmail()));
        } else {
            user.setReadAvatar(false);
            comment.setUserId(user.getId());
            comment.setAvatar(user.getAvatar());
            comment.setEmail(user.getEmail());
            comment.setUserName(user.getUserName());
            comment.setWebsite(user.getWebsite());
        }

        String commentIsStint = OptionCacheUtil.getDefaultValue(Constants.OPTION_WEB_COMMENT_IS_STINT, Constants.COMMENT_IS_STINT);
        if (Constants.COMMENT_IS_STINT.equals(commentIsStint)) {
            if (!canComment(IpUtil.getIpAddr(request), comment.getArticleId().toString())) {
                return ResponseBean.error(-4 ,"评论过于频繁,请稍候再试", null);
            }
        }

        Option optionByKey = optionService.getOptionByKey(Constants.OPTION_WEB_COMMENT_IS_REVIEW);
        if (optionByKey != null && StringUtils.isNotBlank(optionByKey.getValue()) &&
                optionByKey.getValue().equals(String.valueOf(Constants.COMMENT_STATUS_REVIEW))){
            comment.setStatus(Constants.COMMENT_STATUS_REVIEW);
        } else {
            comment.setStatus(Constants.COMMENT_STATUS_NORMAL);
        }
        comment.setContent(HtmlUtil.filter(comment.getContent()));

        // 插件评论代理前置处理
        List<CommentProxy> allPluginProxyClass = PluginsUtils.getAllPluginProxyClass(CommentProxy.class);
        for (CommentProxy commentProxy : allPluginProxyClass) {
            ResponseBean responseBean = commentProxy.commentIsSave(comment);
            if (responseBean != null) {
                return  responseBean;
            }
            comment = commentProxy.commentSaveBefore(comment);
        }

        if (commentService.add(comment) > 0) {
            // 插件评论代理后置处理
            for (CommentProxy commentProxy : allPluginProxyClass) {
                comment = commentProxy.commentSaveAfter(comment);
            }

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
    @ApiImplicitParams({
            @ApiImplicitParam(name = "pageIndex", value = "页码", dataTypeClass = Integer.class, paramType = "query", required = true),
            @ApiImplicitParam(name = "pageSize", value = "每页数据量", dataTypeClass = Integer.class, paramType = "query", required = true),
            @ApiImplicitParam(name = "articleId", value = "文章id", dataTypeClass = Integer.class, paramType = "query"),
    })
    public Pager<Comment> getCommentByArticleId(@ApiIgnore Pager<Comment> pager, @ApiIgnore Long articleId) {
        pager.setForm(new Comment());
        pager.getForm().setArticleId(articleId);
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
