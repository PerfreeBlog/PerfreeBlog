package com.perfree.interceptor;

import com.perfree.permission.AdminMenuGroup;

import java.util.List;

public interface BaseMenuService {
    void addPluginSystemMenu(List<AdminMenuGroup> adminMenuGroups, String pluginId);
    void removePluginSystemMenu(String pluginId);
}
