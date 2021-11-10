package com.access;

import com.perfree.permission.AdminGroup;
import com.perfree.permission.AdminGroups;
import com.perfree.plugin.BasePlugin;
import org.pf4j.PluginWrapper;

/**
 * 插件主类
 */
@AdminGroups(groups = {
        @AdminGroup(name = "访问统计", groupId = "plugin-access", icon = "fa-line-chart", url = "/plugin/access")
})
public class PluginMain extends BasePlugin {
    public PluginMain(PluginWrapper wrapper) {
        super(wrapper);
    }
}