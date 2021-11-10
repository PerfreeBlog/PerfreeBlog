package com.perfree.plugin;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

/**
 * @description 已安装的plugin存储
 * @author Perfree
 * @date 2021/11/9 14:27
 */
public class PluginHolder {
    private static final Map<String, PluginInfo> pluginMaps = Collections.synchronizedMap(new HashMap<>());
    public static void put(String pluginId, PluginInfo plugin) {
        pluginMaps.putIfAbsent(pluginId, plugin);
    }

    public static PluginInfo getPlugin(String pluginId) {
        return pluginMaps.get(pluginId);
    }

    public static void remove(String pluginId) {
        pluginMaps.remove(pluginId);
    }

    public static Map<String, PluginInfo> getAllPlugin() {
        return pluginMaps;
    }
}
