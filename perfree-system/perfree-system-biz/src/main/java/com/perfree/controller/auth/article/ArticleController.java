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
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.perfree.commons.common.CommonResult.success;

@RestController
@Tag(name = "文章相关接口")
@RequestMapping("api/auth/article")
public class ArticleController {

    private final static Logger LOGGER = LoggerFactory.getLogger(ArticleController.class);

    @Resource
    private ArticleService articleService;

    @PostMapping("/page")
    @Operation(summary = "文章分页列表")
    public CommonResult<PageResult<ArticleRespVO>> page(@RequestBody ArticlePageReqVO pageVO) {
        return success(articleService.articlePage(pageVO));
    }


    @PostMapping("/createArticle")
    @Operation(summary = "发表文章")
    @PreAuthorize("@ss.hasPermission('admin:article:create')")
    public CommonResult<ArticleRespVO> createArticle(@RequestBody @Valid ArticleAddReqVO articleAddReqVO) {
        Article article = articleService.createArticle(articleAddReqVO);
        return CommonResult.success(ArticleConvert.INSTANCE.convertRespVO(article));
    }

    @PutMapping("/updateArticle")
    @Operation(summary = "修改文章")
    @PreAuthorize("@ss.hasPermission('admin:article:update')")
    public CommonResult<ArticleRespVO> updateArticle(@RequestBody @Valid ArticleUpdateReqVO articleUpdateReqVO) {
        Article article = articleService.updateArticle(articleUpdateReqVO);
        return CommonResult.success(ArticleConvert.INSTANCE.convertRespVO(article));
    }


    @PostMapping("/updateIsComment")
    @Operation(summary = "修改是否允许评论")
    @PreAuthorize("@ss.hasPermission('admin:article:updateIsComment')")
    public CommonResult<Boolean> updateIsComment(@RequestBody @Valid ArticleUpdateIsCommentReqVO articleUpdateIsCommentReqVO) {
        return CommonResult.success(articleService.updateIsComment(articleUpdateIsCommentReqVO));
    }

    @PutMapping("/updateVisibility")
    @Operation(summary = "修改是否可见")
    @PreAuthorize("@ss.hasPermission('admin:article:updateVisibility')")
    public CommonResult<Boolean> updateVisibility(@RequestBody @Valid ArticleUpdateVisibilityReqVO updateReqVO) {
        return CommonResult.success(articleService.updateVisibility(updateReqVO));
    }

    @PostMapping("/updateIsTop")
    @Operation(summary = "修改是否置顶")
    @PreAuthorize("@ss.hasPermission('admin:article:updateIsTop')")
    public CommonResult<Boolean> updateIsTop(@RequestBody @Valid ArticleUpdateIsTopReqVO articleUpdateIsTopReqVO) {
        return CommonResult.success(articleService.updateIsTop(articleUpdateIsTopReqVO));
    }

    @PostMapping("/updateStatus")
    @Operation(summary = "修改状态")
    @PreAuthorize("@ss.hasPermission('admin:article:updateStatus')")
    public CommonResult<Boolean> updateStatus(@RequestBody @Valid ArticleUpdateStatusReqVO articleUpdateStatusReqVO) {
        return CommonResult.success(articleService.updateStatus(articleUpdateStatusReqVO));
    }

    @DeleteMapping("/del")
    @Operation(summary = "根据id删除文章")
    @PreAuthorize("@ss.hasPermission('admin:article:delete')")
    public CommonResult<Boolean> del(@RequestParam(value = "id") Integer id) {
        return CommonResult.success(articleService.del(id));
    }

    @GetMapping("/get")
    @Operation(summary = "根据id获取文章")
    public CommonResult<ArticleRespVO> get(@RequestParam(value = "id") Integer id) {
        return CommonResult.success(articleService.getArticleById(id));
    }

    @GetMapping("/getAllPage")
    @Operation(summary = "获取所有页面")
    public CommonResult<List<ArticleRespVO>> getAllPage() {
        List<Article> articleList = articleService.getAllPage();
        return CommonResult.success(ArticleConvert.INSTANCE.convertToRespList(articleList));
    }
}
