package com.perfree.controller.api.pub;

import com.perfree.commons.Pager;
import com.perfree.commons.ResponseBean;
import com.perfree.base.BaseApiController;
import com.perfree.model.Archive;
import com.perfree.model.Article;
import com.perfree.service.ArticleService;
import io.swagger.annotations.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

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
    public ResponseBean getArticleById(@ApiParam(name="articleId",value="文章ID",required=true) @RequestParam("articleId") String articleId) {
        Article article = articleService.getById(articleId);
        return ResponseBean.success("success", article);
    }


    @GetMapping("/list")
    @ApiOperation(value = "文章分页数据", notes = "获取文章分页数据(根据发布时间排序,置顶文章优先级会提高),可根据文章标题title模糊查询")
    @ApiImplicitParams({
        @ApiImplicitParam(name = "pageIndex", value = "页码", dataType = "Integer", paramType = "query", required = true),
        @ApiImplicitParam(name = "pageSize", value = "每页数据量", dataType = "Integer", paramType = "query", required = true),
        @ApiImplicitParam(name = "title", value = "文章标题", dataType = "string", paramType = "query"),
    })
    public Pager<Article> list(@ApiIgnore Pager<Article> pager, @ApiIgnore String title){
        pager.setForm(new Article());
        pager.getForm().setTitle(title);
        return articleService.apiList(pager);
    }


    @GetMapping("/getHotListByView")
    @ApiOperation(value = "最热文章分页数据(阅读量排序)", notes = "获取最热文章分页数据(根据阅读量排序)")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "pageIndex", value = "页码", dataType = "Integer", paramType = "query", example = "1", required = true),
            @ApiImplicitParam(name = "pageSize", value = "每页数据量", dataType = "Integer", paramType = "query", example = "30", required = true),
            @ApiImplicitParam(name = "title", value = "文章标题", dataType = "string", paramType = "query", example = "测试"),
    })
    public Pager<Article> getHotListByView(@ApiIgnore Pager<Article> pager, @ApiIgnore String title){
        pager.setForm(new Article());
        pager.getForm().setTitle(title);
        return articleService.getApiHotArticleList(pager, 1);
    }

    @GetMapping("/getHotListByComment")
    @ApiOperation(value = "最热文章分页数据(评论排序)", notes = "获取最热文章分页数据(根据评论量排序)")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "pageIndex", value = "页码", dataType = "Integer", paramType = "query", example = "1", required = true),
            @ApiImplicitParam(name = "pageSize", value = "每页数据量", dataType = "Integer", paramType = "query", example = "30", required = true),
            @ApiImplicitParam(name = "title", value = "文章标题", dataType = "string", paramType = "query", example = "测试"),
    })
    public Pager<Article> getHotListByComment(@ApiIgnore Pager<Article> pager, @ApiIgnore String title){
        pager.setForm(new Article());
        pager.getForm().setTitle(title);
        return articleService.getApiHotArticleList(pager, 0);
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
            @ApiImplicitParam(name = "pageIndex", value = "页码", dataType = "Integer", paramType = "query", example = "1", required = true),
            @ApiImplicitParam(name = "pageSize", value = "每页数据量", dataType = "Integer", paramType = "query", example = "30", required = true),
    })
    public Pager<Archive> getArchive(@ApiIgnore Pager<Archive> pager){
        return articleService.getApiArchive(pager);
    }
}
