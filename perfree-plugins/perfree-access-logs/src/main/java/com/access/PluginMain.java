package com.access;

import com.perfree.permission.AdminGroup;
import com.perfree.permission.AdminGroups;
import com.perfree.plugin.BasePlugin;
import org.pf4j.PluginWrapper;

/**
 * 插件主类
 */
@AdminGroups(groups = {
        @AdminGroup(name = "123", groupId = "测试1"),
        @AdminGroup(name = "456", groupId = "测试2")
})
public class PluginMain extends BasePlugin {
    public PluginMain(PluginWrapper wrapper) {
        super(wrapper);
    }
}