package com.access.interceptor;

import com.gitee.starblues.factory.process.pipe.interceptor.PluginInterceptorRegister;
import com.gitee.starblues.factory.process.pipe.interceptor.PluginInterceptorRegistry;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;

@Component
public class AccessInterceptorRegister implements PluginInterceptorRegister {

    @Resource
    private AccessInterceptor accessInterceptor;

    @Override
    public void registry(PluginInterceptorRegistry pluginInterceptorRegistry) {
        pluginInterceptorRegistry.addInterceptor(accessInterceptor, PluginInterceptorRegistry.Type.GLOBAL)
                .addPathPatterns("/**");
    }
}
