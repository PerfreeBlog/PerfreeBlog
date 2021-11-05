package com.exam;

import com.gitee.starblues.annotation.ConfigDefinition;
import com.gitee.starblues.realize.BasePlugin;
import org.pf4j.PluginWrapper;

/**
 * 插件主类
 */
@ConfigDefinition(fileName = "application.yml", devSuffix = "-dev", prodSuffix = "-prod")
public class DefinePlugin extends BasePlugin {
    public DefinePlugin(PluginWrapper wrapper) {
        super(wrapper);
    }
}