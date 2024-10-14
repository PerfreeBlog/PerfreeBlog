package com.perfree.controller.auth.page;


import com.perfree.commons.common.CommonResult;
import com.perfree.controller.auth.article.vo.*;
import com.perfree.convert.article.ArticleConvert;
import com.perfree.model.Article;
import com.perfree.service.article.ArticleService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.annotation.Resource;
import jakarta.validation.Valid;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@Tag(name = "页面相关接口")
@RequestMapping("api/auth/page")
public class PageController {
    @Resource
    private ArticleService articleService;

    @PostMapping("/createArticle")
    @Operation(summary = "发表页面")
    @PreAuthorize("@ss.hasPermission('admin:page:create')")
    public CommonResult<ArticleRespVO> createArticle(@RequestBody @Valid ArticleAddReqVO articleAddReqVO) {
        Article article = articleService.createArticle(articleAddReqVO);
        return CommonResult.success(ArticleConvert.INSTANCE.convertRespVO(article));
    }

    @PutMapping("/updateArticle")
    @Operation(summary = "修改页面")
    @PreAuthorize("@ss.hasPermission('admin:page:update')")
    public CommonResult<ArticleRespVO> updateArticle(@RequestBody @Valid ArticleUpdateReqVO articleUpdateReqVO) {
        Article article = articleService.updateArticle(articleUpdateReqVO);
        return CommonResult.success(ArticleConvert.INSTANCE.convertRespVO(article));
    }


    @PostMapping("/updateIsComment")
    @Operation(summary = "修改是否允许评论")
    @PreAuthorize("@ss.hasPermission('admin:page:updateIsComment')")
    public CommonResult<Boolean> updateIsComment(@RequestBody @Valid ArticleUpdateIsCommentReqVO articleUpdateIsCommentReqVO) {
        return CommonResult.success(articleService.updateIsComment(articleUpdateIsCommentReqVO));
    }

    @PostMapping("/updateIsTop")
    @Operation(summary = "修改是否置顶")
    @PreAuthorize("@ss.hasPermission('admin:page:updateIsTop')")
    public CommonResult<Boolean> updateIsTop(@RequestBody @Valid ArticleUpdateIsTopReqVO articleUpdateIsTopReqVO) {
        return CommonResult.success(articleService.updateIsTop(articleUpdateIsTopReqVO));
    }

    @PostMapping("/updateStatus")
    @Operation(summary = "修改状态")
    @PreAuthorize("@ss.hasPermission('admin:page:updateStatus')")
    public CommonResult<Boolean> updateStatus(@RequestBody @Valid ArticleUpdateStatusReqVO articleUpdateStatusReqVO) {
        return CommonResult.success(articleService.updateStatus(articleUpdateStatusReqVO));
    }

    @DeleteMapping("/del")
    @Operation(summary = "根据id删除页面")
    @PreAuthorize("@ss.hasPermission('admin:page:delete')")
    public CommonResult<Boolean> del(@RequestParam(value = "id") Integer id) {
        return CommonResult.success(articleService.del(id));
    }


}
