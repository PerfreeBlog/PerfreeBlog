package com.perfree.controller.common.attachLibraryItems;

import cn.hutool.core.collection.ListUtil;
import com.perfree.base.BaseController;
import com.perfree.commons.common.CommonResult;
import com.perfree.commons.common.PageResult;
import com.perfree.commons.common.SortingField;
import com.perfree.commons.utils.SortingFieldUtils;
import com.perfree.controller.auth.attachLibraryItems.vo.AttachLibraryItemsPageReqVO;
import com.perfree.controller.auth.attachLibraryItems.vo.AttachLibraryItemsRespVO;
import com.perfree.service.attachLibraryItems.AttachLibraryItemsService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.annotation.Resource;
import org.noear.solon.annotation.*;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

import static com.perfree.commons.common.CommonResult.pageSuccess;
import static com.perfree.commons.common.CommonResult.success;

@Controller
@Tag(name = "附件库数据相关接口")
@Mapping("api/attachLibraryItems")
public class AttachLibraryItemsController extends BaseController {

    @Inject
    private AttachLibraryItemsService attachLibraryItemsService;

    @Post
    @Mapping("/page")
    @Operation(summary = "附件库数据分页列表")
    @PreAuthorize("@ss.hasPermission('admin:attachLibraryItems:query')")
    public CommonResult<PageResult<AttachLibraryItemsRespVO>> page(@Body AttachLibraryItemsPageReqVO pageVO) {
        SortingFieldUtils.handleCustomSortingField(pageVO, ListUtil.of(
                new SortingField("createTime", SortingField.ORDER_DESC)
        ));
        startPage(pageVO);
        List<AttachLibraryItemsRespVO> attachLibraryItemsPageResult = attachLibraryItemsService.attachLibraryItemsPage(pageVO);
        return pageSuccess(attachLibraryItemsPageResult);
    }

    @Get
    @Mapping("/get")
    @Operation(summary = "根据id获取附件库数据")
    public CommonResult<AttachLibraryItemsRespVO> get(@Param(value = "id") Integer id) {
        return success(attachLibraryItemsService.get(id));
    }

}
