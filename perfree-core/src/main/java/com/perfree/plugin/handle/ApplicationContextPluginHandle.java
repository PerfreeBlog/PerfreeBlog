package com.perfree.plugin.handle;

import com.perfree.plugin.PluginApplicationContextHolder;
import com.perfree.plugin.PluginInfo;
import com.perfree.plugin.handle.base.BasePluginHandle;

/**
 * @description 自定义ApplicationContext Register
 * @author Perfree
 * @date 2021/11/9 14:22
 */
public class ApplicationContextPluginHandle implements BasePluginHandle {
    @Override
    public void initialize() throws Exception {

    }

    @Override
    public void registry(PluginInfo plugin) throws Exception {
        plugin.getPluginApplicationContext().setClassLoader(plugin.getPluginWrapper().getPluginClassLoader());
        plugin.getPluginApplicationContext().getDefaultListableBeanFactory()
                .registerSingleton(plugin.getPluginWrapper().getPluginId(),
                        plugin.getPluginWrapper().getPlugin());
        plugin.getPluginApplicationContext().refresh();
    }

    @Override
    public void unRegistry(PluginInfo plugin) throws Exception {
        PluginApplicationContextHolder.removePluginApplicationContext(plugin.getPluginWrapper().getPluginId().trim());
        plugin.getPluginApplicationContext().getDefaultListableBeanFactory().destroySingletons();
        plugin.getPluginApplicationContext().close();
    }
}
