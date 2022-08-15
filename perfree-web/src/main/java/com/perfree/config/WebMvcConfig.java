package com.perfree.config;

import com.perfree.interceptor.ApiInterceptor;
import com.perfree.interceptor.DataSourceInterceptor;
import com.perfree.interceptor.EnjoyInterceptor;
import com.perfree.interceptor.HtmlInterceptor;
import com.perfree.plugin.resources.PluginResourceResolver;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

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
        registry.addResourceHandler("/static/**", "/**")
                .addResourceLocations(
                        "classpath:/static/",
                        "file:./resources/static/",
                        "file:./resources/static/themeResources/",
                        "file:./resources/plugin/",
                        "file:" + uploadPath
                );
        registry.addResourceHandler("/swagger**/**").addResourceLocations("classpath:/META-INF/resources/");
        registry.addResourceHandler("/swagger-ui.html").addResourceLocations("classpath:/META-INF/resources/");
        registry.addResourceHandler("/webjars/**").addResourceLocations("classpath:/META-INF/resources/webjars/");
        registry.addResourceHandler("/doc.html").addResourceLocations("classpath:/META-INF/resources/");
        String pathPattern = "/static-plugin/**";
        ResourceHandlerRegistration resourceHandlerRegistration = registry.addResourceHandler(pathPattern);
        resourceHandlerRegistration.resourceChain(false).addResolver(new PluginResourceResolver());
        WebMvcConfig.registry = registry;
    }


    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(new HtmlInterceptor())
                .addPathPatterns("/**").excludePathPatterns(
                "/swagger-resources/**",
                "/webjars/**",
                "/v2/**",
                "/v3/**",
                "/swagger**/**",
                "/swagger-ui.html/**",
                "/doc.html/**"
        );
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

        registry.addInterceptor(new ApiInterceptor())
                .addPathPatterns("/api/**").excludePathPatterns(
                        "/api/option/**"
                );

        registry.addInterceptor(createEnjoyInterceptor()).addPathPatterns("/**")
                .excludePathPatterns(
                        "/install",
                        "/install/step2",
                        "/install/step3"
                );
    }


    @Bean
    public EnjoyInterceptor createEnjoyInterceptor(){
        return new EnjoyInterceptor();
    }
}
