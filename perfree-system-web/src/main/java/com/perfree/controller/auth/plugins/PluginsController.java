package com.perfree.controller.auth.plugins;

import com.perfree.commons.common.CommonResult;
import com.perfree.commons.common.PageResult;
import com.perfree.controller.auth.plugins.vo.InstallPluginReqVO;
import com.perfree.controller.auth.plugins.vo.PluginsRespVO;
import com.perfree.convert.plugins.PluginsConvert;
import com.perfree.model.Plugins;
import com.perfree.service.plugins.PluginsService;
import com.perfree.controller.auth.plugins.vo.PluginsPageReqVO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import static com.perfree.commons.common.CommonResult.success;

@RestController
@Tag(name = "插件相关接口")
@RequestMapping("api/auth/plugins")
public class PluginsController {

    @Resource
    private PluginsService pluginsService;

    @PostMapping("/page")
    @Operation(summary = "插件分页列表")
    public CommonResult<PageResult<PluginsRespVO>> page(@RequestBody PluginsPageReqVO pageVO) {
        PageResult<Plugins> pluginsPageResult = pluginsService.pluginsPage(pageVO);
        return success(PluginsConvert.INSTANCE.convertPageResultVO(pluginsPageResult));
    }


    @PostMapping("/installPlugin")
    @Operation(summary = "插件安装")
    public CommonResult<Boolean> installPlugin(InstallPluginReqVO installPluginReqVO) {
        return success( pluginsService.installPlugin(installPluginReqVO.getFile()));
    }

    @PostMapping("/disablePlugin")
    @Operation(summary = "插件禁用")
    public CommonResult<Boolean> disablePlugin(@RequestParam(value = "id") Integer id) {
        return success( pluginsService.disablePlugin(id));
    }

    @PostMapping("/enablePlugin")
    @Operation(summary = "插件启用")
    public CommonResult<Boolean> enablePlugin(@RequestParam(value = "id") Integer id) {
        return success( pluginsService.enablePlugin(id));
    }
}
