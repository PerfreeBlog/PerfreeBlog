package com.perfree.plugin;

import com.jfinal.template.Directive;
import com.perfree.commons.directive.TemplateDirective;
import com.perfree.enjoy.EnjoyConfig;
import org.noear.solon.core.AppContext;
import org.noear.solon.core.Plugin;

import java.lang.reflect.Method;

/**
 * @description:
 * @author: Matuto
 * @date: 2025/9/3
 */
public class TemplateDirectivePluginImp implements Plugin {
    @Override
    public void start(AppContext context) throws Throwable {
        context.beanInjectorAdd(TemplateDirective.class, (vh, anno)-> {
            EnjoyConfig.jfr.addDirective(vh.getFullName(), (Class<? extends Directive>) vh.getValue().getClass());
        });
    }
}
