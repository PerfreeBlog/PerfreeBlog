package com.perfree.controller.auth.attachLibrary;


import com.perfree.commons.common.CommonResult;
import com.perfree.commons.common.PageResult;
import com.perfree.controller.auth.attachLibrary.vo.*;
import com.perfree.convert.attachLibrary.AttachLibraryConvert;
import com.perfree.model.AttachLibrary;
import com.perfree.service.attachLibrary.AttachLibraryService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.annotation.Resource;
import jakarta.validation.Valid;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import jakarta.servlet.http.HttpServletResponse;
import com.perfree.commons.excel.ExcelUtils;

import java.util.ArrayList;
import java.util.List;

import static com.perfree.commons.common.CommonResult.success;

/**
* @description 附件库 controller
* @author Perfree
**/
@RestController
@Tag(name = "附件库相关接口")
@RequestMapping("api/auth/attachLibrary")
public class AttachLibraryController {

    @Resource
    private AttachLibraryService attachLibraryService;

    @PostMapping("/page")
    @Operation(summary = "附件库分页列表")
    public CommonResult<PageResult<AttachLibraryRespVO>> page(@RequestBody AttachLibraryPageReqVO pageVO) {
        PageResult<AttachLibraryRespVO> attachLibraryPageResult = attachLibraryService.attachLibraryPage(pageVO);
        return success(attachLibraryPageResult);
    }

    @PostMapping("/add")
    @Operation(summary = "添加附件库")
    @PreAuthorize("@ss.hasPermission('admin:attachLibrary:create')")
    public CommonResult<AttachLibraryRespVO> add(@RequestBody @Valid AttachLibraryAddReqVO attachLibraryAddReqVO) {
        return success(AttachLibraryConvert.INSTANCE.convertRespVO(attachLibraryService.add(attachLibraryAddReqVO)));
    }

    @PostMapping("/update")
    @Operation(summary = "更新附件库")
    @PreAuthorize("@ss.hasPermission('admin:attachLibrary:update')")
    public CommonResult<AttachLibraryRespVO> update(@RequestBody @Valid AttachLibraryUpdateReqVO attachLibraryUpdateReqVO) {
        return success(AttachLibraryConvert.INSTANCE.convertRespVO(attachLibraryService.update(attachLibraryUpdateReqVO)));
    }

    @GetMapping("/get")
    @Operation(summary = "根据id获取附件库")
    public CommonResult<AttachLibraryRespVO> get(@RequestParam(value = "id") Integer id) {
        return success(attachLibraryService.get(id));
    }

    @DeleteMapping("/del")
    @Operation(summary = "根据id删除附件库")
    @PreAuthorize("@ss.hasPermission('admin:attachLibrary:delete')")
    public CommonResult<Boolean> del(@RequestParam(value = "id") Integer id) {
        return success(attachLibraryService.del(id));
    }

    @GetMapping("/listAll")
    @Operation(summary = "获取所有附件库")
    public CommonResult<List<AttachLibraryRespVO>> listAll() {
        return success(AttachLibraryConvert.INSTANCE.convertListRespVO(attachLibraryService.listAll()));
    }

    @PostMapping("/export")
    @Operation(summary = "导出附件库")
    @PreAuthorize("@ss.hasPermission('admin:attachLibrary:export')")
    public void export(@RequestBody AttachLibraryExportReqVO exportReqVO, HttpServletResponse response) {
        List<AttachLibrary> attachLibraryList = attachLibraryService.queryExportData(exportReqVO);
        ExcelUtils.renderExcel(response, AttachLibraryConvert.INSTANCE.convertToExcelVOList(attachLibraryList), AttachLibraryExcelVO.class, "附件库数据","附件库数据.xlsx");
    }
}