package com.perfree.cache;

import com.google.common.cache.Cache;
import com.google.common.cache.CacheBuilder;
import com.google.common.cache.RemovalListener;
import com.perfree.system.api.plugin.dto.PluginApi;
import jakarta.annotation.PostConstruct;
import jakarta.annotation.Resource;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.File;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;

@Service
public class PluginChangeCacheService {

    private final static Logger LOGGER = LoggerFactory.getLogger(PluginChangeCacheService.class);

    @Value("${perfree.autoLoadDevPluginTime}")
    private Long autoLoadDevPluginTime;

    @Resource
    private PluginApi pluginApi;


    private Cache<String, File> pluginChangeCache;


    @PostConstruct
    public void init() {
        pluginChangeCache = CacheBuilder.newBuilder()
                .expireAfterWrite(autoLoadDevPluginTime, TimeUnit.MILLISECONDS)
                .removalListener((RemovalListener<String, File>) notification -> {
                    LOGGER.info("移除插件变动记录:{}, 开始执行插件重启逻辑...", notification.getKey());
                    pluginApi.initDevPlugin(notification.getKey());
                })
                .build();
        // 定时清理缓存
        Executors.newSingleThreadScheduledExecutor().scheduleAtFixedRate(() -> {
            pluginChangeCache.cleanUp();  // 定时清理过期项
        }, 0, 5, TimeUnit.SECONDS);  // 每5秒检查一次
    }

    public void putPluginChange(String plugin, File file) {
        if (!pluginChangeCache.asMap().containsKey(plugin)) {
            LOGGER.info("记录插件变动: {}, 将在{}毫秒后重启插件,注意: 如电脑配置过低可将配置文件perfree.autoLoadDevPluginTime的值增大,反之减小", plugin, autoLoadDevPluginTime);
            pluginChangeCache.put(plugin, file);
        }
    }
}
