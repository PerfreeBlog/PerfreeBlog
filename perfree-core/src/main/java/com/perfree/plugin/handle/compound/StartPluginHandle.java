package com.perfree.plugin.handle.compound;

import com.perfree.plugin.PluginInfo;
import com.perfree.plugin.handle.*;
import com.perfree.plugin.handle.base.BasePluginHandle;
import com.perfree.plugin.register.*;
import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Component
public class StartPluginHandle implements PluginRegister, ApplicationContextAware {
    ApplicationContext applicationContext;

    List<BasePluginHandle> pluginRegisterList = Collections.synchronizedList(new ArrayList<>());

    @Override
    public void initialize() throws Exception {
        pluginRegisterList.clear();
        pluginRegisterList.add(new ClassHandle());
        pluginRegisterList.add(new MapperHandle());
        pluginRegisterList.add(new ApplicationContextPluginHandle());
        pluginRegisterList.add(new ControllerHandle(this.applicationContext));
        pluginRegisterList.add(new InterceptorHandle(this.applicationContext));
        pluginRegisterList.add(new TemplateDirectiveHandle(this.applicationContext));
        pluginRegisterList.add(new AdminMenuHandle(this.applicationContext));
        pluginRegisterList.add(new ResourcesHandle());
        pluginRegisterList.add(new TemplateHandle(this.applicationContext));
        for (BasePluginHandle pluginHandle : pluginRegisterList) {
            pluginHandle.initialize();
        }
    }

    @Override
    public void registry(PluginInfo plugin) throws Exception {
        for (BasePluginHandle pluginHandle : pluginRegisterList) {
            pluginHandle.registry(plugin);
        }
    }

    @Override
    public void unRegistry(PluginInfo plugin) throws Exception {
        try {
            for (BasePluginHandle pluginHandle : pluginRegisterList) {
                pluginHandle.unRegistry(plugin);
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
