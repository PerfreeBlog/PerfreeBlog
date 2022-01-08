package com.perfree.controller.api.pub;

import com.perfree.base.BaseController;
import com.perfree.commons.ResponseBean;
import com.perfree.plugin.PluginHolder;
import com.perfree.plugin.PluginInfo;
import com.perfree.service.PluginService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.pf4j.PluginState;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
@Api(value = "插件相关",tags = "插件相关")
@RequestMapping("/api/plugin")
public class PluginController extends BaseController {
    @Autowired
    private PluginService pluginService;

    @RequestMapping("/getAllPlugin")
    @ApiOperation(value = "获取所有插件", notes = "获取所有插件")
    public ResponseBean getAllPlugin(){
        return ResponseBean.success("success", pluginService.getAll());
    }

    @RequestMapping("/getStartPlugin")
    @ApiOperation(value = "根据插件ID获取已启动的插件", notes = "根据插件ID获取已启动的插件")
    public ResponseBean getStartPlugin(@ApiParam(name="id",value="插件的id",required=true) @RequestParam("id") String id){
        PluginInfo plugin = PluginHolder.getPlugin(id);
        if (plugin.getPluginWrapper().getPluginState().equals(PluginState.STARTED)) {
            return ResponseBean.success("success", pluginService.getById(id));
        }
        return ResponseBean.error(-1,"未获取到插件", null);
    }
}
