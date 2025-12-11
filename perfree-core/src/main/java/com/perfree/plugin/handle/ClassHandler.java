package com.perfree.plugin.handle;

import com.baomidou.mybatisplus.core.MybatisConfiguration;
import com.perfree.commons.utils.SpringBeanUtil;
import com.perfree.plugin.PluginApplicationContextHolder;
import com.perfree.plugin.PluginInfo;
import com.perfree.plugin.annotation.InterceptPath;
import lombok.extern.slf4j.Slf4j;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.session.SqlSessionFactory;
import org.mybatis.spring.mapper.MapperFactoryBean;
import org.springframework.beans.factory.support.AbstractBeanDefinition;
import org.springframework.beans.factory.support.GenericBeanDefinition;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.*;
import org.springframework.context.event.EventListener;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.event.TransactionalEventListener;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.socket.config.annotation.EnableWebSocket;

import java.lang.annotation.Annotation;
import java.lang.reflect.Method;
import java.util.*;

/**
 * @author Perfree
 * @description Class处理 - 支持 Spring 全注解扫描和注册
 * @date 15:35 2023/9/28
 */
@Slf4j
public class ClassHandler implements BasePluginRegistryHandler{

    // 类级别的注解 - 带这些注解的类会被注册为 Bean
    @SuppressWarnings("unchecked")
    private final static Class<? extends Annotation>[] REGISTER_ANNO = new Class[]{
        // 基础组件注解
        Bean.class,
        Configuration.class,
        Component.class,
        Service.class,
        Repository.class,

        // Web 层注解
        RestController.class,
        Controller.class,
        ControllerAdvice.class,
        RestControllerAdvice.class,

        // 数据库相关
        Mapper.class,

        // AOP 相关
        org.aspectj.lang.annotation.Aspect.class,

        // 功能启用注解
        // EnableAsync.class, // 由于 ClassLoader 隔离，暂不支持
        EnableScheduling.class,
        EnableCaching.class,
        EnableTransactionManagement.class,
        EnableWebSocket.class,

        // 自定义注解
        InterceptPath.class
    };

    // 方法级别的注解 - 类中有方法带这些注解时，整个类需要被注册
    @SuppressWarnings("unchecked")
    private final static Class<? extends Annotation>[] METHOD_LEVEL_ANNO = new Class[]{
        // 定时任务
        Scheduled.class,

        // 异步执行 - 由于 ClassLoader 隔离问题，暂不支持 @Async
        // 建议使用 CompletableFuture + Executor 实现异步功能
        // Async.class,

        // 事务管理
        Transactional.class,

        // 事件监听
        EventListener.class,
        TransactionalEventListener.class,

        // 缓存注解
        Cacheable.class,
        CacheEvict.class,
        CachePut.class,

        // AOP 切面
        org.aspectj.lang.annotation.Before.class,
        org.aspectj.lang.annotation.After.class,
        org.aspectj.lang.annotation.Around.class,
        org.aspectj.lang.annotation.AfterReturning.class,
        org.aspectj.lang.annotation.AfterThrowing.class,
        org.aspectj.lang.annotation.Pointcut.class
    };

    @Override
    public void initialize() throws Exception {
        // 初始化操作（如果需要）
    }

    @Override
    public void registry(PluginInfo pluginInfo) throws Exception {
        AnnotationConfigApplicationContext pluginContext =
                PluginApplicationContextHolder.getApplicationContext(pluginInfo.getPluginId());
        ApplicationContext parentContext = pluginContext.getParent();

        log.info("Starting plugin class registration for plugin: {}", pluginInfo.getPluginId());

        // 1. 注册所有必要的 BeanPostProcessor，支持更多 Spring 注解
        PluginBeanPostProcessorRegistry.registerEssentialBeanPostProcessors(pluginContext, parentContext);

        // 2. MyBatis-Plus 实现一系列框架自定义 bean，必须先注册 mapper 接口
        registerMapper(pluginInfo);

        // 3. 扫描并注册普通 Bean
        List<Class<?>> pluginClassList = pluginInfo.getClassList().stream()
                .filter(item -> !item.isInterface())
                .toList();

        if (!pluginClassList.isEmpty()) {
            List<Class<?>> registryClassList = new ArrayList<>();

            for (Class<?> aClass : pluginClassList) {
                if (shouldRegisterAsBean(aClass)) {
                    registryClassList.add(aClass);
                    log.debug("Registering class as bean: {}", aClass.getName());
                }
            }

            if (!registryClassList.isEmpty()) {
                log.info("Registering {} beans for plugin: {}", registryClassList.size(), pluginInfo.getPluginId());
                pluginContext.register(registryClassList.toArray(new Class[0]));

                // 4. 刷新容器，让所有 Bean 生效
                pluginContext.refresh();
                log.info("Plugin context refreshed successfully for plugin: {}", pluginInfo.getPluginId());
            } else {
                log.warn("No beans found to register for plugin: {}", pluginInfo.getPluginId());
            }
        }
    }

    /**
     * 判断类是否应该被注册为 Bean
     * 支持三种方式：
     * 1. 类上有指定的注解
     * 2. 类上有使用 @Component 作为元注解的自定义注解
     * 3. 类的方法上有需要 Spring 处理的注解（如 @Scheduled, @Async 等）
     *
     * @param clazz 要检查的类
     * @return true 如果应该注册
     */
    private boolean shouldRegisterAsBean(Class<?> clazz) {
        // 1. 检查类级别的注解
        if (hasAnyAnnotation(clazz, REGISTER_ANNO)) {
            return true;
        }

        // 2. 检查是否有使用 @Component 作为元注解的自定义注解（支持组合注解）
        if (hasMetaAnnotation(clazz, Component.class)) {
            return true;
        }

        // 3. 检查方法级别的注解（如 @Scheduled, @Async, @Transactional 等）
        if (hasAnyMethodAnnotation(clazz, METHOD_LEVEL_ANNO)) {
            return true;
        }

        return false;
    }

    /**
     * 检查类是否有指定的任意一个注解
     *
     * @param clazz 要检查的类
     * @param annotations 注解数组
     * @return true 如果有任意一个注解
     */
    private boolean hasAnyAnnotation(Class<?> clazz, Class<? extends Annotation>[] annotations) {
        for (Class<? extends Annotation> anno : annotations) {
            if (clazz.isAnnotationPresent(anno)) {
                return true;
            }
        }
        return false;
    }

    /**
     * 检查类是否有使用指定注解作为元注解的注解（支持组合注解和自定义注解）
     * 例如：自定义的 @MyService 注解上标注了 @Component，这个方法可以识别
     *
     * @param clazz 要检查的类
     * @param metaAnnotation 元注解类型（如 Component.class）
     * @return true 如果有使用该元注解的注解
     */
    private boolean hasMetaAnnotation(Class<?> clazz, Class<? extends Annotation> metaAnnotation) {
        Annotation[] annotations = clazz.getAnnotations();
        for (Annotation annotation : annotations) {
            Class<? extends Annotation> annotationType = annotation.annotationType();

            // 跳过 java.lang 包下的注解，避免递归检查系统注解
            if (annotationType.getName().startsWith("java.lang")) {
                continue;
            }

            // 检查该注解是否使用了指定的元注解
            if (annotationType.isAnnotationPresent(metaAnnotation)) {
                log.debug("Found meta-annotation @{} on custom annotation @{} for class: {}",
                        metaAnnotation.getSimpleName(),
                        annotationType.getSimpleName(),
                        clazz.getName());
                return true;
            }
        }
        return false;
    }

    /**
     * 检查类的方法是否有指定的注解
     * 这对于 @Scheduled, @Async, @Transactional 等方法级注解很重要
     *
     * @param clazz 要检查的类
     * @param annotations 注解数组
     * @return true 如果有任意方法包含任意一个注解
     */
    private boolean hasAnyMethodAnnotation(Class<?> clazz, Class<? extends Annotation>[] annotations) {
        Method[] methods = clazz.getDeclaredMethods();
        for (Method method : methods) {
            for (Class<? extends Annotation> anno : annotations) {
                if (method.isAnnotationPresent(anno)) {
                    log.debug("Found method annotation @{} on method {}.{}",
                            anno.getSimpleName(),
                            clazz.getSimpleName(),
                            method.getName());
                    return true;
                }
            }
        }
        return false;
    }


    /**
     * 注册mapper接口
     * @param pluginInfo pluginInfo
     */
    private void registerMapper(PluginInfo pluginInfo) {
        List<Class<?>> mapperClassList = getMapperList(pluginInfo);
        if (mapperClassList.isEmpty()) return;
        //注册mapper
        for (Class<?> mapperClass : mapperClassList) {
            GenericBeanDefinition definition = new GenericBeanDefinition();
            definition.getConstructorArgumentValues().addGenericArgumentValue(mapperClass);
            definition.setBeanClass(MapperFactoryBean.class);
            definition.getPropertyValues().add("addToConfig", true);
            definition.setAutowireMode(AbstractBeanDefinition.AUTOWIRE_BY_TYPE);
            PluginApplicationContextHolder.getApplicationContext(pluginInfo.getPluginId()).registerBeanDefinition(mapperClass.getName(), definition);
        }

    }

    /**
     * @description 获取所有Mapper接口
     * @author Perfree
     * @date 2021/11/13 8:31
     */
    private List<Class<?>> getMapperList(PluginInfo plugin){
        List<Class<?>> mapperClassList = new ArrayList<>();

        for (Class<?> aClass : plugin.getClassList()) {
            Mapper annotation = aClass.getAnnotation(Mapper.class);
            if (annotation != null) {
                mapperClassList.add(aClass);
            }
        }
        return mapperClassList;
    }

    @Override
    public void unRegistry(PluginInfo pluginInfo) throws Exception {

        String[] beanDefinitionNames = PluginApplicationContextHolder.getApplicationContext(pluginInfo.getPluginId()).getBeanDefinitionNames();
        for (String beanDefinitionName : beanDefinitionNames) {
            PluginApplicationContextHolder.getApplicationContext(pluginInfo.getPluginId()).removeBeanDefinition(beanDefinitionName);
        }

        // 把mapper取消注册
        SqlSessionFactory sqlSessionFactory = SpringBeanUtil.context.getBean(SqlSessionFactory.class);
        List<Class<?>> mapperList = getMapperList(pluginInfo);
        MybatisConfiguration configuration = (MybatisConfiguration) sqlSessionFactory.getConfiguration();
        for (Class<?> aClass : mapperList) {
            configuration.removeMapper(aClass);
        }
    }

}
