package com.perfree.controller.auth.plugins;

import cn.dev33.satoken.annotation.SaCheckPermission;
import com.perfree.base.BaseController;
import com.perfree.commons.common.CommonResult;
import com.perfree.commons.common.PageResult;
import com.perfree.controller.auth.plugins.vo.InstallPluginReqVO;
import com.perfree.controller.auth.plugins.vo.PluginsPageReqVO;
import com.perfree.controller.auth.plugins.vo.PluginsRespVO;
import com.perfree.convert.plugins.PluginsConvert;
import com.perfree.demoModel.DemoMode;
import com.perfree.model.Plugins;
import com.perfree.plugin.commons.PluginSetting;
import com.perfree.service.plugins.PluginsService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.annotation.Resource;
import org.noear.solon.annotation.*;

import java.util.List;

import static com.perfree.commons.common.CommonResult.pageSuccess;
import static com.perfree.commons.common.CommonResult.success;

@Controller
@Tag(name = "插件相关接口")
@Mapping("api/auth/plugins")
public class PluginsController extends BaseController {

    @Inject
    private PluginsService pluginsService;

    @Post
    @Mapping("/page")
    @Operation(summary = "插件分页列表")
    @SaCheckPermission("admin:plugin:query")
    public CommonResult<PageResult<PluginsRespVO>> page(@Body PluginsPageReqVO pageVO) {
        startPage(pageVO);
        List<Plugins> pluginsList = pluginsService.pluginsPage(pageVO);
        return pageSuccess(PluginsConvert.INSTANCE.convertListVO(pluginsList));
    }


    @Post
    @Mapping("/installPlugin")
    @Operation(summary = "插件安装")
    @DemoMode
    @SaCheckPermission("admin:plugin:install")
    public CommonResult<Boolean> installPlugin(InstallPluginReqVO installPluginReqVO) {
        return success( pluginsService.installPlugin(installPluginReqVO.getFile()));
    }

    @Post
    @Mapping("/disablePlugin")
    @Operation(summary = "插件禁用")
    @DemoMode
    @SaCheckPermission("admin:plugin:disable")
    public CommonResult<Boolean> disablePlugin(@Param(value = "pluginId") String pluginId) {
        return success( pluginsService.disablePlugin(pluginId));
    }

    @Post
    @Mapping("/enablePlugin")
    @Operation(summary = "插件启用")
    @DemoMode
    @SaCheckPermission("admin:plugin:enable")
    public CommonResult<Boolean> enablePlugin(@Param(value = "pluginId") String pluginId) {
        return success( pluginsService.enablePlugin(pluginId));
    }

    @Post
    @Mapping("/uninstallPlugin")
    @Operation(summary = "卸载插件")
    @DemoMode
    @SaCheckPermission("admin:plugin:uninstall")
    public CommonResult<Boolean> uninstallPlugin(@Param(value = "pluginId") String pluginId) {
        return success( pluginsService.unInstallPlugin(pluginId));
    }

    @Get
    @Mapping("/getPluginSetting")
    @Operation(summary = "获取插件设置项")
    public CommonResult<PluginSetting> getPluginSetting(@Param(value = "pluginId") String pluginId) {
        return success( pluginsService.getPluginSetting(pluginId));
    }

}
