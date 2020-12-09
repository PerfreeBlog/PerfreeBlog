package com.perfree.directive;

import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.stereotype.Component;

import java.util.Map;

/**
 * 自定义bean工具
 */
@Component
public class DirectiveUtil implements ApplicationContextAware {
    private static ApplicationContext applicationContext;

    @Override
    public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
        if(DirectiveUtil.applicationContext == null) {
            DirectiveUtil.applicationContext = applicationContext;
        }
    }

    public static ApplicationContext getApplicationContext() {
        return applicationContext;
    }

    /**
     * 获取自定义注解的bean
     * @return Object 实例
     */
    public static Map<String, Object> getBean(){
        return getApplicationContext().getBeansWithAnnotation(TemplateDirective.class);
    }
}
