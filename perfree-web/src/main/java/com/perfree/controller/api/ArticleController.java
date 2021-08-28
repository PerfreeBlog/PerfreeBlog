package com.perfree.controller.api;

import com.perfree.common.Pager;
import com.perfree.common.ResponseBean;
import com.perfree.controller.BaseApiController;
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
@Api(value = "文章相关",tags = "文章模块")
@RequestMapping("/api/article")
public class ArticleController extends BaseApiController {
    @Autowired
    private ArticleService articleService;

    @PostMapping("/getArticleById")
    @ApiOperation(value = "根据文章ID获取文章数据", notes = "根据文章ID获取文章数据")
    public ResponseBean getArticleById(@ApiParam(name="articleId",value="文章ID",required=true) @RequestBody String articleId) {
        Article article = articleService.getById(articleId);
        return ResponseBean.success("success", article);
    }


    @PostMapping("/list")
    @ApiOperation(value = "文章分页数据", notes = "获取文章分页数据(根据发布时间排序,置顶文章优先级会提高),可根据文章标题title模糊查询")
    public Pager<Article> list(@RequestBody Pager<Article> pager){
        return articleService.apiList(pager);
    }


    @PostMapping("/getHotListByView")
    @ApiOperation(value = "最热文章分页数据(阅读量排序)", notes = "获取最热文章分页数据(根据阅读量排序)")
    public Pager<Article> getHotListByView(@RequestBody Pager<Article> pager){
        return articleService.getApiHotArticleList(pager, 1);
    }

    @PostMapping("/getHotListByComment")
    @ApiOperation(value = "最热文章分页数据(评论排序)", notes = "获取最热文章分页数据(根据评论量排序)")
    public Pager<Article> getHotListByComment(@RequestBody Pager<Article> pager){
        return articleService.getApiHotArticleList(pager, 0);
    }

    @PostMapping("/getPreArticle")
    @ApiOperation(value = "根据文章ID获取上一篇文章", notes = "根据文章ID获取上一篇文章数据")
    public ResponseBean getPreArticle(@ApiParam(name="articleId",value="文章ID",required=true) @RequestBody Long articleId) {
        Article article = articleService.getPreArticle(articleId);
        return ResponseBean.success("success", article);
    }

    @PostMapping("/getNextArticle")
    @ApiOperation(value = "根据文章ID获取下一篇文章", notes = "根据文章ID获取下一篇文章数据")
    public ResponseBean getNextArticle(@ApiParam(name="articleId",value="文章ID",required=true) @RequestBody Long articleId) {
        Article article = articleService.getNextArticle(articleId);
        return ResponseBean.success("success", article);
    }

    @PostMapping("/getArchive")
    @ApiOperation(value = "获取文章归档分页数据", notes = "获取文章归档分页数据")
    public Pager<Archive> getArchive(@RequestBody Pager<Archive> pager){
        return articleService.getApiArchive(pager);
    }
}
