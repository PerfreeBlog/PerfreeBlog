package com.perfree.plugin.config;

import com.perfree.commons.Constants;
import com.perfree.plugin.PluginManager;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.nio.file.Paths;

/**
 * 自动配置插件
 * @author Perfree
 */
@Configuration
public class PluginAutoConfig {

    @Bean
    public PluginManager pluginManager() {
        return new PluginManager(Paths.get(Constants.PLUGINS_DIR));
    }
}
