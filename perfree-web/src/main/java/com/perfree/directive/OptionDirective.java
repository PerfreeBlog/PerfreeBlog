package com.perfree.directive;

import com.jfinal.template.Env;
import com.jfinal.template.expr.ast.ExprList;
import com.jfinal.template.io.Writer;
import com.jfinal.template.stat.Scope;
import com.perfree.commons.OptionCacheUtil;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Component;

/**
 * option模板指令
 */
@TemplateDirective("option")
@Component
public class OptionDirective extends BaseDirective {

    public void setExprList(ExprList exprList) {
        super.setExprList(exprList);
    }

    @Override
    public void exec(Env env, Scope scope, Writer writer) {
        String defaultValue = null;
        if (this.exprList.length() >= 2){
            defaultValue = getParam(1, scope).toString();
        }
        String result = OptionCacheUtil.getDefaultValue(getParam(0, scope).toString(), defaultValue);
        write(writer, StringUtils.isBlank(result) ? "" : result);
    }

    @Override
    public boolean hasEnd() {
        return false;
    }
}
