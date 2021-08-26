package com.perfree.config;

import cn.hutool.core.util.StrUtil;
import com.jfinal.template.Engine;
import com.jfinal.template.ext.spring.JFinalViewResolver;
import com.perfree.shared.OptionShared;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * Enjoy template config
 * @author Perfree
 */
@Configuration
public class EnjoyConfig {

    public static JFinalViewResolver jfr = null;

    @Bean(name = "jfinalViewResolver")
    public JFinalViewResolver getJFinalViewResolver() {
        jfr = new JFinalViewResolver();
        jfr.setContentType("text/html;charset=UTF-8");
        jfr.setOrder(0);
        jfr.setSessionInView(true);
        Engine engine = JFinalViewResolver.engine;
        engine.setDevMode(true);
        engine.setSourceFactory(new TemplateSourceFactory());
        engine.addSharedMethod(new StrUtil());
        engine.addSharedMethod(new OptionShared());
        return jfr;
    }
}
