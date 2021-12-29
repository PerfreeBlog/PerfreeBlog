package com.access;

import com.perfree.commons.Constants;
import com.perfree.permission.AdminGroup;
import com.perfree.permission.AdminGroups;
import com.perfree.plugin.BasePlugin;
import org.pf4j.PluginWrapper;

/**
 * 插件主类
 */
@AdminGroups(groups = {
        @AdminGroup(name = "插件管理", groupId = Constants.ADMIN_MENU_GROUP_PLUGIN)
})
public class PluginMain extends BasePlugin {
    public PluginMain(PluginWrapper wrapper) {
        super(wrapper);
    }
}