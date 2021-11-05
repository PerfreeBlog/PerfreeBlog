package com.exam;

import com.perfree.plugins.Plugin;
import org.springframework.stereotype.Component;

@Component
public class PluginInit implements Plugin {
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
        System.out.println("onInstall");
    }

    @Override
    public void onUnInstall() {
        System.out.println("onUnInstall");
    }
}
