package com.perfree;

import com.gitee.starblues.annotation.ConfigDefinition;
import com.gitee.starblues.realize.BasePlugin;
import org.pf4j.PluginWrapper;

/**
 * 插件主类
 */
@ConfigDefinition(fileName = "application.yml", devSuffix = "-dev", prodSuffix = "-prod")
public class PluginMain extends BasePlugin {
    public PluginMain(PluginWrapper wrapper) {
        super(wrapper);
    }
}