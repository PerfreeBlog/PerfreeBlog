package com.perfree.controller.common.article;

import com.perfree.commons.common.CommonResult;
import com.perfree.commons.common.PageResult;
import com.perfree.constant.ArticleConstant;
import com.perfree.controller.auth.article.vo.ArticlePageReqVO;
import com.perfree.controller.auth.article.vo.ArticleRespVO;
import com.perfree.controller.common.article.vo.ArchivePageReqVO;
import com.perfree.controller.common.article.vo.ArchiveRespVO;
import com.perfree.convert.article.ArticleConvert;
import com.perfree.model.Article;
import com.perfree.service.article.ArticleService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.perfree.commons.common.CommonResult.success;

@RestController
@Tag(name = "文章相关接口")
@RequestMapping("api/article")
public class ArticleController {

    @Resource
    private ArticleService articleService;

    @GetMapping("like")
    @Operation(summary = "文章/动态点赞")
    public CommonResult<Boolean> like(@RequestParam("id") Integer id){
        return success(articleService.updateGreatCount(id));
    }

    @PostMapping("archivePage")
    @Operation(summary = "文章归档列表分页")
    public CommonResult<PageResult<ArchiveRespVO>> archivePage(@RequestBody ArchivePageReqVO pageVO){
        return success(articleService.archivePage(pageVO));
    }

    @GetMapping("getLatestArticle")
    @Operation(summary = "获取最近更新的文章")
    public CommonResult<List<ArticleRespVO>> getLatestArticle(@RequestParam("num") Integer num) {
        List<ArticleRespVO> latestArticle = articleService.getLatestArticle(num);
        return success(latestArticle);
    }

    @GetMapping("getHotArticleByComment")
    @Operation(summary = "获取评论最多的热门文章文章")
    public CommonResult<List<ArticleRespVO>> getHotArticleByComment(@RequestParam("num") Integer num) {
        List<ArticleRespVO> latestArticle = articleService.getHotArticleByCommentCount(num);
        return success(latestArticle);
    }

    @GetMapping("getHotArticleByViewCount")
    @Operation(summary = "获取浏览量最多的热门文章文章")
    public CommonResult<List<ArticleRespVO>> getHotArticleByViewCount(@RequestParam("num") Integer num) {
        List<ArticleRespVO> latestArticle = articleService.getHotArticleByViewCount(num);
        return success(latestArticle);
    }

    @GetMapping("getHotArticleByGreatCount")
    @Operation(summary = "获取点赞最多的热门文章文章")
    public CommonResult<List<ArticleRespVO>> getHotArticleByGreatCount(@RequestParam("num") Integer num) {
        List<ArticleRespVO> latestArticle = articleService.getHotArticleByGreatCount(num);
        return success(latestArticle);
    }

    @PostMapping("/page")
    @Operation(summary = "文章分页列表")
    public CommonResult<PageResult<ArticleRespVO>> page(@RequestBody ArticlePageReqVO pageVO) {
        return success(articleService.articlePage(pageVO));
    }

    @GetMapping("/get")
    @Operation(summary = "根据id获取文章")
    public CommonResult<ArticleRespVO> get(@RequestParam(value = "id") Integer id) {
        return CommonResult.success(articleService.getArticleById(id));
    }

    @GetMapping("/getBySlug")
    @Operation(summary = "根据slug获取文章")
    public CommonResult<ArticleRespVO> getBySlug(@RequestParam(value = "slug") String slug) {
        return CommonResult.success(articleService.getBySlug(slug));
    }

    @GetMapping("/getAllPage")
    @Operation(summary = "获取所有页面")
    public CommonResult<List<ArticleRespVO>> getAllPage() {
        List<Article> articleList = articleService.getAllPage();
        return CommonResult.success(ArticleConvert.INSTANCE.convertToRespList(articleList));
    }

    @GetMapping("/getNextArticle")
    @Operation(summary = "根据id获取下一篇文章")
    public CommonResult<ArticleRespVO> getNextArticle(@RequestParam(value = "id") Integer id) {
        return CommonResult.success(articleService.getNextArticle(id, ArticleConstant.ARTICLE_TYPE_ARTICLE, ArticleConstant.ARTICLE_STATUS_PUBLISHED));
    }

    @GetMapping("/getPreArticle")
    @Operation(summary = "根据id获取上一篇文章")
    public CommonResult<ArticleRespVO> getPreArticle(@RequestParam(value = "id") Integer id) {
        return CommonResult.success(articleService.getPreArticle(id, ArticleConstant.ARTICLE_TYPE_ARTICLE, ArticleConstant.ARTICLE_STATUS_PUBLISHED));
    }
}
