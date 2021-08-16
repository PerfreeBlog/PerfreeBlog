package com.exam;

import com.perfree.plugins.Plugin;

public class HelloWorldPlugin implements Plugin {
    @Override
    public void onStart() {
        System.out.println("插件启动");
    }

    @Override
    public void onUpdate() {
        System.out.println("插件更新");
    }

    @Override
    public void onInstall() {
        System.out.println("插件安装");
    }

    @Override
    public void onUnInstall() {
        System.out.println("插件卸载动");
    }
}
