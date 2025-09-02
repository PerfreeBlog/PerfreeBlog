package com.perfree.controller.auth.attachLibrary;


import cn.dev33.satoken.annotation.SaCheckPermission;
import cn.hutool.core.collection.ListUtil;
import com.perfree.base.BaseController;
import com.perfree.commons.common.CommonResult;
import com.perfree.commons.common.PageResult;
import com.perfree.commons.common.SortingField;
import com.perfree.commons.utils.SortingFieldUtils;
import com.perfree.controller.auth.attachLibrary.vo.*;
import com.perfree.convert.attachLibrary.AttachLibraryConvert;
import com.perfree.model.AttachLibrary;
import com.perfree.service.attachLibrary.AttachLibraryService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.annotation.Resource;
import jakarta.validation.Valid;
import org.noear.solon.annotation.*;
import jakarta.servlet.http.HttpServletResponse;
import com.perfree.commons.excel.ExcelUtils;

import java.util.ArrayList;
import java.util.List;

import static com.perfree.commons.common.CommonResult.pageSuccess;
import static com.perfree.commons.common.CommonResult.success;

/**
* @description 附件库 controller
* @author Perfree
**/
@Controller
@Tag(name = "附件库相关接口")
@Mapping("api/auth/attachLibrary")
public class AttachLibraryController extends BaseController {

    @Inject
    private AttachLibraryService attachLibraryService;

    @Post
    @Mapping("/page")
    @Operation(summary = "附件库分页列表")
    public CommonResult<PageResult<AttachLibraryRespVO>> page(@Body AttachLibraryPageReqVO pageVO) {
        SortingFieldUtils.handleCustomSortingField(pageVO, ListUtil.of(
                new SortingField("createTime", SortingField.ORDER_DESC)
        ));
        startPage(pageVO);
        List<AttachLibraryRespVO> attachLibraryPageResult = attachLibraryService.attachLibraryPage(pageVO);
        return pageSuccess(attachLibraryPageResult);
    }

    @Post
    @Mapping("/add")
    @Operation(summary = "添加附件库")
    @SaCheckPermission("admin:attachLibrary:create")
    public CommonResult<AttachLibraryRespVO> add(@Body @Valid AttachLibraryAddReqVO attachLibraryAddReqVO) {
        return success(AttachLibraryConvert.INSTANCE.convertRespVO(attachLibraryService.add(attachLibraryAddReqVO)));
    }

    @Post
    @Mapping("/update")
    @Operation(summary = "更新附件库")
    @SaCheckPermission("admin:attachLibrary:update")
    public CommonResult<AttachLibraryRespVO> update(@Body @Valid AttachLibraryUpdateReqVO attachLibraryUpdateReqVO) {
        return success(AttachLibraryConvert.INSTANCE.convertRespVO(attachLibraryService.update(attachLibraryUpdateReqVO)));
    }

    @Get
    @Mapping("/get")
    @Operation(summary = "根据id获取附件库")
    public CommonResult<AttachLibraryRespVO> get(@Param(value = "id") Integer id) {
        return success(attachLibraryService.get(id));
    }

    @Delete
    @Mapping("/del")
    @Operation(summary = "根据id删除附件库")
    @SaCheckPermission("admin:attachLibrary:delete")
    public CommonResult<Boolean> del(@Param(value = "id") Integer id) {
        return success(attachLibraryService.del(id));
    }

    @Get
    @Mapping("/listAll")
    @Operation(summary = "获取所有附件库")
    public CommonResult<List<AttachLibraryRespVO>> listAll() {
        return success(AttachLibraryConvert.INSTANCE.convertListRespVO(attachLibraryService.listAll()));
    }

    @Post
    @Mapping("/export")
    @Operation(summary = "导出附件库")
    @SaCheckPermission("admin:attachLibrary:export")
    public void export(@Body AttachLibraryExportReqVO exportReqVO, HttpServletResponse response) {
        List<AttachLibrary> attachLibraryList = attachLibraryService.queryExportData(exportReqVO);
        ExcelUtils.renderExcel(response, AttachLibraryConvert.INSTANCE.convertToExcelVOList(attachLibraryList), AttachLibraryExcelVO.class, "附件库数据","附件库数据.xlsx");
    }
}