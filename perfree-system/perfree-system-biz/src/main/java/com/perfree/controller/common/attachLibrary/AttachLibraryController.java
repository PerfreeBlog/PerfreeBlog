package com.perfree.controller.common.attachLibrary;

import com.perfree.commons.common.CommonResult;
import com.perfree.commons.common.PageResult;
import com.perfree.controller.auth.attachLibrary.vo.AttachLibraryPageReqVO;
import com.perfree.controller.auth.attachLibrary.vo.AttachLibraryRespVO;
import com.perfree.service.attachLibrary.AttachLibraryService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.annotation.Resource;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import static com.perfree.commons.common.CommonResult.success;

@RestController
@Tag(name = "附件库相关接口")
@RequestMapping("api/attachLibrary")
public class AttachLibraryController {

    @Resource
    private AttachLibraryService attachLibraryService;

    @PostMapping("/page")
    @Operation(summary = "附件库分页列表")
    @PreAuthorize("@ss.hasPermission('admin:attachLibrary:query')")
    public CommonResult<PageResult<AttachLibraryRespVO>> page(@RequestBody AttachLibraryPageReqVO pageVO) {
        PageResult<AttachLibraryRespVO> attachLibraryPageResult = attachLibraryService.attachLibraryPage(pageVO);
        return success(attachLibraryPageResult);
    }

    @GetMapping("/get")
    @Operation(summary = "根据id获取附件库")
    public CommonResult<AttachLibraryRespVO> get(@RequestParam(value = "id") Integer id) {
        return success(attachLibraryService.get(id));
    }
}
