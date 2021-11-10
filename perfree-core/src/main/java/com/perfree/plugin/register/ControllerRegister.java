package com.perfree.plugin.register;

import com.perfree.plugin.PluginInfo;
import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Controller;
import org.springframework.util.ReflectionUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.RequestMappingInfo;
import org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerMapping;

import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.List;

/**
 * @description 自定义Controller 注册
 * @author Perfree
 * @date 2021/11/9 14:24
 */
public class ControllerRegister implements PluginRegister{

    RequestMappingHandlerMapping requestMappingHandlerMapping;

    ApplicationContext applicationContext;

    Method getMappingForMethod;

    public ControllerRegister (ApplicationContext applicationContext) {
        this.applicationContext = applicationContext;
    }

    @Override
    public void initialize() throws Exception {
        requestMappingHandlerMapping = applicationContext.getBean(RequestMappingHandlerMapping.class);
        getMappingForMethod = ReflectionUtils.findMethod(RequestMappingHandlerMapping.class, "getMappingForMethod", Method.class, Class.class);
        getMappingForMethod.setAccessible(true);
    }

    @Override
    public void registry(PluginInfo plugin) throws Exception {
        for (Class<?> aClass : plugin.getClassList()) {
            Controller controller = aClass.getAnnotation(Controller.class);
            RestController restController = aClass.getAnnotation(RestController.class);
            if(controller != null || restController != null) {
                Object bean = plugin.getPluginApplicationContext().getBean(aClass);
                Method[] methods = aClass.getMethods();
                for (Method method : methods) {
                    if (method.getAnnotation(RequestMapping.class) != null
                            || method.getAnnotation(GetMapping.class) != null
                            || method.getAnnotation(PostMapping.class) != null
                            || method.getAnnotation(DeleteMapping.class) != null
                            || method.getAnnotation(PutMapping.class) != null
                            || method.getAnnotation(PatchMapping.class) != null) {
                        RequestMappingInfo requestMappingInfo = (RequestMappingInfo) getMappingForMethod.invoke(requestMappingHandlerMapping, method, aClass);
                        requestMappingHandlerMapping.registerMapping(requestMappingInfo, bean, method);
                    }
                }
            }
        }
    }

    @Override
    public void unRegistry(PluginInfo plugin) throws Exception {
        for (RequestMappingInfo requestMappingInfo : getRequestMappingInfo(plugin)) {
            requestMappingHandlerMapping.unregisterMapping(requestMappingInfo);
        }
    }

    List<RequestMappingInfo> getRequestMappingInfo(PluginInfo plugin) throws Exception {
        List<RequestMappingInfo> requestMappingInfoList = new ArrayList<>();
        for (Class<?> aClass : plugin.getClassList()) {
            Controller controller = aClass.getAnnotation(Controller.class);
            RestController restController = aClass.getAnnotation(RestController.class);
            if (controller != null || restController != null) {
                Method[] methods = aClass.getMethods();
                for (Method method : methods) {
                    RequestMappingInfo requestMappingInfo = (RequestMappingInfo) getMappingForMethod.invoke(requestMappingHandlerMapping, method, aClass);
                    requestMappingInfoList.add(requestMappingInfo);
                }
            }
        }
        return requestMappingInfoList;
    }
}
