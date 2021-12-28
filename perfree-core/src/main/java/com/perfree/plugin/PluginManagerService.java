package com.perfree.plugin;

import com.perfree.model.Plugin;
import org.pf4j.PluginState;
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

    void installAfter(String pluginId);

    /**
     * @description 卸载插件
     * @param pluginId 插件Id
     */
    void unInstall(String pluginId) throws Exception;

    /**
     * 启动插件
     * @param pluginId
     * @return
     */
    PluginState startPlugin(String pluginId);

    /**
     * 停止插件
     * @param pluginId pluginId
     * @return PluginState
     */
    PluginState stopPlugin(String pluginId);

    /**
     * @description 插件初始化
     */
    void initPlugins(List<Plugin> plugins) throws Exception;

    /**
     * @description 获取所有插件
     */
    List<PluginWrapper> getInstallPlugins();
}
