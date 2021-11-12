package com.perfree.plugin.register;

import com.perfree.plugin.PluginInfo;
import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 * @description 插件注册集合
 * @author Perfree
 * @date 2021/11/9 9:46
 */
@Component
public class CompoundRegister implements PluginRegister, ApplicationContextAware {
    ApplicationContext applicationContext;

    List<PluginRegister> pluginRegisterList = Collections.synchronizedList(new ArrayList<>());

    @Override
    public void initialize() throws Exception {
        pluginRegisterList.clear();
        pluginRegisterList.add(new ClassRegister());
        pluginRegisterList.add(new MapperRegister());
        pluginRegisterList.add(new ApplicationContextPluginRegister());
        pluginRegisterList.add(new ControllerRegister(this.applicationContext));
        pluginRegisterList.add(new InterceptorRegister(this.applicationContext));
        pluginRegisterList.add(new TemplateDirectiveRegister(this.applicationContext));
        pluginRegisterList.add(new AdminMenuRegister(this.applicationContext));
        for (PluginRegister pluginRegister : pluginRegisterList) {
            pluginRegister.initialize();
        }
    }

    @Override
    public void registry(PluginInfo plugin) throws Exception {
        for (PluginRegister pluginRegister : pluginRegisterList) {
            pluginRegister.registry(plugin);
        }
    }

    @Override
    public void unRegistry(PluginInfo plugin) throws Exception {
        try {
            for (PluginRegister pluginRegister : pluginRegisterList) {
                pluginRegister.unRegistry(plugin);
            }
        } finally {
            plugin.getClassList().clear();
        }
    }

    @Override
    public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
        this.applicationContext = applicationContext;
    }
}
