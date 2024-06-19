package com.perfree.config;

import com.perfree.commons.constant.SystemConstants;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.CacheControl;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.time.Duration;

@Configuration
public class MvcConfig implements WebMvcConfigurer {

    private static final Logger LOGGER = LoggerFactory.getLogger(MvcConfig.class);

    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        registry.addViewController("/admin/**").setViewName("admin/index");
        registry.addViewController("/login").setViewName("admin/index");
    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // 注册默认的静态资源处理器
        registry.addResourceHandler(SystemConstants.DEFAULT_ATTACH_URL_PATTERNS)
                .addResourceLocations("file:resources/upload/")
                .setCachePeriod(3600)
                .setCacheControl(CacheControl.maxAge(Duration.ofMinutes(30)));
        registry.addResourceHandler("/favicon.ico")
                .addResourceLocations("classpath:/static/favicon.ico");
    }
}
