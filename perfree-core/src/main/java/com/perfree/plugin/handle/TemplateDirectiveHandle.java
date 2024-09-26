package com.perfree.plugin.handle;

import com.jfinal.template.Directive;
import com.perfree.commons.directive.TemplateDirective;
import com.perfree.enjoy.JFinalViewResolver;
import com.perfree.plugin.PluginInfo;
import org.springframework.context.ApplicationContext;

import java.util.List;

public class TemplateDirectiveHandle implements BasePluginRegistryHandler{

    ApplicationContext applicationContext;

    public TemplateDirectiveHandle(ApplicationContext applicationContext) {
        this.applicationContext = applicationContext;
    }

    @Override
    public void initialize() throws Exception {

    }

    @Override
    public void registry(PluginInfo pluginInfo) throws Exception {
        JFinalViewResolver jFinalViewResolver = this.applicationContext.getBean(JFinalViewResolver.class);
        List<Class<?>> directiveClassList = pluginInfo.getClassList();
        if(directiveClassList.isEmpty()) return;
        for (Class<?> aClass : directiveClassList) {
            TemplateDirective templateDirective = aClass.getAnnotation(TemplateDirective.class);
            if(templateDirective != null) {
                Class<? extends Directive> directive = aClass.asSubclass(Directive.class);
                jFinalViewResolver.getEngine().addDirective(templateDirective.value(), directive);
            }
        }
    }

    @Override
    public void unRegistry(PluginInfo pluginInfo) throws Exception {
        JFinalViewResolver jFinalViewResolver = this.applicationContext.getBean(JFinalViewResolver.class);
        List<Class<?>> directiveClassList = pluginInfo.getClassList();
        if(directiveClassList.isEmpty()) return;
        for (Class<?> aClass : directiveClassList) {
            TemplateDirective templateDirective = aClass.getAnnotation(TemplateDirective.class);
            if(templateDirective != null) {
                jFinalViewResolver.getEngine().removeDirective(templateDirective.value());
            }
        }
    }
}
