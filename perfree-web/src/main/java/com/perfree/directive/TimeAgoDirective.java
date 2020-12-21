package com.perfree.directive;

import com.jfinal.template.Env;
import com.jfinal.template.expr.ast.ExprList;
import com.jfinal.template.io.Writer;
import com.jfinal.template.stat.Scope;
import com.perfree.common.RelativeDateFormat;
import org.springframework.stereotype.Component;

import java.text.SimpleDateFormat;
import java.util.Date;

@TemplateDirective("timeAgo")
@Component
public class TimeAgoDirective extends BaseDirective{
    public void setExprList(ExprList exprList) {
        super.setExprList(exprList);
    }

    @Override
    public void exec(Env env, Scope scope, Writer writer) {
        try {
        Date date = (Date) getParam(0, scope);
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:m:s");
            write(writer, RelativeDateFormat.format(date));
        } catch (Exception e) {
            write(writer, "");
        }
    }
}
