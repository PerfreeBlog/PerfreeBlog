package com.perfree.controller.common.journal;

import cn.hutool.core.collection.ListUtil;
import com.perfree.base.BaseController;
import com.perfree.commons.common.CommonResult;
import com.perfree.commons.common.PageResult;
import com.perfree.commons.common.SortingField;
import com.perfree.commons.utils.SortingFieldUtils;
import com.perfree.controller.auth.journal.vo.JournalPageReqVO;
import com.perfree.controller.auth.journal.vo.JournalRespVO;
import com.perfree.service.article.ArticleService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.annotation.Resource;
import org.noear.solon.annotation.*;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import static com.perfree.commons.common.CommonResult.pageSuccess;
import static com.perfree.commons.common.CommonResult.success;

@Controller
@Tag(name = "动态相关接口")
@Mapping("api/journal")
public class JournalController extends BaseController {

    @Inject
    private ArticleService articleService;

    @Post
    @Mapping("/page")
    @Operation(summary = "动态分页列表")
    public CommonResult<PageResult<JournalRespVO>> page(@Body JournalPageReqVO pageVO) {
        SortingFieldUtils.handleCustomSortingField(pageVO, ListUtil.of(
                new SortingField("isTop", SortingField.ORDER_DESC),
                new SortingField("createTime", SortingField.ORDER_DESC)
        ));
        startPage(pageVO);
        return pageSuccess(articleService.journalPage(pageVO));
    }

    @Get
    @Mapping("/get")
    @Operation(summary = "根据id获取动态")
    public CommonResult<JournalRespVO> get(@Param(value = "id") Integer id) {
        return CommonResult.success(articleService.getJournalById(id));
    }

}
