package com.perfree.directive;

import com.jfinal.template.Directive;
import com.jfinal.template.expr.ast.Assign;
import com.jfinal.template.expr.ast.Expr;
import com.jfinal.template.stat.Scope;
import com.perfree.common.CastUtil;
import org.apache.commons.lang3.StringUtils;

import java.util.HashMap;

/**
 * Custom BaseDirective
 *
 * @author Perfree
 */
public abstract class BaseDirective extends Directive {

    /**
     * Get template data according to key
     * @param key key
     * @param scope scope
     * @return Object
     */
    public Object getModelData(String key, Scope scope) {
        if (scope.getRootData() != null && scope.getRootData().size() > 0 ) {
            return scope.getRootData().get(key);
        }
        return null;
    }

    public Integer getModelDataToInt(String key, Scope scope, int defaultValue) {
        Object data = this.getModelData(key, scope);
        return CastUtil.objToInteger(data, defaultValue);
    }

    public Long getModelDataToLong(String key, Scope scope, long defaultValue) {
        Object data = this.getModelData(key, scope);
        return CastUtil.objToLong(data, defaultValue);
    }

    public Object getParam(int index, Scope scope) {
        if (index >= 0 && index < this.exprList.length()) {
            return this.exprList.getExpr(index).eval(scope);
        }
        return null;
    }

    public Integer getParamToInt(int index, Scope scope, Integer defaultValue) {
        Object param = this.getParam(index, scope);
        return CastUtil.objToInteger(param, defaultValue);
    }

    public Long getParamToLong(int index, Scope scope, Long defaultValue) {
        Object param = this.getParam(index, scope);
        return CastUtil.objToLong(param, defaultValue);
    }

    public HashMap<String, String> exprListToMap() {
        HashMap<String, String> result = new HashMap<>();
        Expr[] exprArray = this.exprList.getExprArray();
        for (Expr expr : exprArray) {
            Assign assign = (Assign) expr;
            result.put(assign.getId(), assign.getRight().toString());
        }
        return result;
    }
}
