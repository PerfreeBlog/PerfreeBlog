package com.perfree.commons.directive;

import com.jfinal.template.Directive;
import com.jfinal.template.expr.ast.Assign;
import com.jfinal.template.expr.ast.Expr;
import com.jfinal.template.stat.Scope;
import com.perfree.commons.utils.CastUtil;
import org.apache.commons.lang3.StringUtils;

import java.util.HashMap;
import java.util.Map;

/**
 * 自定义模板指令基类 BaseDirective
 * @author Perfree
 */
public abstract class BaseDirective extends Directive {

    /**
     * 获取模板数据
     * @param key key
     * @param scope scope
     * @return Object
     */
    public Object getModelData(String key, Scope scope) {
        Map rootData = scope.getRootData();
        if (scope.getRootData() != null && !scope.getRootData().isEmpty()) {
            return scope.getRootData().get(key);
        }
        return null;
    }

    /**
     * 获取模板数据(转换为实体类)
     * @param key key
     * @param scope scope
     * @return Object
     */
    public <T> T getModelDataToClass(String key, Scope scope, Class<T> clazz) {
        Object modelData = getModelData(key, scope);
        if (clazz.isInstance(modelData)) {
            return clazz.cast(modelData);
        }
        return null;
    }

    /**
     * 获取字符串类型模板数据
     * @param key key
     * @param scope scope
     * @return String
     */
    public String getModelDataToStr(String key, Scope scope) {
        Object modelData = getModelData(key, scope);
        return modelData == null ? "": modelData.toString();
    }

    /**
     * 获取Int类型模板数据
     * @param key key
     * @param scope scope
     * @param defaultValue 默认值
     * @return Integer
     */
    public Integer getModelDataToInt(String key, Scope scope, Integer defaultValue) {
        Object data = this.getModelData(key, scope);
        return CastUtil.objToInteger(data, defaultValue);
    }

    /**
     * 获取long类型模板数据
     * @param key key
     * @param scope scope
     * @param defaultValue 默认值
     * @return Long
     */
    public Long getModelDataToLong(String key, Scope scope, Long defaultValue) {
        Object data = this.getModelData(key, scope);
        return CastUtil.objToLong(data, defaultValue);
    }

    /**
     * 根据下标获取参数
     * @param index 下标
     * @param scope scope
     * @return Object
     */
    public Object getParam(int index, Scope scope) {
        if (index >= 0 && index < this.exprList.length()) {
            return this.exprList.getExpr(index).eval(scope);
        }
        return null;
    }

    /**
     * 根据下标获取int类型参数
     * @param index 下标
     * @param scope scope
     * @param defaultValue 默认值
     * @return Integer
     */
    public Integer getParamToInt(int index, Scope scope, Integer defaultValue) {
        Object param = this.getParam(index, scope);
        return CastUtil.objToInteger(param, defaultValue);
    }

    /**
     * 根据下标获取long类型参数
     * @param index 下标
     * @param scope scope
     * @param defaultValue 默认值
     * @return Long
     */
    public Long getParamToLong(int index, Scope scope, Long defaultValue) {
        Object param = this.getParam(index, scope);
        return CastUtil.objToLong(param, defaultValue);
    }

    /**
     * 参数列转map
     * @return HashMap<String, String>
     */
    public HashMap<String, String> exprListToMap() {
        HashMap<String, String> result = new HashMap<>();
        Expr[] exprArray = this.exprList.getExprArray();
        for (Expr expr : exprArray) {
            if (expr instanceof Assign){
                Assign assign = (Assign) expr;
                result.put(assign.getId(), assign.getRight().toString());
            }
        }
        return result;
    }

    /**
     * 根据key获取int类型参数
     * @param key key
     * @param defaultValue 默认值
     * @return int
     */
    public int getExprParamToInt(String key, Integer defaultValue) {
        HashMap<String, String> params = this.exprListToMap();
        String param = params.get(key);
        return CastUtil.strToInteger(param,defaultValue);
    }

    /**
     * 根据key获取string类型参数
     * @param key key
     * @return String
     */
    public String getExprParamToStr(String key, String defaultValue) {
        HashMap<String, String> params = this.exprListToMap();
        String result = params.get(key);
        if (StringUtils.isBlank(result) && StringUtils.isNotBlank(defaultValue)) {
            return defaultValue;
        }
        return StringUtils.isBlank(result)?"":result;
    }

    /**
     * 根据key获取long类型参数
     * @param key key
     * @param defaultValue 默认值
     * @return long
     */
    public long getExprParamToLong(String key, Long defaultValue) {
        HashMap<String, String> params = this.exprListToMap();
        String param = params.get(key);
        return CastUtil.strToLong(param,defaultValue);
    }

    /**
     * 根据key获取bool类型参数
     * @param key key
     * @param defaultValue 默认值
     * @return Boolean
     */
    public Boolean getExprParamToBool(String key, Boolean defaultValue) {
        HashMap<String, String> params = this.exprListToMap();
        String param = params.get(key);
        return CastUtil.strToBool(param, defaultValue);
    }
}
