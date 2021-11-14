package com.perfree.plugin.register;

import com.perfree.plugin.PluginInfo;

/**
 * 定义插件注册接口
 * @author Perfree
 */
public interface PluginRegister {
    /**
     * 插件组件初始化
     * @throws Exception
     */
    void initialize() throws Exception;

    /**
     * 插件组件注册
     * @param plugin
     * @throws Exception
     */
    void registry(PluginInfo plugin) throws Exception;

    /**
     * 插件组件取消注册
     * @param plugin
     * @throws Exception
     */
    void unRegistry(PluginInfo plugin) throws Exception;
}
