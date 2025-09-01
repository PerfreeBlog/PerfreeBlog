package com.perfree.controller.auth.article;


import com.perfree.commons.common.CommonResult;
import com.perfree.commons.common.PageResult;
import com.perfree.controller.auth.article.vo.*;
import com.perfree.controller.auth.journal.vo.JournalRespVO;
import com.perfree.controller.auth.journal.vo.JournalUpdateReqVO;
import com.perfree.convert.article.ArticleConvert;
import com.perfree.model.Article;
import com.perfree.service.article.ArticleService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.annotation.Resource;
import jakarta.validation.Valid;
import org.noear.solon.annotation.*;
import org.noear.solon.annotation.Mapping;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.perfree.commons.common.CommonResult.success;

@Controller
@Tag(name = "文章相关接口")
@Mapping("api/auth/article")
public class ArticleController {

    private final static Logger LOGGER = LoggerFactory.getLogger(ArticleController.class);

    @Inject
    private ArticleService articleService;

    @Post
    @Mapping("/page")
    @Operation(summary = "文章分页列表")
    public CommonResult<PageResult<ArticleRespVO>> page(@Body ArticlePageReqVO pageVO) {
        return success(articleService.articlePage(pageVO));
    }

    @Post
    @Mapping("/createArticle")
    @Operation(summary = "发表文章")
    @PreAuthorize("@ss.hasPermission('admin:article:create')")
    public CommonResult<ArticleRespVO> createArticle(@Body @Valid ArticleAddReqVO articleAddReqVO) {
        Article article = articleService.createArticle(articleAddReqVO);
        return CommonResult.success(ArticleConvert.INSTANCE.convertRespVO(article));
    }

    @Put
    @Mapping("/updateArticle")
    @Operation(summary = "修改文章")
    @PreAuthorize("@ss.hasPermission('admin:article:update')")
    public CommonResult<ArticleRespVO> updateArticle(@Body @Valid ArticleUpdateReqVO articleUpdateReqVO) {
        Article article = articleService.updateArticle(articleUpdateReqVO);
        return CommonResult.success(ArticleConvert.INSTANCE.convertRespVO(article));
    }


    @Post
    @Mapping("/updateIsComment")
    @Operation(summary = "修改是否允许评论")
    @PreAuthorize("@ss.hasPermission('admin:article:updateIsComment')")
    public CommonResult<Boolean> updateIsComment(@Body @Valid ArticleUpdateIsCommentReqVO articleUpdateIsCommentReqVO) {
        return CommonResult.success(articleService.updateIsComment(articleUpdateIsCommentReqVO));
    }

    @Put
    @Mapping("/updateVisibility")
    @Operation(summary = "修改是否可见")
    @PreAuthorize("@ss.hasPermission('admin:article:updateVisibility')")
    public CommonResult<Boolean> updateVisibility(@Body @Valid ArticleUpdateVisibilityReqVO updateReqVO) {
        return CommonResult.success(articleService.updateVisibility(updateReqVO));
    }

    @Post
    @Mapping("/updateIsTop")
    @Operation(summary = "修改是否置顶")
    @PreAuthorize("@ss.hasPermission('admin:article:updateIsTop')")
    public CommonResult<Boolean> updateIsTop(@Body @Valid ArticleUpdateIsTopReqVO articleUpdateIsTopReqVO) {
        return CommonResult.success(articleService.updateIsTop(articleUpdateIsTopReqVO));
    }

    @Post
    @Mapping("/updateStatus")
    @Operation(summary = "修改状态")
    @PreAuthorize("@ss.hasPermission('admin:article:updateStatus')")
    public CommonResult<Boolean> updateStatus(@Body @Valid ArticleUpdateStatusReqVO articleUpdateStatusReqVO) {
        return CommonResult.success(articleService.updateStatus(articleUpdateStatusReqVO));
    }

    @Delete
    @Mapping("/del")
    @Operation(summary = "根据id删除文章")
    @PreAuthorize("@ss.hasPermission('admin:article:delete')")
    public CommonResult<Boolean> del(@Param(value = "id") Integer id) {
        return CommonResult.success(articleService.del(id));
    }

    @Get
    @Mapping("/get")
    @Operation(summary = "根据id获取文章")
    public CommonResult<ArticleRespVO> get(@Param(value = "id") Integer id) {
        return CommonResult.success(articleService.getArticleById(id));
    }

    @Get
    @Mapping("/getAllPage")
    @Operation(summary = "获取所有页面")
    public CommonResult<List<ArticleRespVO>> getAllPage() {
        List<Article> articleList = articleService.getAllPage();
        return CommonResult.success(ArticleConvert.INSTANCE.convertToRespList(articleList));
    }
}
