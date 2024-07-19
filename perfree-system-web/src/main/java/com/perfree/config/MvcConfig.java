package com.perfree.config;

import com.perfree.commons.constant.SystemConstants;
import com.perfree.plugin.core.PluginResourceResolver;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.CacheControl;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.time.Duration;

@Configuration
public class MvcConfig implements WebMvcConfigurer {

    private static final Logger LOGGER = LoggerFactory.getLogger(MvcConfig.class);
    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        registry.addViewController("/admin/**").setViewName("/static/admin/index.html");
        registry.addViewController("/login").setViewName("/static/admin/index.html");
        WebMvcConfigurer.super.addViewControllers(registry);
    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // 注册默认的静态资源处理器
        registry.addResourceHandler(SystemConstants.DEFAULT_ATTACH_URL_PATTERNS)
                .addResourceLocations("file:resources/upload/")
                .setCachePeriod(3600)
                .setCacheControl(CacheControl.maxAge(Duration.ofMinutes(30)));
        registry.addResourceHandler("/static/**").addResourceLocations( "classpath:/static/");
        registry.addResourceHandler("/assets/**").addResourceLocations( "classpath:/static/admin/assets/");
        registry.addResourceHandler("/modules/**").addResourceLocations( "classpath:/static/admin/modules/");
        registry.addResourceHandler("doc.html").addResourceLocations("classpath:/META-INF/resources/");
        registry.addResourceHandler("/webjars/**").addResourceLocations("classpath:/META-INF/resources/webjars/");
        String pathPattern = "/plugin-static/**";
        ResourceHandlerRegistration resourceHandlerRegistration = registry.addResourceHandler(pathPattern);
        resourceHandlerRegistration.resourceChain(false).addResolver(new PluginResourceResolver());
        WebMvcConfigurer.super.addResourceHandlers(registry);

    }


}
