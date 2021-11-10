package com.perfree.plugin.register;

import com.perfree.plugin.PluginInfo;
import com.perfree.plugin.annotation.InterceptPath;
import org.springframework.context.ApplicationContext;
import org.springframework.util.ReflectionUtils;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.handler.AbstractHandlerMapping;
import org.springframework.web.servlet.handler.MappedInterceptor;

import java.lang.reflect.Field;
import java.util.List;
import java.util.stream.Collectors;

/**
 * @description 自定义拦截器注册
 * @author Perfree
 * @date 2021/11/9 14:24
 */
public class InterceptorRegister implements PluginRegister{
    AbstractHandlerMapping handlerMapping;
    List<HandlerInterceptor> handlerInterceptorList;
    ApplicationContext applicationContext;

    public InterceptorRegister(ApplicationContext applicationContext) {
        this.applicationContext = applicationContext;
    }

    @Override
    public void initialize() throws Exception {
        handlerMapping = applicationContext.getBean(AbstractHandlerMapping.class);
        Field adaptedInterceptorsField = ReflectionUtils.findField(handlerMapping.getClass(), "adaptedInterceptors", List.class);
        adaptedInterceptorsField.setAccessible(true);
        handlerInterceptorList = (List<HandlerInterceptor>) adaptedInterceptorsField.get(handlerMapping);
    }

    @Override
    public void registry(PluginInfo plugin) throws Exception {
        List<Class<?>> interceptorClassList = getClassList(plugin);
        if(interceptorClassList.isEmpty()) return;
        for (Class<?> aClass : interceptorClassList) {
            InterceptPath interceptPaths = aClass.getAnnotation(InterceptPath.class);
            if(interceptPaths != null) {
                MappedInterceptor mappedInterceptor = new MappedInterceptor(interceptPaths.value(), (HandlerInterceptor) plugin.getPluginApplicationContext().getBean(aClass));
                handlerInterceptorList.add(mappedInterceptor);
                plugin.getHandlerInterceptorList().add(mappedInterceptor);
            }
        }
    }

    @Override
    public void unRegistry(PluginInfo plugin) throws Exception {
        List<HandlerInterceptor> handlerInterceptorList = plugin.getHandlerInterceptorList();
        for (HandlerInterceptor handlerInterceptor : handlerInterceptorList) {
            this.handlerInterceptorList.remove(handlerInterceptor);
        }

    }

    List<Class<?>> getClassList(PluginInfo plugin) {
        return plugin.getClassList().stream().filter(item -> HandlerInterceptor.class.isAssignableFrom(item)).collect(Collectors.toList());
    }
}
