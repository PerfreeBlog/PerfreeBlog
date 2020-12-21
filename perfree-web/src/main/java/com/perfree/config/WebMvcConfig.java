package com.perfree.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import com.perfree.interceptor.*;

/**
 * Web configuration
 *
 * @author Perfree
 */
@Configuration
public class WebMvcConfig implements WebMvcConfigurer {

    @Value("${web.upload-path}")
    private String uploadPath;
    public static ResourceHandlerRegistry registry;


    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/static/**")
                .addResourceLocations(
                        "classpath:/static/",
                        "file:./resources/static/",
                        "file:./resources/plugin/",
                        "file:" + uploadPath
                );
        WebMvcConfig.registry = registry;
    }


    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(new HtmlInterceptor())
                .addPathPatterns("/**");
        registry.addInterceptor(new DataSourceInterceptor())
                .addPathPatterns("/**")
                .excludePathPatterns(
                        "/install",
                        "/404",
                        "/403",
                        "/500",
                        "/install/step2",
                        "/install/addDatabase",
                        "/static/**"
                );

        registry.addInterceptor(new EnjoyInterceptor()).addPathPatterns("/**")
                .excludePathPatterns(
                        "/install",
                        "/install/step2",
                        "/install/step3"
                );
    }


}
