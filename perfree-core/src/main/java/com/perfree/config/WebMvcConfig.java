package com.perfree.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * Web configuration
 *
 * @author Perfree
 */
@Configuration
public class WebMvcConfig implements WebMvcConfigurer {

    public static ResourceHandlerRegistry registry;


    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        WebMvcConfig.registry = registry;
    }


    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(new HtmlInterceptor())
                .addPathPatterns("/**");
    }


}
