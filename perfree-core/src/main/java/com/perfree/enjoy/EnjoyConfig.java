package com.perfree.enjoy;

import com.jfinal.template.Engine;
import com.perfree.commons.constant.SystemConstants;
import com.perfree.enjoy.shared.TplMethodShared;
import org.dromara.hutool.core.data.id.IdUtil;
import org.dromara.hutool.core.date.DateUtil;
import org.dromara.hutool.core.text.StrUtil;
import org.dromara.hutool.json.JSONUtil;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

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
        engine.setSourceFactory(new TemplateSourceFactory());
        engine.addSharedMethod(new StrUtil());
        engine.setCompressorOn('\n');
        engine.setDevMode(true);
        Engine.setFastMode(true);
        Engine.setChineseExpression(true);
        engine.addSharedMethod(new TplMethodShared());
        engine.addSharedObject(SystemConstants.VERSION, version);
        return jfr;
    }
}
