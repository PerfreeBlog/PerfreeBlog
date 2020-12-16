package com.perfree.directive;

import com.jfinal.template.Env;
import com.jfinal.template.expr.ast.ExprList;
import com.jfinal.template.io.Writer;
import com.jfinal.template.stat.Scope;
import com.perfree.model.Option;
import com.perfree.service.OptionService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

/**
 * option模板指令
 */
@TemplateDirective("option")
@Component
public class OptionDirective extends BaseDirective {

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
        Option optionByKey = optionService.getOptionByKey(getParam(0, scope).toString());
        String defaultValue = null;
        if (this.exprList.length() >= 2){
            defaultValue = getParam(1, scope).toString();
        }
        if (optionByKey != null) {
            if (StringUtils.isNotBlank(defaultValue) && StringUtils.isBlank(optionByKey.getValue())) {
                write(writer, defaultValue);
            } else {
                write(writer, optionByKey.getValue());
            }
        } else {
            write(writer, defaultValue);
        }
    }

    @Override
    public boolean hasEnd() {
        return false;
    }
}
