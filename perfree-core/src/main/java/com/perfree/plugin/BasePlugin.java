package com.perfree.plugin;

import org.pf4j.Plugin;
import org.pf4j.PluginWrapper;

/**
 * @description 插件主类基类
 * @author Perfree
 * @date 2021/11/9 14:25
 */
public abstract class BasePlugin extends Plugin{
    public BasePlugin(PluginWrapper wrapper) {
        super(wrapper);
    }

    /**
     * 基于插件主类获取插件包
     * @return String
     */
    public String scanPackage(){
        return this.getClass().getPackage().getName();
    }
}
