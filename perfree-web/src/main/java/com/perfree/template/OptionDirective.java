package com.perfree.template;

import com.jfinal.template.Directive;
import com.jfinal.template.Env;
import com.jfinal.template.expr.ast.Expr;
import com.jfinal.template.expr.ast.ExprList;
import com.jfinal.template.io.Writer;
import com.jfinal.template.stat.Scope;
import com.perfree.annotation.TemplateDirective;
import com.perfree.model.Option;
import com.perfree.service.OptionService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@TemplateDirective("option")
@Component
public class OptionDirective extends Directive {

    private static OptionService optionService;

    @Autowired
    public void setOptionService(OptionService optionService){
        OptionDirective.optionService = optionService;
    }

    public void setExprList(ExprList exprList) {
        super.setExprList(exprList);
    }

    @Override
    public void exec(Env env, Scope scope, Writer writer) {
        Expr expr = this.exprList.getExpr(0);
        Option optionByKey = optionService.getOptionByKey(expr.toString());
        if (optionByKey != null) {
            String defaultValue = null;
            if (this.exprList.length() >= 2){
                defaultValue = this.exprList.getExpr(1).toString();
            }
            if (StringUtils.isNotBlank(defaultValue) && StringUtils.isBlank(optionByKey.getValue())) {
                write(writer, defaultValue);
            } else {
                write(writer, optionByKey.getValue());
            }
        }
    }

    @Override
    public boolean hasEnd() {
        return false;
    }
}
