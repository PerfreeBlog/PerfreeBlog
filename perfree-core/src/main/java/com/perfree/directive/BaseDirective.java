package com.perfree.directive;

import com.jfinal.template.Directive;
import com.jfinal.template.expr.ast.Assign;
import com.jfinal.template.expr.ast.Expr;
import com.jfinal.template.stat.Scope;
import org.apache.commons.lang3.StringUtils;

import java.util.HashMap;

public abstract class BaseDirective extends Directive {

    public Object getParam(int index, Scope scope) {
        if (index >= 0 && index < this.exprList.length()) {
            return this.exprList.getExpr(index).eval(scope);
        } else {
            return null;
        }
    }

    public Integer getParamToInt(int index, Scope scope, Integer defaultValue) {
        Object param = this.getParam(index, scope);
        if (param != null && !(param instanceof Integer)){
            String paramStr = param.toString();
            return StringUtils.isBlank(paramStr) ? defaultValue : Integer.valueOf(paramStr);
        } else {
            Integer result = (Integer) param;
            return result == null ? defaultValue : result;
        }
    }

    public Long getParamToLong(int index, Scope scope, Long defaultValue) {
        Object param = this.getParam(index, scope);
        if (param != null && !(param instanceof Long)){
            String paramStr = param.toString();
            return StringUtils.isBlank(paramStr) ? defaultValue : Long.valueOf(paramStr);
        } else {
            Long result = (Long) param;
            return result == null ? defaultValue : result;
        }
    }

    public HashMap<String,String> exprListToMap(){
        HashMap<String,String> result = new HashMap<>();
        Expr[] exprArray = this.exprList.getExprArray();
        for (Expr expr : exprArray) {
            Assign assign = (Assign) expr;
            result.put(assign.getId(),assign.getRight().toString());
        }
        return result;
    }
}
