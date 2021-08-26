package com.perfree.controller.api;

import com.perfree.common.Pager;
import com.perfree.common.ResponseBean;
import com.perfree.controller.BaseApiController;
import com.perfree.model.Article;
import com.perfree.service.ArticleService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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
        if (pager.getForm() != null) {
            pager.getForm().setType("article");
        }
        return articleService.list(pager);
    }
}
