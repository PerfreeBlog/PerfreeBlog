package com.perfree.directive;

import com.jfinal.template.Env;
import com.jfinal.template.expr.ast.ExprList;
import com.jfinal.template.io.Writer;
import com.jfinal.template.stat.Scope;
import com.perfree.common.MarkdownUtil;
import org.springframework.stereotype.Component;

@TemplateDirective("mdSummary")
@Component
public class MdSummaryDirective extends BaseDirective {
    public void setExprList(ExprList exprList) {
        super.setExprList(exprList);
    }

    @Override
    public void exec(Env env, Scope scope, Writer writer) {
        String str = getParam(0, scope).toString();
        String mdStr = MarkdownUtil.mdToStr(str);
        int maxLength = getParamToInt(1, scope, 0);
        String result;
        if (mdStr.length() > maxLength) {
            result = mdStr.substring(0, maxLength);
        } else {
            result = mdStr;
        }
        write(writer, result);
    }
}
