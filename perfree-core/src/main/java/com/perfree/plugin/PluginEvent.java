package com.perfree.plugin;

/**
 * @description 插件事件(2.2.0版本及以上将逐渐去除该类, 请使用新的插件事件接口BasePluginEvent)
 * @author Perfree
 * @date 2021/11/9 14:25
 */
@Deprecated
public interface PluginEvent {
    /**
     * @description 插件启动时加载
     * @author Perfree
     */
    void onStart();
    /**
     * @description 插件更新时加载
     * @author Perfree
     */
    void onUpdate();
    /**
     * @description 插件安装时加载
     * @author Perfree
     */
    void onInstall();
    /**
     * @description 插件卸载时加载
     * @author Perfree
     */
    void onUnInstall();
}
