package com.perfree.config;

import com.jfinal.template.Directive;
import com.perfree.annotation.TemplateDirective;
import com.perfree.common.DirectiveUtil;
import com.perfree.common.OptionCache;
import com.perfree.mapper.OptionMapper;
import com.perfree.model.Option;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;

@Component
public class PostAppRunner implements ApplicationRunner {
    private final static Logger LOGGER = LoggerFactory.getLogger(PostAppRunner.class);

    private final OptionMapper optionMapper;

    public PostAppRunner(OptionMapper optionMapper) {
        this.optionMapper = optionMapper;
    }

    /**
     * 加载模板指令
     */
    public static void loadDirective() {
        Map<String, Object> beans = DirectiveUtil.getBean();
        for(Map.Entry<String, Object> entry : beans.entrySet()){
            Object bean = entry.getValue();
            TemplateDirective injectBean = bean.getClass().getAnnotation(TemplateDirective.class);
            Directive directive = (Directive) bean;
            Class<? extends Directive> directiveByName = EnjoyConfig.jfr.getEngine().getEngineConfig().getDirective(injectBean.value());
            if (directiveByName == null) {
                EnjoyConfig.jfr.addDirective(injectBean.value(), directive.getClass());
            }
        }
    }

    @Override
    public void run(ApplicationArguments args){
        List<Option> options = optionMapper.getStartOption();
        options.forEach(r -> {
            OptionCache.setOption(r.getKey(), r.getValue());
        });

        PostAppRunner.loadDirective();
    }

}
