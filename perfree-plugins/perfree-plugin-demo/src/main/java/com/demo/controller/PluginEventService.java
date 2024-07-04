package com.demo.controller;

import com.perfree.plugin.BasePluginEvent;
import org.springframework.stereotype.Service;

@Service
public class PluginEventService implements BasePluginEvent {
    @Override
    public void onStart() {
        System.out.println("---------exam插件启动了-------------");
    }

    @Override
    public void onStop() {
        System.out.println("---------exam插件停止了-------------");
    }

    @Override
    public void onUpdate() {
        System.out.println("---------exam插件更新了-------------");
    }

    @Override
    public void onInstall() {
        System.out.println("---------exam插件安装了-------------");
    }

    @Override
    public void onUnInstall() {
        System.out.println("---------exam插件卸载了-------------");
    }
}
