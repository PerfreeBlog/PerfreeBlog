package com.exam;

import com.exam.directive.SubDirective;
import com.jfinal.template.ext.spring.JFinalViewResolver;
import com.perfree.commons.SpringBeanUtils;
import com.perfree.plugins.Plugin;
import org.springframework.stereotype.Component;

/**
 * 插件事件
 * 启动,更新,卸载,安装示例
 */
@Component
public class PluginInit implements Plugin {
    @Override
    public void onStart() {
        // 自定义模板指令
        JFinalViewResolver jFinalViewResolver = SpringBeanUtils.getBean(JFinalViewResolver.class);
        jFinalViewResolver.getEngine().addDirective("subs", SubDirective.class);
        System.out.println("onStart");
    }

    @Override
    public void onUpdate() {
        System.out.println("onUpdate");
    }

    @Override
    public void onInstall() {
        System.out.println("onInstall");
    }

    @Override
    public void onUnInstall() {
        // 移除自定义模板指令
        JFinalViewResolver jFinalViewResolver = SpringBeanUtils.getBean(JFinalViewResolver.class);
        jFinalViewResolver.getEngine().removeDirective("subs");
        System.out.println("onUnInstall");
    }
}
