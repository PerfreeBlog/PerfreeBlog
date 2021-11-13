package com.perfree.plugin.config;

import com.perfree.common.Constants;
import com.perfree.plugin.PluginManager;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.nio.file.Paths;

@Configuration
public class PluginAutoConfig {

    @Bean
    public PluginManager pluginManager() {
        return new PluginManager(Paths.get(Constants.PLUGINS_DIR));
    }
}
