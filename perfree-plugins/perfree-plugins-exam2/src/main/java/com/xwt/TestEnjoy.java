package com.xwt;

import com.jfinal.template.Engine;
import com.jfinal.template.ext.spring.JFinalViewResolver;
import com.perfree.config.TemplateSourceFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class TestEnjoy {
    @Bean(name = "jfinalViewResolver1")
    public JFinalViewResolver getJFinalViewResolver() {
        JFinalViewResolver jfr = new JFinalViewResolver();
        jfr.setSuffix(".html");
        jfr.setContentType("text/html;charset=UTF-8");
        jfr.setOrder(0);
        jfr.setSessionInView(true);
        Engine engine = JFinalViewResolver.engine;
        engine.setDevMode(true);
        engine.setSourceFactory(new TemplateSourceFactory());
        return jfr;
    }
}
