package com.perfree.plugin.handle;

import lombok.extern.slf4j.Slf4j;
import org.springframework.aop.framework.autoproxy.InfrastructureAdvisorAutoProxyCreator;
import org.springframework.beans.factory.annotation.AutowiredAnnotationBeanPostProcessor;
import org.springframework.beans.factory.config.BeanPostProcessor;
import org.springframework.cache.annotation.AnnotationCacheOperationSource;
import org.springframework.cache.interceptor.BeanFactoryCacheOperationSourceAdvisor;
import org.springframework.cache.interceptor.CacheInterceptor;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.context.annotation.CommonAnnotationBeanPostProcessor;
import org.springframework.context.event.EventListenerMethodProcessor;
import org.springframework.scheduling.annotation.AsyncAnnotationBeanPostProcessor;
import org.springframework.scheduling.annotation.ScheduledAnnotationBeanPostProcessor;
import org.springframework.transaction.annotation.AnnotationTransactionAttributeSource;
import org.springframework.transaction.interceptor.BeanFactoryTransactionAttributeSourceAdvisor;
import org.springframework.transaction.interceptor.TransactionInterceptor;

/**
 * @author Perfree
 * @description 插件 BeanPostProcessor 注册工具类，用于注册各种Spring特性的支持
 * @date 2025-12-11
 */
@Slf4j
public class PluginBeanPostProcessorRegistry {

    /**
     * 注册所有必要的 BeanPostProcessor 到插件上下文
     * @param pluginContext 插件的 ApplicationContext
     * @param parentContext 父 ApplicationContext
     */
    public static void registerEssentialBeanPostProcessors(
            AnnotationConfigApplicationContext pluginContext,
            ApplicationContext parentContext) {

        log.debug("Registering essential BeanPostProcessors for plugin context");

        // 1. 支持 @Autowired, @Value, @Inject 等依赖注入注解
        registerAutowiredSupport(pluginContext);

        // 2. 支持 @PostConstruct, @PreDestroy, @Resource 等生命周期注解
        registerCommonAnnotationSupport(pluginContext);

        // 3. 支持 @EventListener, @TransactionalEventListener 等事件监听注解
        registerEventListenerSupport(pluginContext);

        // 4. 支持 @Async 异步执行注解
        registerAsyncSupport(pluginContext, parentContext);

        // 5. 支持 @Scheduled, @Schedules 定时任务注解
        registerSchedulingSupport(pluginContext, parentContext);

        // 6. 支持 @Transactional 事务注解
        registerTransactionSupport(pluginContext, parentContext);

        // 7. 支持 @Cacheable, @CacheEvict, @CachePut 等缓存注解
        registerCacheSupport(pluginContext, parentContext);

        log.debug("Essential BeanPostProcessors registered successfully");
    }

    /**
     * 注册 @Autowired 支持
     */
    private static void registerAutowiredSupport(AnnotationConfigApplicationContext context) {
        try {
            AutowiredAnnotationBeanPostProcessor processor = new AutowiredAnnotationBeanPostProcessor();
            processor.setBeanFactory(context.getBeanFactory());
            context.getBeanFactory().addBeanPostProcessor(processor);
            log.debug("Registered AutowiredAnnotationBeanPostProcessor");
        } catch (Exception e) {
            log.warn("Failed to register AutowiredAnnotationBeanPostProcessor", e);
        }
    }

    /**
     * 注册 @PostConstruct, @PreDestroy 等支持
     */
    private static void registerCommonAnnotationSupport(AnnotationConfigApplicationContext context) {
        try {
            CommonAnnotationBeanPostProcessor processor = new CommonAnnotationBeanPostProcessor();
            processor.setBeanFactory(context.getBeanFactory());
            context.getBeanFactory().addBeanPostProcessor(processor);
            log.debug("Registered CommonAnnotationBeanPostProcessor");
        } catch (Exception e) {
            log.warn("Failed to register CommonAnnotationBeanPostProcessor", e);
        }
    }

    /**
     * 注册 @EventListener 支持
     */
    private static void registerEventListenerSupport(AnnotationConfigApplicationContext context) {
        try {
            // EventListenerMethodProcessor 需要作为 BeanFactoryPostProcessor 注册
            EventListenerMethodProcessor processor = new EventListenerMethodProcessor();
            // 设置 ApplicationContext，EventListenerMethodProcessor 实现了 ApplicationContextAware
            processor.setApplicationContext(context);
            // 注册为单例 Bean
            context.getBeanFactory().registerSingleton(
                    "org.springframework.context.event.internalEventListenerProcessor",
                    processor);
            log.debug("Registered EventListenerMethodProcessor");
        } catch (Exception e) {
            log.warn("Failed to register EventListenerMethodProcessor", e);
        }
    }

    /**
     * 注册 @Async 支持
     * 注意：由于插件使用独立的 ClassLoader，CGLIB 代理可能会遇到类加载问题
     * 因此暂时不在插件中自动启用 @Async 支持
     * 如需异步功能，建议使用 @Resource 注入主应用的 TaskExecutor 手动实现
     */
    private static void registerAsyncSupport(
            AnnotationConfigApplicationContext pluginContext,
            ApplicationContext parentContext) {
        // 暂时禁用插件中的 @Async 自动支持，避免 ClassLoader 冲突
        // 插件中如需异步功能，建议使用以下方式：
        // 1. 注入主应用的 Executor 手动提交任务
        // 2. 使用 CompletableFuture.runAsync()
        // 3. 使用消息队列
        log.debug("Async annotation support is disabled in plugin context due to ClassLoader isolation");
    }

    /**
     * 注册 @Scheduled 支持
     */
    private static void registerSchedulingSupport(
            AnnotationConfigApplicationContext pluginContext,
            ApplicationContext parentContext) {
        try {
            // 创建 ScheduledAnnotationBeanPostProcessor
            ScheduledAnnotationBeanPostProcessor processor = new ScheduledAnnotationBeanPostProcessor();

            // 设置必要的属性
            processor.setBeanFactory(pluginContext.getBeanFactory());
            processor.setApplicationContext(pluginContext);

            // 注册为单例 Bean，确保能正确处理 @Scheduled 注解
            pluginContext.getBeanFactory().registerSingleton(
                    "org.springframework.context.annotation.internalScheduledAnnotationProcessor",
                    processor);

            // 同时添加为 BeanPostProcessor
            pluginContext.getBeanFactory().addBeanPostProcessor(processor);

            log.info("Successfully registered ScheduledAnnotationBeanPostProcessor for plugin");
        } catch (Exception e) {
            log.warn("Failed to register ScheduledAnnotationBeanPostProcessor: {}", e.getMessage(), e);
        }
    }

    /**
     * 注册 @Transactional 支持
     */
    private static void registerTransactionSupport(
            AnnotationConfigApplicationContext pluginContext,
            ApplicationContext parentContext) {
        try {
            // 尝试从父容器获取 PlatformTransactionManager
            if (parentContext.getBeanNamesForType(
                    org.springframework.transaction.PlatformTransactionManager.class).length > 0) {

                org.springframework.transaction.PlatformTransactionManager txManager =
                        parentContext.getBean(org.springframework.transaction.PlatformTransactionManager.class);

                // 创建事务属性源
                AnnotationTransactionAttributeSource attributeSource = new AnnotationTransactionAttributeSource();

                // 创建事务拦截器
                TransactionInterceptor interceptor = new TransactionInterceptor(txManager, attributeSource);

                // 创建事务 Advisor
                BeanFactoryTransactionAttributeSourceAdvisor advisor = new BeanFactoryTransactionAttributeSourceAdvisor();
                advisor.setTransactionAttributeSource(attributeSource);
                advisor.setAdvice(interceptor);

                // 注册自动代理创建器
                if (!pluginContext.getBeanFactory().containsBean("org.springframework.aop.config.internalAutoProxyCreator")) {
                    InfrastructureAdvisorAutoProxyCreator proxyCreator = new InfrastructureAdvisorAutoProxyCreator();
                    proxyCreator.setBeanFactory(pluginContext.getBeanFactory());
                    pluginContext.getBeanFactory().addBeanPostProcessor(proxyCreator);
                }

                // 注册 advisor
                pluginContext.getBeanFactory().registerSingleton(
                        "org.springframework.transaction.config.internalTransactionAdvisor", advisor);

                log.debug("Registered Transaction support");
            }
        } catch (Exception e) {
            log.debug("Transaction support not available, skipping: {}", e.getMessage());
        }
    }

    /**
     * 注册 @Cacheable 等缓存注解支持
     */
    private static void registerCacheSupport(
            AnnotationConfigApplicationContext pluginContext,
            ApplicationContext parentContext) {
        try {
            // 尝试从父容器获取 CacheManager
            if (parentContext.getBeanNamesForType(
                    org.springframework.cache.CacheManager.class).length > 0) {

                org.springframework.cache.CacheManager cacheManager =
                        parentContext.getBean(org.springframework.cache.CacheManager.class);

                // 创建缓存操作源
                AnnotationCacheOperationSource operationSource = new AnnotationCacheOperationSource();

                // 创建缓存拦截器
                CacheInterceptor interceptor = new CacheInterceptor();
                interceptor.setCacheManager(cacheManager);
                interceptor.setCacheOperationSource(operationSource);

                // 创建缓存 Advisor
                BeanFactoryCacheOperationSourceAdvisor advisor = new BeanFactoryCacheOperationSourceAdvisor();
                advisor.setCacheOperationSource(operationSource);
                advisor.setAdvice(interceptor);

                // 注册自动代理创建器（如果事务支持还没注册的话）
                if (!pluginContext.getBeanFactory().containsBean("org.springframework.aop.config.internalAutoProxyCreator")) {
                    InfrastructureAdvisorAutoProxyCreator proxyCreator = new InfrastructureAdvisorAutoProxyCreator();
                    proxyCreator.setBeanFactory(pluginContext.getBeanFactory());
                    pluginContext.getBeanFactory().addBeanPostProcessor(proxyCreator);
                }

                // 注册 advisor
                pluginContext.getBeanFactory().registerSingleton(
                        "org.springframework.cache.config.internalCacheAdvisor", advisor);

                log.debug("Registered Cache support");
            }
        } catch (Exception e) {
            log.debug("Cache support not available, skipping: {}", e.getMessage());
        }
    }
}
