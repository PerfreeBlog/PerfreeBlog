package com.perfree.plugins;

public interface Plugin {
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
