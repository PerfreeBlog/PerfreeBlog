package com.perfree.controller.common.attachLibrary;

import com.perfree.commons.common.CommonResult;
import com.perfree.commons.common.PageResult;
import com.perfree.controller.auth.attachLibrary.vo.AttachLibraryPageReqVO;
import com.perfree.controller.auth.attachLibrary.vo.AttachLibraryRespVO;
import com.perfree.service.attachLibrary.AttachLibraryService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.annotation.Resource;
import org.noear.solon.annotation.*;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import static com.perfree.commons.common.CommonResult.success;

@Controller
@Tag(name = "附件库相关接口")
@Mapping("api/attachLibrary")
public class AttachLibraryController {

    @Inject
    private AttachLibraryService attachLibraryService;

    @Post
    @Mapping("/page")
    @Operation(summary = "附件库分页列表")
    @PreAuthorize("@ss.hasPermission('admin:attachLibrary:query')")
    public CommonResult<PageResult<AttachLibraryRespVO>> page(@Body AttachLibraryPageReqVO pageVO) {
        PageResult<AttachLibraryRespVO> attachLibraryPageResult = attachLibraryService.attachLibraryPage(pageVO);
        return success(attachLibraryPageResult);
    }

    @Get
    @Mapping("/get")
    @Operation(summary = "根据id获取附件库")
    public CommonResult<AttachLibraryRespVO> get(@Param(value = "id") Integer id) {
        return success(attachLibraryService.get(id));
    }
}
