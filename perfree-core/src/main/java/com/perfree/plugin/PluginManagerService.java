package com.perfree.plugin;

import org.pf4j.PluginWrapper;

import java.nio.file.Path;
import java.util.List;

/**
 * @description PluginManagerService
 * @author Perfree
 * @date 2021/11/9 9:13
 */
public interface PluginManagerService {
    /**
     * @description 安装插件
     * @param path 插件路径
     */
    PluginInfo install(Path path) throws Exception;

    /**
     * @description 卸载插件
     * @param pluginId 插件Id
     */
    void unInstall(String pluginId) throws Exception;

    /**
     * @description 插件初始化
     */
    void initPlugins() throws Exception;

    /**
     * @description 获取所有插件
     */
    List<PluginWrapper> getInstallPlugins();
}
