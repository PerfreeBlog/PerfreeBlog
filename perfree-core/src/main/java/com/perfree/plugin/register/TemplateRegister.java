package com.perfree.plugin.register;

import com.jfinal.template.expr.ast.FieldKit;
import com.jfinal.template.ext.spring.JFinalViewResolver;
import com.perfree.plugin.PluginInfo;
import org.springframework.context.ApplicationContext;

/**
 * @description 定义模板指令注册
 * @author Perfree
 * @date 2021/11/9 16:43
 */
public class TemplateRegister implements PluginRegister{
    ApplicationContext applicationContext;

    public TemplateRegister(ApplicationContext applicationContext) {
        this.applicationContext = applicationContext;
    }

    @Override
    public void initialize() throws Exception {
    }

    @Override
    public void registry(PluginInfo plugin) throws Exception {
        JFinalViewResolver jFinalViewResolver = this.applicationContext.getBean(JFinalViewResolver.class);
        jFinalViewResolver.getEngine().removeAllTemplateCache();
        FieldKit.clearCache();
    }

    @Override
    public void unRegistry(PluginInfo plugin) throws Exception {
    }
}
