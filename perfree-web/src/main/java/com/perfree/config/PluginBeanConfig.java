package com.perfree.config;

import com.gitee.starblues.extension.mybatis.SpringBootMybatisExtension;
import com.gitee.starblues.extension.resources.StaticResourceExtension;
import com.gitee.starblues.integration.AutoIntegrationConfiguration;
import com.gitee.starblues.integration.application.AutoPluginApplication;
import com.gitee.starblues.integration.application.PluginApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.http.CacheControl;

import java.util.concurrent.TimeUnit;

@Configuration
@Import(AutoIntegrationConfiguration.class)
public class PluginBeanConfig {
    @Bean
    public PluginApplication pluginApplication(){
        // 实例化自动初始化插件的PluginApplication
        PluginApplication pluginApplication = new AutoPluginApplication();
        // 根据当前环境所集成的框架来选择类型
        pluginApplication.addExtension(new SpringBootMybatisExtension(
                SpringBootMybatisExtension.Type.MYBATIS));
        // 新增静态资源扩展
        StaticResourceExtension staticResourceExtension = new StaticResourceExtension();
        // 如果需要集成Thymeleaf, 则如下
        // StaticResourceExtension staticResourceExtension = new StaticResourceExtension(StaticResourceExtension.Include.THYMELEAF);
        // 插件静态资源Http访问前缀. 默认为: static-plugin
        staticResourceExtension.setPathPrefix("static-plugin");
        // 设置静态资源缓存策略
        staticResourceExtension.setCacheControl(CacheControl.noCache());
        // 添加扩展
        pluginApplication.addExtension(staticResourceExtension);
        return pluginApplication;
    }
}
