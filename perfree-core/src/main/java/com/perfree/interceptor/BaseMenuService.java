package com.perfree.interceptor;

import com.perfree.permission.AdminMenuGroup;

import java.util.List;

/**
 * 抽取web模块MenuService，定义该接口，用于插件调用
 * @author Perfree
 */
public interface BaseMenuService {
    /**
     * 添加插件菜单
     * @param adminMenuGroups adminMenuGroups
     * @param pluginId pluginId
     */
    void addPluginSystemMenu(List<AdminMenuGroup> adminMenuGroups, String pluginId);

    /**
     * 移除插件菜单
     * @param pluginId pluginId
     */
    void removePluginSystemMenu(String pluginId);
}
