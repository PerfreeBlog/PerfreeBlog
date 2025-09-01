package com.perfree.config;

import com.perfree.commons.constant.SystemConstants;
import com.perfree.interceptor.ApiInterceptor;
import com.perfree.interceptor.FrontViewInterceptor;
import com.perfree.interceptor.WebInitInterceptor;
import com.perfree.plugin.core.PluginResourceResolver;
import com.perfree.plugin.handle.PluginInterceptorBaseHandler;
import com.perfree.security.interceptor.PluginPreAuthorizeInterceptor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.CacheControl;
import org.springframework.web.servlet.config.annotation.*;

import java.time.Duration;
import java.util.concurrent.TimeUnit;

@Configuration
public class MvcConfig implements WebMvcConfigurer {

    private static final Logger LOGGER = LoggerFactory.getLogger(MvcConfig.class);

    private final PluginPreAuthorizeInterceptor pluginPreAuthorizeInterceptor;

    private final PluginInterceptorBaseHandler pluginInterceptorBaseHandler;

    private final FrontViewInterceptor frontViewInterceptor;

    private final WebInitInterceptor webInitInterceptor;

    private final ApiInterceptor apiInterceptor;


    public MvcConfig(PluginPreAuthorizeInterceptor pluginPreAuthorizeInterceptor,
                     PluginInterceptorBaseHandler pluginInterceptorBaseHandler,
                     FrontViewInterceptor frontViewInterceptor, WebInitInterceptor webInitInterceptor,
                     ApiInterceptor apiInterceptor) {
        this.pluginPreAuthorizeInterceptor = pluginPreAuthorizeInterceptor;
        this.pluginInterceptorBaseHandler = pluginInterceptorBaseHandler;
        this.frontViewInterceptor = frontViewInterceptor;
        this.webInitInterceptor = webInitInterceptor;
        this.apiInterceptor = apiInterceptor;
    }

    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        // 如果前端放在后端容器运行
        registry.addViewController("/admin/**").setViewName("/static/admin/index.html");
        registry.addViewController("/login").setViewName("/static/admin/index.html");
        registry.addViewController("/register").setViewName("/static/admin/index.html");
        registry.addViewController("/findPassword").setViewName("/static/admin/index.html");
        registry.addViewController("/init").setViewName("/static/admin/index.html");
        WebMvcConfigurer.super.addViewControllers(registry);
    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // 注册默认的静态资源处理器
        registry.addResourceHandler(SystemConstants.DEFAULT_ATTACH_URL_PATTERNS, SystemConstants.DEFAULT_OLD_ATTACH_URL_PATTERNS, SystemConstants.DEFAULT_OLD_ATTACH_URL_PATTERNS_2)
                .addResourceLocations("file:resources/upload/")
                .setCachePeriod(3600)
                .setCacheControl(CacheControl.maxAge(Duration.ofMinutes(30)));
        registry.addResourceHandler("/api/static/**").addResourceLocations(
                "classpath:/static/",
                "file:./resources/static/"
        ).setCachePeriod(3600).setCacheControl(CacheControl.maxAge(3600, TimeUnit.SECONDS).cachePublic());

        // 兼容老版本
        registry.addResourceHandler("/static/**").addResourceLocations(
                "classpath:/static/",
                "file:./resources/static/"
        ).setCachePeriod(3600).setCacheControl(CacheControl.maxAge(3600, TimeUnit.SECONDS).cachePublic());

        registry.addResourceHandler("/assets/**").addResourceLocations(
                "classpath:/static/admin/assets/",
                "file:./resources/static/admin/assets/"
        );
        registry.addResourceHandler("/modules/**").addResourceLocations(
                "classpath:/static/admin/modules/",
                "file:./resources/static/admin/modules/"
        );

        registry.addResourceHandler("doc.html").addResourceLocations("classpath:/META-INF/resources/");
        registry.addResourceHandler("/webjars/**").addResourceLocations("classpath:/META-INF/resources/webjars/");
        String pathPattern = "/api/plugin-static/**";
        ResourceHandlerRegistration resourceHandlerRegistration = registry.addResourceHandler(pathPattern);
        resourceHandlerRegistration.resourceChain(false).addResolver(new PluginResourceResolver());
        WebMvcConfigurer.super.addResourceHandlers(registry);

    }

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(webInitInterceptor)
                .addPathPatterns("/**").excludePathPatterns("/static/**", "/assets/**", "/modules/**", "/api/static/**");

        registry.addInterceptor(pluginPreAuthorizeInterceptor)
                .addPathPatterns("/**");

        registry.addInterceptor(pluginInterceptorBaseHandler)
                .addPathPatterns("/**");

        registry.addInterceptor(frontViewInterceptor)
                .addPathPatterns("/**");

        registry.addInterceptor(apiInterceptor)
                .addPathPatterns("/**");

    }

    @Bean
    public CustomErrorPageRegistrar errorPageRegistrar(){
        return new CustomErrorPageRegistrar();
    }


}
