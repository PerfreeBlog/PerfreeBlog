package com.perfree.controller.auth.journal;

import cn.dev33.satoken.annotation.SaCheckPermission;
import cn.hutool.core.collection.ListUtil;
import com.perfree.commons.common.CommonResult;
import com.perfree.commons.common.PageResult;
import com.perfree.commons.common.SortingField;
import com.perfree.commons.utils.SortingFieldUtils;
import com.perfree.controller.auth.article.vo.ArticleUpdateIsCommentReqVO;
import com.perfree.controller.auth.article.vo.ArticleUpdateIsTopReqVO;
import com.perfree.controller.auth.journal.vo.JournalAddReqVO;
import com.perfree.controller.auth.journal.vo.JournalPageReqVO;
import com.perfree.controller.auth.journal.vo.JournalRespVO;
import com.perfree.controller.auth.journal.vo.JournalUpdateReqVO;
import com.perfree.service.article.ArticleService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.annotation.Resource;
import jakarta.validation.Valid;
import org.noear.solon.annotation.*;

import static com.perfree.commons.common.CommonResult.pageSuccess;

@Controller
@Tag(name = "动态相关接口")
@Mapping("api/auth/journal")
public class JournalController {

    @Inject
    private ArticleService articleService;

    @Post
    @Mapping("/createJournal")
    @Operation(summary = "发表动态")
    @SaCheckPermission("admin:journal:create")
    public CommonResult<JournalRespVO> createJournal(@Body @Valid JournalAddReqVO journalAddReqVO) {
        return CommonResult.success(articleService.createJournal(journalAddReqVO));
    }

    @Put
    @Mapping("/updateJournal")
    @Operation(summary = "修改动态")
    @SaCheckPermission("admin:journal:update")
    public CommonResult<JournalRespVO> updateJournal(@Body @Valid JournalUpdateReqVO updateReqVO) {
        return CommonResult.success(articleService.updateJournal(updateReqVO));
    }

    @Post
    @Mapping("/updateIsComment")
    @Operation(summary = "修改是否允许评论")
    @SaCheckPermission("admin:journal:updateIsComment")
    public CommonResult<Boolean> updateIsComment(@Body @Valid ArticleUpdateIsCommentReqVO articleUpdateIsCommentReqVO) {
        return CommonResult.success(articleService.updateIsComment(articleUpdateIsCommentReqVO));
    }

    @Post
    @Mapping("/updateIsTop")
    @Operation(summary = "修改是否置顶")
    @SaCheckPermission("admin:journal:updateIsTop")
    public CommonResult<Boolean> updateIsTop(@Body @Valid ArticleUpdateIsTopReqVO articleUpdateIsTopReqVO) {
        return CommonResult.success(articleService.updateIsTop(articleUpdateIsTopReqVO));
    }

    @Post
    @Mapping("/page")
    @Operation(summary = "动态分页列表")
    public CommonResult<PageResult<JournalRespVO>> page(@Body JournalPageReqVO pageVO) {
        SortingFieldUtils.handleCustomSortingField(pageVO, ListUtil.of(
                new SortingField("isTop", SortingField.ORDER_DESC),
                new SortingField("createTime", SortingField.ORDER_DESC)
        ));
        return pageSuccess(articleService.journalPage(pageVO));
    }

    @Get
    @Mapping("/get")
    @Operation(summary = "根据id获取动态")
    public CommonResult<JournalRespVO> get(@Param(value = "id") Integer id) {
        return CommonResult.success(articleService.getJournalById(id));
    }

    @Delete
    @Mapping("/del")
    @Operation(summary = "根据id删除动态")
    @SaCheckPermission("admin:journal:delete")
    public CommonResult<Boolean> del(@Param(value = "id") Integer id) {
        return CommonResult.success(articleService.del(id));
    }

}
