package com.perfree.controller.auth.page;


import cn.dev33.satoken.annotation.SaCheckPermission;
import com.perfree.commons.common.CommonResult;
import com.perfree.controller.auth.article.vo.*;
import com.perfree.convert.article.ArticleConvert;
import com.perfree.model.Article;
import com.perfree.service.article.ArticleService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.noear.solon.annotation.*;
import org.noear.solon.annotation.Mapping;

@Controller
@Tag(name = "页面相关接口")
@Mapping("api/auth/page")
public class PageController {
    @Inject
    private ArticleService articleService;

    @Post
    @Mapping("/createArticle")
    @Operation(summary = "发表页面")
    @SaCheckPermission("admin:page:create")
    public CommonResult<ArticleRespVO> createArticle(@Body @Valid ArticleAddReqVO articleAddReqVO) {
        Article article = articleService.createArticle(articleAddReqVO);
        return CommonResult.success(ArticleConvert.INSTANCE.convertRespVO(article));
    }

    @Put
    @Mapping("/updateArticle")
    @Operation(summary = "修改页面")
    @SaCheckPermission("admin:page:update")
    public CommonResult<ArticleRespVO> updateArticle(@Body @Valid ArticleUpdateReqVO articleUpdateReqVO) {
        Article article = articleService.updateArticle(articleUpdateReqVO);
        return CommonResult.success(ArticleConvert.INSTANCE.convertRespVO(article));
    }


    @Post
    @Mapping("/updateIsComment")
    @Operation(summary = "修改是否允许评论")
    @SaCheckPermission("admin:page:updateIsComment")
    public CommonResult<Boolean> updateIsComment(@Body @Valid ArticleUpdateIsCommentReqVO articleUpdateIsCommentReqVO) {
        return CommonResult.success(articleService.updateIsComment(articleUpdateIsCommentReqVO));
    }

    @Post
    @Mapping("/updateIsTop")
    @Operation(summary = "修改是否置顶")
    @SaCheckPermission("admin:page:updateIsTop")
    public CommonResult<Boolean> updateIsTop(@Body @Valid ArticleUpdateIsTopReqVO articleUpdateIsTopReqVO) {
        return CommonResult.success(articleService.updateIsTop(articleUpdateIsTopReqVO));
    }

    @Post
    @Mapping("/updateStatus")
    @Operation(summary = "修改状态")
    @SaCheckPermission("admin:page:updateStatus")
    public CommonResult<Boolean> updateStatus(@Body @Valid ArticleUpdateStatusReqVO articleUpdateStatusReqVO) {
        return CommonResult.success(articleService.updateStatus(articleUpdateStatusReqVO));
    }

    @Delete
    @Mapping("/del")
    @Operation(summary = "根据id删除页面")
    @SaCheckPermission("admin:page:delete")
    public CommonResult<Boolean> del(@Param(value = "id") Integer id) {
        return CommonResult.success(articleService.del(id));
    }


}
