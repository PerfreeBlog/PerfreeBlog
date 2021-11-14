package com.perfree.commons;

import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.stereotype.Component;

/**
 * 自定义Spring Bean工具类，用于获取applicationContext及获取已注入的bean
 * @author Perfree
 */
@Component
public class SpringBeanUtils implements ApplicationContextAware {
    private static ApplicationContext applicationContext = null;

    /**
     * 设置applicationContext
     * @param context applicationContext
     * @throws BeansException exception
     */
    @Override
    public void setApplicationContext(ApplicationContext context) throws BeansException {
        if(applicationContext == null){
            applicationContext = context;
        }
    }

    /**
     * 获取applicationContext
     * @return applicationContext
     */
    public static ApplicationContext getApplicationContext(){
        return applicationContext;
    }

    /**
     * 通过class获取注入的Bean
     * @param clazz Class
     * @param <T> Class
     * @return T
     */
    public static <T> T getBean(Class<T> clazz) {
        return getApplicationContext().getBean(clazz);
    }


    /**
     * 通过Bean名称获取Bean
     * @param beanName Bean名称
     * @return Object
     */
    public static Object getBean(String beanName) {
        return getApplicationContext().getBean(beanName);
    }
}
