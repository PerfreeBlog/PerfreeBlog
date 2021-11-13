package com.perfree.config;

import com.jfinal.template.source.ClassPathSourceFactory;
import com.jfinal.template.source.FileSourceFactory;
import com.jfinal.template.source.ISource;
import com.jfinal.template.source.ISourceFactory;
import com.perfree.common.Constants;
import com.perfree.commons.SpringBeanUtils;
import com.perfree.plugin.PluginHolder;
import com.perfree.plugin.PluginInfo;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerExecutionChain;
import org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerMapping;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.util.Map;

/**
 * TemplateSource Configuration
 *
 * @author Perfree
 */
public class TemplateSourceFactory implements ISourceFactory {

    @Override
    public ISource getSource(String s, String s1, String s2) {
        try{
            return new ClassPathSourceFactory().getSource(null, s1, s2);
        }catch (Exception e) {
            try{
                HttpServletRequest request =((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
                RequestMappingHandlerMapping handlerMapping = SpringBeanUtils.getBean(RequestMappingHandlerMapping.class);
                HandlerExecutionChain handlerChain = handlerMapping.getHandler(request);
                if (handlerChain == null) {
                    throw new IllegalArgumentException("File not found!");
                }
                HandlerMethod handler = (HandlerMethod) handlerChain.getHandler();
                Object bean = handler.getBean();
                ClassLoader classLoader = bean.getClass().getClassLoader();
                Map<String, PluginInfo> allPlugin = PluginHolder.getAllPlugin();
                for (Map.Entry<String, PluginInfo> entry : allPlugin.entrySet()) {
                    if (entry.getValue().getPluginWrapper().getPluginClassLoader() == classLoader) {
                        return new FileSourceFactory().getSource(Constants.PLUGINS_RESOURCES_DIR + File.separator + entry.getKey(), s1, s2);
                    }
                }

                return new FileSourceFactory().getSource(Constants.RESOURCES_DIR, s1, s2);
            } catch (Exception e2) {
                return new FileSourceFactory().getSource(Constants.RESOURCES_DIR, s1, s2);
            }
        }
    }
}
