package com.perfree.plugin.config;

import com.perfree.plugin.PluginManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.nio.file.Paths;

@Configuration
public class PluginAutoConfig {

    @Autowired
    private PluginConfig pluginConfig;

    @Bean
    public PluginManager pluginManager() {
        return new PluginManager(Paths.get(pluginConfig.getPath()));
    }
}
