package com.perfree.controller.auth.attachConfig;


import cn.dev33.satoken.annotation.SaCheckPermission;
import com.perfree.base.BaseController;
import com.perfree.commons.common.CommonResult;
import com.perfree.commons.common.PageResult;
import com.perfree.controller.auth.attachConfig.vo.*;
import com.perfree.convert.attachConfig.AttachConfigConvert;
import com.perfree.demoModel.DemoMode;
import com.perfree.model.AttachConfig;
import com.perfree.service.attachConfig.AttachConfigService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.noear.solon.annotation.*;

import java.util.List;

import static com.perfree.commons.common.CommonResult.pageSuccess;

@Controller
@Tag(name = "附件服务器配置相关接口")
@Mapping("api/auth/attachConfig")
public class AttachConfigController extends BaseController {

    @Inject
    private AttachConfigService attachConfigService;

    @Get
    @Mapping("/getAll")
    @Operation(summary = "获取所有配置")
    public CommonResult<List<AttachConfigRespVO>> getAll() {
        List<AttachConfig> attachConfigList = attachConfigService.getAll();
        return CommonResult.success(AttachConfigConvert.INSTANCE.convertRespListVO(attachConfigList));
    }

    @Post
    @Mapping("/page")
    @Operation(summary = "配置分页列表")
    @SaCheckPermission("admin:attachConfig:query")
    public CommonResult<PageResult<AttachConfigRespVO>> page(@Body AttachConfigPageReqVO pageVO) {
        startPage(pageVO);
        List<AttachConfig> attachPage = attachConfigService.attachConfigPage(pageVO);
        return pageSuccess(AttachConfigConvert.INSTANCE.convertRespListVO(attachPage));
    }

    @Post
    @Mapping("/add")
    @Operation(summary = "新增配置")
    @DemoMode
    @SaCheckPermission("admin:attachConfig:create")
    public CommonResult<AttachConfigRespVO> add(@Body @Valid AttachConfigCreateVO attachConfigCreateVO) {
        AttachConfig attachConfig = attachConfigService.add(attachConfigCreateVO);
        return CommonResult.success(AttachConfigConvert.INSTANCE.convertRespVO(attachConfig));
    }


    @Put
    @Mapping("/update")
    @Operation(summary = "修改配置")
    @DemoMode
    @SaCheckPermission("admin:attachConfig:update")
    public CommonResult<Boolean> update(@Body @Valid AttachConfigUpdateVO attachConfigUpdateVO) {
        return CommonResult.success(attachConfigService.updateAttachConfig(attachConfigUpdateVO));
    }

    @Put
    @Mapping("/updateMaster")
    @Operation(summary = "修改默认配置")
    @DemoMode
    @SaCheckPermission("admin:attachConfig:master")
    public CommonResult<Boolean> updateMaster(@Body @Valid AttachConfigUpdateMasterVO attachConfigUpdateMasterVO) {
        return CommonResult.success(attachConfigService.updateMaster(attachConfigUpdateMasterVO));
    }


    @Get
    @Mapping("/get")
    @Operation(summary = "根据id获取配置")
    public CommonResult<AttachConfigRespVO> get(@Param(value = "id") Integer id) {
        AttachConfig attachConfig = attachConfigService.getById(id);
        return CommonResult.success(AttachConfigConvert.INSTANCE.convertRespVO(attachConfig));
    }

    @Delete
    @Mapping("/del")
    @Operation(summary = "根据id删除配置")
    @DemoMode
    @SaCheckPermission("admin:attachConfig:delete")
    public CommonResult<Boolean> del(@Param(value = "id") Integer id) {
        return CommonResult.success(attachConfigService.del(id));
    }
}
