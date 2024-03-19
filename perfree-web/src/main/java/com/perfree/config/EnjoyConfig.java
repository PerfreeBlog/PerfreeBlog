package com.perfree.config;

import cn.hutool.core.util.StrUtil;
import com.jfinal.template.Engine;
import com.perfree.commons.Constants;
import com.perfree.commons.IpUtil;
import com.perfree.commons.OptionCacheUtil;
import com.perfree.enjoy.JFinalViewResolver;
import com.perfree.shared.TplMethodShared;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * Enjoy template config
 * @author Perfree
 */
@Configuration
public class EnjoyConfig {
    @Value("${version}")
    private String version;

    public static JFinalViewResolver jfr = null;

    @Bean(name = "jfinalViewResolver")
    public JFinalViewResolver getJFinalViewResolver() {
        jfr = new JFinalViewResolver();
        jfr.setContentType("text/html;charset=UTF-8");
        jfr.setOrder(0);
        jfr.setSessionInView(true);
        jfr.setViewClass(CustomEnjoyView.class);
        Engine engine = JFinalViewResolver.engine;
        engine.setDevMode(true);
        engine.setSourceFactory(new TemplateSourceFactory());
        engine.addSharedMethod(new StrUtil());
        engine.setCompressorOn('\n');
        Engine.setFastMode(true);
        Engine.setChineseExpression(true);
        engine.addSharedMethod(new TplMethodShared());
        engine.addSharedObject(Constants.VERSION, version);
        return jfr;
    }
}
