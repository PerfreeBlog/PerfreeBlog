package com.exam.service;

import com.perfree.plugin.BasePluginEvent;
import com.perfree.plugin.PluginEvent;
import org.springframework.stereotype.Service;

/**
 * @description 插件示例: 插件启动,安装,更新,卸载事件
 * @author Perfree
 * @date 2021/11/10 9:53
 */
@Service
public class PluginEventService implements BasePluginEvent {
    @Override
    public void onStart() {
        System.out.println("onStart");
    }

    @Override
    public void onStop() {
        System.out.println("onStop");
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
        System.out.println("onUnInstall");
    }
}
