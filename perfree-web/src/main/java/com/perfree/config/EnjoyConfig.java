package com.perfree.config;

import cn.hutool.core.util.StrUtil;
import com.jfinal.template.Engine;
import com.jfinal.template.ext.spring.JFinalViewResolver;
import com.perfree.commons.Constants;
import com.perfree.commons.IpUtil;
import com.perfree.commons.OptionCacheUtil;
import com.perfree.shared.OptionShared;
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

    @Value("${server.port}")
    private int serverPort;

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
        engine.setCompressorOn('\n');
        Engine.setFastMode(true);
        Engine.setChineseExpression(true);
        engine.addSharedMethod(new OptionShared());
        engine.addSharedObject("version", version);
        engine.addSharedObject("website", OptionCacheUtil.getDefaultValue(Constants.OPTION_WEB_SITE, IpUtil.getUrl(serverPort)));
        return jfr;
    }
}
