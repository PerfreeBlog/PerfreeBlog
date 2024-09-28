package com.demo.directive;

import com.jfinal.template.Env;
import com.jfinal.template.io.Writer;
import com.jfinal.template.stat.Scope;
import com.perfree.commons.directive.BaseDirective;
import com.perfree.commons.directive.TemplateDirective;
import org.springframework.stereotype.Component;

@TemplateDirective("pluginDemo")
@Component
public class PluginDemoDirective extends BaseDirective {
    @Override
    public void exec(Env env, Scope scope, Writer writer) {
        write(writer, "这是一个来自插件自定义的指令");
    }
}
