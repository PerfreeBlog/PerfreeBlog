package com.perfree.plugin.register;

import com.perfree.plugin.PluginInfo;
import com.perfree.plugin.PluginApplicationContextHolder;

/**
 * @description 自定义ApplicationContext Register
 * @author Perfree
 * @date 2021/11/9 14:22
 */
public class ApplicationContextPluginRegister implements PluginRegister{
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
