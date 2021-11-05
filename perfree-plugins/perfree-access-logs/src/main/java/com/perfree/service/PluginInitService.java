package com.perfree.service;

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
    private AccessService accessService;
    @Override
    public void onStart() {
        System.out.println("onStart");
    }

    @Override
    public void onUpdate() {
        System.out.println("onUpdate");
    }

    @Override
    public void onInstall() {
        accessService.createTable();
        System.out.println("onInstall");
    }

    @Override
    public void onUnInstall() {
        System.out.println("onUnInstall");
    }
}
