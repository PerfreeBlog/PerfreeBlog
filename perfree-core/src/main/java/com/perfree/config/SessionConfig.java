package com.perfree.config;

import org.springframework.boot.web.servlet.ServletListenerRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.context.request.RequestContextListener;
import org.springframework.web.util.IntrospectorCleanupListener;

import java.util.EventListener;

@Configuration
public class SessionConfig {
    @Bean
    public ServletListenerRegistrationBean<EventListener> servletListenerRegistrationBean() {
        ServletListenerRegistrationBean<EventListener> srb = new ServletListenerRegistrationBean<EventListener>();
        //防止Spring内存溢出监听器
        srb.setListener(new IntrospectorCleanupListener());
        //request监听器 主要需要配置这个监听器
        srb.setListener(new RequestContextListener());
        return srb;
    }
}
