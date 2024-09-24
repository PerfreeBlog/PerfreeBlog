package com.perfree.enjoy.directive.commons;

import com.jfinal.template.Env;
import com.jfinal.template.expr.ast.ExprList;
import com.jfinal.template.io.Writer;
import com.jfinal.template.stat.Scope;
import com.perfree.commons.common.RelativeDateFormat;
import com.perfree.commons.directive.BaseDirective;
import com.perfree.commons.directive.TemplateDirective;
import org.springframework.stereotype.Component;

import java.util.Date;

@TemplateDirective("timeAgo")
@Component
public class TimeAgoDirective extends BaseDirective {
    public void setExprList(ExprList exprList) {
        super.setExprList(exprList);
    }

    @Override
    public void exec(Env env, Scope scope, Writer writer) {
        try {
            Date date = (Date) getParam(0, scope);
            write(writer, RelativeDateFormat.format(date));
        } catch (Exception e) {
            write(writer, "");
        }
    }
}
