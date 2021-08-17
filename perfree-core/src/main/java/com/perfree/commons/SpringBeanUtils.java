package com.perfree.commons;

import org.apache.ibatis.session.SqlSessionFactory;
import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.stereotype.Component;

@Component
public class SpringBeanUtils implements ApplicationContextAware {
    private static ApplicationContext applicationContext = null;

    @Override
    public void setApplicationContext(ApplicationContext context) throws BeansException {
        if(applicationContext == null){
            applicationContext = context;
        }
    }

    public static ApplicationContext getApplicationContext(){
        return applicationContext;
    }

    /**
     * 注入对象
     */
    public static <T> T getBean(Class<T> clazz) {
        return getApplicationContext().getBean(clazz);
    }

    /**
     * 获取mapper
     */
    public static <T> T getMapper(Class<T> clazz) {
        SqlSessionFactory sqlSessionFactory = getBean(SqlSessionFactory.class);
        return sqlSessionFactory.openSession().getMapper(clazz);
    }

    /**
     * 通过名称注入
     */
    public static Object getBean(String beanName) {
        return getApplicationContext().getBean(beanName);
    }
}
