package com.perfree.directive;

import com.jfinal.template.Env;
import com.jfinal.template.expr.ast.ExprList;
import com.jfinal.template.io.Writer;
import com.jfinal.template.stat.Scope;
import com.perfree.model.Plugin;
import com.perfree.service.PluginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * plugins模板指令(用于获取所有插件)
 */
@TemplateDirective("plugins")
@Component
public class PluginsDirective extends BaseDirective {

    private static PluginService pluginService;

    @Autowired
    public void setCategoryService(PluginService pluginService){
        PluginsDirective.pluginService = pluginService;
    }

    public void setExprList(ExprList exprList) {
        super.setExprList(exprList);
    }

    @Override
    public void exec(Env env, Scope scope, Writer writer) {
        List<Plugin> plugins = pluginService.getAll();
        scope.set("plugins", plugins);
        stat.exec(env, scope, writer);
    }

    @Override
    public boolean hasEnd() {
        return true;
    }
}
