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
import org.noear.solon.annotation.*;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

import static com.perfree.commons.common.CommonResult.success;

@Controller
@Tag(name = "文章相关接口")
@Mapping("api/article")
public class ArticleController {

    @Inject
    private ArticleService articleService;

    @Get
    @Mapping("like")
    @Operation(summary = "文章/动态点赞")
    public CommonResult<Boolean> like(@Param("id") Integer id){
        return success(articleService.updateGreatCount(id));
    }

    @Post
    @Mapping("archivePage")
    @Operation(summary = "文章归档列表分页")
    public CommonResult<PageResult<ArchiveRespVO>> archivePage(@Body ArchivePageReqVO pageVO){
        return success(articleService.archivePage(pageVO));
    }

    @Get
    @Mapping("getLatestArticle")
    @Operation(summary = "获取最近更新的文章")
    public CommonResult<List<ArticleRespVO>> getLatestArticle(@Param("num") Integer num) {
        List<ArticleRespVO> latestArticle = articleService.getLatestArticle(num);
        return success(latestArticle);
    }

    @Get
    @Mapping("getHotArticleByComment")
    @Operation(summary = "获取评论最多的热门文章文章")
    public CommonResult<List<ArticleRespVO>> getHotArticleByComment(@Param("num") Integer num) {
        List<ArticleRespVO> latestArticle = articleService.getHotArticleByCommentCount(num);
        return success(latestArticle);
    }

    @Get
    @Mapping("getHotArticleByViewCount")
    @Operation(summary = "获取浏览量最多的热门文章文章")
    public CommonResult<List<ArticleRespVO>> getHotArticleByViewCount(@Param("num") Integer num) {
        List<ArticleRespVO> latestArticle = articleService.getHotArticleByViewCount(num);
        return success(latestArticle);
    }

    @Get
    @Mapping("getHotArticleByGreatCount")
    @Operation(summary = "获取点赞最多的热门文章文章")
    public CommonResult<List<ArticleRespVO>> getHotArticleByGreatCount(@Param("num") Integer num) {
        List<ArticleRespVO> latestArticle = articleService.getHotArticleByGreatCount(num);
        return success(latestArticle);
    }

    @Post
    @Mapping("/page")
    @Operation(summary = "文章分页列表")
    public CommonResult<PageResult<ArticleRespVO>> page(@Body ArticlePageReqVO pageVO) {
        return success(articleService.articlePage(pageVO));
    }

    @Get
    @Mapping("/get")
    @Operation(summary = "根据id获取文章")
    public CommonResult<ArticleRespVO> get(@Param(value = "id") Integer id) {
        return CommonResult.success(articleService.getArticleById(id));
    }

    @Get
    @Mapping("/getBySlug")
    @Operation(summary = "根据slug获取文章")
    public CommonResult<ArticleRespVO> getBySlug(@Param(value = "slug") String slug) {
        return CommonResult.success(articleService.getBySlug(slug));
    }

    @Get
    @Mapping("/getAllPage")
    @Operation(summary = "获取所有页面")
    public CommonResult<List<ArticleRespVO>> getAllPage() {
        List<Article> articleList = articleService.getAllPage();
        return CommonResult.success(ArticleConvert.INSTANCE.convertToRespList(articleList));
    }

    @Get
    @Mapping("/getNextArticle")
    @Operation(summary = "根据id获取下一篇文章")
    public CommonResult<ArticleRespVO> getNextArticle(@Param(value = "id") Integer id) {
        return CommonResult.success(articleService.getNextArticle(id, ArticleConstant.ARTICLE_TYPE_ARTICLE, ArticleConstant.ARTICLE_STATUS_PUBLISHED));
    }

    @Get
    @Mapping("/getPreArticle")
    @Operation(summary = "根据id获取上一篇文章")
    public CommonResult<ArticleRespVO> getPreArticle(@Param(value = "id") Integer id) {
        return CommonResult.success(articleService.getPreArticle(id, ArticleConstant.ARTICLE_TYPE_ARTICLE, ArticleConstant.ARTICLE_STATUS_PUBLISHED));
    }
}
