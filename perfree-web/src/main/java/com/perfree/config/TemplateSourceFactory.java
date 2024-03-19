package com.perfree.config;

import com.jfinal.template.source.ClassPathSourceFactory;
import com.jfinal.template.source.FileSourceFactory;
import com.jfinal.template.source.ISource;
import com.jfinal.template.source.ISourceFactory;
import com.perfree.commons.Constants;
import com.perfree.commons.SpringBeanUtils;
import com.perfree.plugin.PluginHolder;
import com.perfree.plugin.PluginInfo;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerExecutionChain;
import org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerMapping;

import jakarta.servlet.http.HttpServletRequest;
import java.io.File;
import java.net.URL;
import java.util.Map;

/**
 * TemplateSource Configuration
 *
 * @author Perfree
 */
public class TemplateSourceFactory implements ISourceFactory {

    @Override
    public ISource getSource(String s, String s1, String s2) {
        URL resource = getClassLoader().getResource(buildClassPathFinalFileName(null, s1));
        if (resource != null) {
            return new ClassPathSourceFactory().getSource(null, s1, s2);
        }
        String finalFileName = buildResourceFinalFileName(Constants.RESOURCES_DIR, s1);
        File file = new File(finalFileName);
        if (file.exists()) {
            return new FileSourceFactory().getSource(Constants.RESOURCES_DIR, s1, s2);
        }


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
        }catch (Exception exception) {
            exception.printStackTrace();
        }

        return null;
    }

    private String buildClassPathFinalFileName(String baseTemplatePath, String fileName) {
        String finalFileName;
        if (baseTemplatePath != null) {
            char firstChar = fileName.charAt(0);
            if (firstChar == '/' || firstChar == '\\') {
                finalFileName = baseTemplatePath + fileName;
            } else {
                finalFileName = baseTemplatePath + "/" + fileName;
            }
        } else {
            finalFileName = fileName;
        }

        if (finalFileName.charAt(0) == '/') {
            finalFileName = finalFileName.substring(1);
        }

        return finalFileName;
    }

    private String buildResourceFinalFileName(String baseTemplatePath, String fileName) {
        if (baseTemplatePath == null) {
            return fileName;
        }
        char firstChar = fileName.charAt(0);
        String finalFileName;
        if (firstChar == '/' || firstChar == '\\') {
            finalFileName = baseTemplatePath + fileName;
        } else {
            finalFileName = baseTemplatePath + File.separator + fileName;
        }
        return finalFileName;
    }

    private ClassLoader getClassLoader() {
        ClassLoader ret = Thread.currentThread().getContextClassLoader();
        return ret != null ? ret : getClass().getClassLoader();
    }
}
