package com.perfree.plugin.handle.compound;

import com.perfree.plugin.PluginInfo;
import com.perfree.plugin.handle.ApplicationContextPluginHandle;
import com.perfree.plugin.handle.ClassHandle;
import com.perfree.plugin.handle.MapperHandle;
import com.perfree.plugin.handle.base.BasePluginHandle;
import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Component
public class LoadPluginHandle implements BasePluginHandle, ApplicationContextAware {
    ApplicationContext applicationContext;

    List<BasePluginHandle> pluginRegisterList = Collections.synchronizedList(new ArrayList<>());
    @Override
    public void initialize() throws Exception {
        pluginRegisterList.clear();
        pluginRegisterList.add(new ClassHandle());
        pluginRegisterList.add(new MapperHandle());
        pluginRegisterList.add(new ApplicationContextPluginHandle());
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
