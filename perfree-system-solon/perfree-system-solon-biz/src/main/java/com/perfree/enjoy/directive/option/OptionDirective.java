package com.perfree.enjoy.directive.option;

import com.jfinal.template.Env;
import com.jfinal.template.expr.ast.ExprList;
import com.jfinal.template.io.Writer;
import com.jfinal.template.stat.Scope;
import com.perfree.cache.OptionCacheService;
import com.perfree.commons.directive.BaseDirective;
import com.perfree.commons.directive.TemplateDirective;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

/**
 * option模板指令
 */
@TemplateDirective("option")
@Component
public class OptionDirective extends BaseDirective {

    private static OptionCacheService optionCacheService;

    @Autowired
    public void setArticleService(OptionCacheService optionCacheService){
        OptionDirective.optionCacheService = optionCacheService;
    }

    public void setExprList(ExprList exprList) {
        super.setExprList(exprList);
    }

    @Override
    public void exec(Env env, Scope scope, Writer writer) {
        String defaultValue = null;
        if (this.exprList.length() >= 3){
            defaultValue = getParam(2, scope).toString();
        }
        String result = optionCacheService.getDefaultValue(getParam(0, scope).toString(), getParam(1, scope).toString(), defaultValue);
        write(writer, StringUtils.isBlank(result) ? "" : result);
    }

    @Override
    public boolean hasEnd() {
        return false;
    }
}
