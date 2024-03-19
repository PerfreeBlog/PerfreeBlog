package com.access.service;

import com.perfree.plugin.BasePluginEvent;
import com.perfree.plugin.PluginEvent;
import net.sf.ehcache.CacheManager;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Service;

/**
 * 插件事件
 * 启动,更新,卸载,安装示例
 */
@Service
public class PluginInitService implements BasePluginEvent {
    @Resource
    private AccessLogsService accessLogsService;

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
        // 建表
        accessLogsService.dropTable();
        accessLogsService.createTable();
        CacheManager.getInstance().removeCache("access_logs");

    }

    @Override
    public void onUnInstall() {
        // 删表
        accessLogsService.dropTable();
    }
}
