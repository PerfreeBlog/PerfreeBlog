package com.perfree.controller.api;

import com.perfree.base.BaseApiController;
import com.perfree.commons.*;
import com.perfree.model.Archive;
import com.perfree.model.Article;
import com.perfree.service.ArticleService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 * Article API Controller
 */
@RestController
@CrossOrigin
@Tag(name = "文章相关")
@RequestMapping("/api/article")
public class ArticleController extends BaseApiController {
    @Autowired
    private ArticleService articleService;

    @GetMapping("/getArticleById")
    @Operation(summary = "根据文章ID获取文章数据")
    public ResponseBean getArticleById(@RequestParam("articleId") String articleId, HttpServletRequest request) {
        Article article = articleService.getById(articleId);
        if (article != null) {
            articleService.cacheCount(article.getId().toString(), IpUtil.getIpAddr(request));
        }
        return ResponseBean.success("success", article);
    }


    @GetMapping("/list")
    @Operation(summary = "文章分页数据")
    public Pager<Article> list(Pager<Article> pager, @RequestParam(required = false) String title,
                               @RequestParam(required = false) String categoryId,
                               @RequestParam(required = false) String type,
                               @RequestParam(required = false) String content,
                               @RequestParam(required = false) String orderBy,
                               @RequestParam(required = false) String orderByWay) {
        pager.setForm(new Article());
        pager.getForm().setTitle(title);
        if (StringUtils.isBlank(type)) {
            pager.getForm().setType(Constants.ARTICLE_TYPE_ARTICLE);
        } else {
            pager.getForm().setType(type);
        }
        if (StringUtils.isNotBlank(categoryId)) {
            pager.getForm().setCategoryId(Long.parseLong(categoryId));
        }
        if (StringUtils.isNotBlank(content)) {
            pager.getForm().setContent(content);
        }
        String orderSql = StringUtil.generateOrderBy(orderBy, orderByWay, pager.getForm());
        pager.setOrderBy(orderSql);
        return articleService.apiList(pager);
    }

    @GetMapping("/getPreArticle")
    @Operation(summary = "根据文章ID获取上一篇文章")
    public ResponseBean getPreArticle(@RequestParam("articleId") Long articleId) {
        Article article = articleService.getPreArticle(articleId);
        return ResponseBean.success("success", article);
    }

    @GetMapping("/getNextArticle")
    @Operation(summary = "根据文章ID获取下一篇文章")
    public ResponseBean getNextArticle(@RequestParam("articleId") String articleId) {
        Article article = articleService.getNextArticle(Long.valueOf(articleId));
        return ResponseBean.success("success", article);
    }

    @GetMapping("/getArchive")
    @Operation(summary = "获取文章归档分页数据")
    public Pager<Archive> getArchive(Pager<Archive> pager) {
        return articleService.getApiArchive(pager);
    }

    @GetMapping("/like")
    @Operation(summary = "文章/动态点赞")
    @AccessCacheLock
    public ResponseBean like(@RequestParam("id") Long id) {
        articleService.updateGreatCount(id);
        return ResponseBean.success("success", null);
    }

    @GetMapping("/getListByTagId")
    @Operation(summary = "根据标签ID获取文章分页列表")
    public Pager<Article> getListByTagId(Pager<Article> pager, @RequestParam(required = false) String title, String tagId) {
        pager.setForm(new Article());
        pager.getForm().setTitle(title);
        return articleService.getListByTagId(pager, tagId);
    }
}
