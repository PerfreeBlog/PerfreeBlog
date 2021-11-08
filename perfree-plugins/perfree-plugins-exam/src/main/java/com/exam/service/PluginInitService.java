package com.exam.service;

import com.exam.directive.SubDirective;
import com.gitee.starblues.realize.PluginUtils;
import com.jfinal.template.ext.spring.JFinalViewResolver;
import com.perfree.commons.SpringBeanUtils;
import com.perfree.plugins.Plugin;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * 插件事件
 * 启动,更新,卸载,安装示例
 */
@Service
public class PluginInitService implements Plugin {
    @Autowired
    private PluginUtils pluginUtils;

    @Override
    public void onStart() {
        // 自定义模板指令
        JFinalViewResolver jFinalViewResolver = pluginUtils.getMainBean(JFinalViewResolver.class);
        jFinalViewResolver.getEngine().addDirective("subs", SubDirective.class);
        System.out.println("onStart");
    }

    @Override
    public void onUpdate() {
        // 移除自定义模板指令
        JFinalViewResolver jFinalViewResolver = pluginUtils.getMainBean(JFinalViewResolver.class);
        jFinalViewResolver.getEngine().removeDirective("subs");
        System.out.println("onUpdate");
    }

    @Override
    public void onInstall() {
        System.out.println("onInstall");
    }

    @Override
    public void onUnInstall() {
        // 移除自定义模板指令
        JFinalViewResolver jFinalViewResolver = pluginUtils.getMainBean(JFinalViewResolver.class);
        jFinalViewResolver.getEngine().removeDirective("subs");
        System.out.println("onUnInstall");
    }
}
