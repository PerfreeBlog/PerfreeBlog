package com.perfree.plugin.register;

import com.jfinal.template.Directive;
import com.jfinal.template.ext.spring.JFinalViewResolver;
import com.perfree.directive.BaseDirective;
import com.perfree.directive.TemplateDirective;
import com.perfree.plugin.PluginInfo;
import org.springframework.context.ApplicationContext;

import java.util.List;
import java.util.stream.Collectors;

/**
 * @description 定义模板指令注册
 * @author Perfree
 * @date 2021/11/9 16:43
 */
public class TemplateDirectiveRegister implements PluginRegister{
    ApplicationContext applicationContext;

    public TemplateDirectiveRegister(ApplicationContext applicationContext) {
        this.applicationContext = applicationContext;
    }

    @Override
    public void initialize() throws Exception {
    }

    @Override
    public void registry(PluginInfo plugin) throws Exception {
        JFinalViewResolver jFinalViewResolver = this.applicationContext.getBean(JFinalViewResolver.class);
        List<Class<?>> directiveClassList = getClassList(plugin);
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
    public void unRegistry(PluginInfo plugin) throws Exception {
        JFinalViewResolver jFinalViewResolver = this.applicationContext.getBean(JFinalViewResolver.class);
        List<Class<?>> directiveClassList = getClassList(plugin);
        if(directiveClassList.isEmpty()) return;
        for (Class<?> aClass : directiveClassList) {
            TemplateDirective templateDirective = aClass.getAnnotation(TemplateDirective.class);
            if(templateDirective != null) {
                Class<? extends Directive> directive = aClass.asSubclass(Directive.class);
                jFinalViewResolver.getEngine().removeDirective(templateDirective.value());
            }
        }
    }

    List<Class<?>> getClassList(PluginInfo plugin) {
        return plugin.getClassList().stream().filter(item -> BaseDirective.class.isAssignableFrom(item)).collect(Collectors.toList());
    }
}
