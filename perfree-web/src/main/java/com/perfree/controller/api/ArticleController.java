package com.perfree.controller.api;

import com.perfree.base.BaseApiController;
import com.perfree.commons.*;
import com.perfree.model.Archive;
import com.perfree.model.Article;
import com.perfree.service.ArticleService;
import io.swagger.annotations.*;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import javax.servlet.http.HttpServletRequest;

/**
 * Article API Controller
 */
@RestController
@CrossOrigin
@Api(value = "文章相关",tags = "文章相关")
@RequestMapping("/api/article")
public class ArticleController extends BaseApiController {
    @Autowired
    private ArticleService articleService;

    @GetMapping("/getArticleById")
    @ApiOperation(value = "根据文章ID获取文章数据", notes = "根据文章ID获取文章数据")
    public ResponseBean getArticleById(@ApiParam(name="articleId",value="文章ID",required=true) @RequestParam("articleId") String articleId, HttpServletRequest request) {
        Article article = articleService.getById(articleId);
        if (article != null) {
            articleService.cacheCount(article.getId().toString(), IpUtil.getIpAddr(request));
        }
        return ResponseBean.success("success", article);
    }


    @GetMapping("/list")
    @ApiOperation(value = "文章分页数据", notes = "获取文章分页数据,可根据文章标题title模糊查询或根据content全文模糊查询")
    @ApiImplicitParams({
        @ApiImplicitParam(name = "pageIndex", value = "页码", dataTypeClass = Integer.class, paramType = "query", required = true),
        @ApiImplicitParam(name = "pageSize", value = "每页数据量", dataTypeClass = Integer.class, paramType = "query", required = true),
        @ApiImplicitParam(name = "title", value = "文章标题", dataTypeClass = String.class, paramType = "query"),
        @ApiImplicitParam(name = "categoryId", value = "文章分类ID", dataTypeClass = String.class, paramType = "query"),
        @ApiImplicitParam(name = "type", value = "文章类型:如article/journal/page", dataTypeClass = String.class, paramType = "query"),
        @ApiImplicitParam(name = "content", value = "关键字: 会从标题及内容中搜索", dataTypeClass = String.class, paramType = "query"),
        @ApiImplicitParam(name = "orderBy", value = "排序字段,默认isTop,createTime", dataTypeClass = String.class, paramType = "query"),
        @ApiImplicitParam(name = "orderByWay", value = "排序字段,默认desc", dataTypeClass = String.class, paramType = "query")
    })
    public Pager<Article> list(@ApiIgnore Pager<Article> pager, @ApiIgnore @RequestParam(required = false) String title,
                               @ApiIgnore @RequestParam(required = false) String categoryId,
                               @ApiIgnore @RequestParam(required = false) String type,
                               @ApiIgnore @RequestParam(required = false) String content,
                               @ApiIgnore @RequestParam(required = false) String orderBy,
                               @ApiIgnore @RequestParam(required = false) String orderByWay){
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
    @ApiOperation(value = "根据文章ID获取上一篇文章", notes = "根据文章ID获取上一篇文章数据")
    public ResponseBean getPreArticle(@ApiParam(name="articleId",value="文章ID",required=true) @RequestParam("articleId") Long articleId) {
        Article article = articleService.getPreArticle(articleId);
        return ResponseBean.success("success", article);
    }

    @GetMapping("/getNextArticle")
    @ApiOperation(value = "根据文章ID获取下一篇文章", notes = "根据文章ID获取下一篇文章数据")
    public ResponseBean getNextArticle(@ApiParam(name="articleId",value="文章ID",required=true) @RequestParam("articleId") String articleId) {
        Article article = articleService.getNextArticle(Long.valueOf(articleId));
        return ResponseBean.success("success", article);
    }

    @GetMapping("/getArchive")
    @ApiOperation(value = "获取文章归档分页数据", notes = "获取文章归档分页数据")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "pageIndex", value = "页码", dataTypeClass = Integer.class, paramType = "query", example = "1", required = true),
            @ApiImplicitParam(name = "pageSize", value = "每页数据量", dataTypeClass = Integer.class, paramType = "query", example = "30", required = true),
    })
    public Pager<Archive> getArchive(@ApiIgnore Pager<Archive> pager){
        return articleService.getApiArchive(pager);
    }

    @GetMapping("/like")
    @ApiOperation(value = "文章/动态点赞", notes = "文章/动态点赞,前端记得本地缓存~")
    @AccessCacheLock
    public ResponseBean like(@ApiParam(name="id",value="ID",required=true) @RequestParam("id") Long id){
        articleService.updateGreatCount(id);
        return ResponseBean.success("success", null);
    }

    @GetMapping("/getListByTagId")
    @ApiOperation(value = "根据标签ID获取文章分页列表", notes = "根据标签ID获取文章分页列表")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "pageIndex", value = "页码", dataTypeClass = Integer.class, paramType = "query", example = "1", required = true),
            @ApiImplicitParam(name = "pageSize", value = "每页数据量", dataTypeClass = Integer.class, paramType = "query", example = "30", required = true),
            @ApiImplicitParam(name = "title", value = "文章标题", dataTypeClass = String.class, paramType = "query"),
            @ApiImplicitParam(name = "tagId", value = "文章标签ID", dataTypeClass = String.class, paramType = "query", required = true)
    })
    public Pager<Article> getListByTagId(@ApiIgnore Pager<Article> pager, @ApiIgnore @RequestParam(required = false) String title,
                                           @ApiIgnore String tagId){
        pager.setForm(new Article());
        pager.getForm().setTitle(title);
        return articleService.getListByTagId(pager, tagId);
    }
}
