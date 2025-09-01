package com.perfree.controller.auth.attach;


import com.perfree.commons.common.CommonResult;
import com.perfree.commons.common.PageResult;
import com.perfree.controller.auth.attach.vo.*;
import com.perfree.convert.attach.AttachConvert;
import com.perfree.demoModel.DemoMode;
import com.perfree.model.Attach;
import com.perfree.service.attach.AttachService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.annotation.Resource;
import jakarta.validation.Valid;
import org.noear.solon.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

import static com.perfree.commons.common.CommonResult.success;

/**
 * @description 附件管理
 * @author Perfree
 * @version 1.0.0
 * @create 2023/1/15 10:16
 **/
@Controller
@Tag(name = "附件相关接口")
@Mapping("api/auth/attach")
public class AttachController {

    private final static Logger LOGGER = LoggerFactory.getLogger(AttachController.class);
    @Inject
    private AttachService attachService;

    @Post
    @Mapping("/upload")
    @Operation(summary = "附件上传")
    @DemoMode
    @PreAuthorize("@ss.hasPermission('admin:attach:upload')")
    public CommonResult<AttachRespVO> upload(AttachUploadVO attachUploadVO) {
        Attach attach = attachService.create(attachUploadVO);
        return success(AttachConvert.INSTANCE.convertRespVO(attach));
    }

    @Post
    @Mapping("/page")
    @Operation(summary = "附件分页列表")
    @PreAuthorize("@ss.hasPermission('admin:attach:query')")
    public CommonResult<PageResult<AttachRespVO>> page(@Body AttachPageReqVO pageVO) {
        PageResult<Attach> rolePageResult = attachService.attachPage(pageVO);
        return success(AttachConvert.INSTANCE.convertPageResultVO(rolePageResult));
    }

    @Get
    @Mapping("/get")
    @Operation(summary = "获取附件")
    public CommonResult<AttachRespVO> get(@Param(value = "id") Integer id) {
        Attach byId = attachService.getById(id);
        return success(AttachConvert.INSTANCE.convertRespVO(byId));
    }

    @Put
    @Mapping("/update")
    @Operation(summary = "修改附件")
    @DemoMode
    @PreAuthorize("@ss.hasPermission('admin:attach:update')")
    public CommonResult<Boolean> update(@Body AttachUpdateVO attachUpdateVO) {
        return success(attachService.updateAttach(attachUpdateVO));
    }

    @Delete
    @Mapping("/del")
    @Operation(summary = "删除附件")
    @DemoMode
    @PreAuthorize("@ss.hasPermission('admin:attach:delete')")
    public CommonResult<Boolean> del(@Param(value = "id") Integer id) {
        return success(attachService.del(id));
    }

    @Get
    @Mapping("/getAllAttachGroup")
    @Operation(summary = "获取所有附件分组")
    public CommonResult<List<AttachGroupRespVO>> getAllAttachGroup() {
        return success(attachService.getAllAttachGroup());
    }

    @Post
    @Mapping("/uploadAttachByUrl")
    @Operation(summary = "通过url下载并上传附件")
    @DemoMode
    public CommonResult<AttachByUrlRespVO> uploadAttachByUrl(@Valid @Body AttachUploadByUrlVO attachUploadByUrlVO) {
        Attach attach = attachService.uploadAttachByUrl(attachUploadByUrlVO.getUrl());
        AttachByUrlRespVO attachByUrlRespVO = AttachConvert.INSTANCE.convertByUrlRespVO(attach);
        attachByUrlRespVO.setOriginalURL(attachUploadByUrlVO.getUrl());
        return success(attachByUrlRespVO);
    }
}
