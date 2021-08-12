package com.exam.directive;

import com.jfinal.template.Env;
import com.jfinal.template.expr.ast.ExprList;
import com.jfinal.template.io.Writer;
import com.jfinal.template.stat.Scope;
import com.perfree.directive.BaseDirective;
import com.perfree.directive.TemplateDirective;
import org.springframework.stereotype.Component;

@TemplateDirective("sub")
@Component
public class SubDirective extends BaseDirective {
    public void setExprList(ExprList exprList) {
        super.setExprList(exprList);
    }

    @Override
    public void exec(Env env, Scope scope, Writer writer) {
        String str = getParam(0, scope).toString();
        int maxLength = getParamToInt(1, scope, 0);
        String result;
        if (str.length() > maxLength) {
            result = str.substring(0, maxLength);
        } else {
            result = str;
        }
        write(writer, result);
    }
}
