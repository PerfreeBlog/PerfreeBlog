package com.exam;

import com.perfree.plugins.Plugin;

/**
 * @description 扩展插件主类,插件状态发生改变时会调用
 * @author Perfree
 * @date 2021/8/17 15:11
 */
public class HelloWorldPlugin implements Plugin {
    @Override
    public void onStart() {
        System.out.println("插件启动时调用");
    }

    @Override
    public void onUpdate() {
        System.out.println("插件更新时调用");
    }

    @Override
    public void onInstall() {
        System.out.println("插件安装时调用");
    }

    @Override
    public void onUnInstall() {
        System.out.println("插件卸载时调用");
    }
}
