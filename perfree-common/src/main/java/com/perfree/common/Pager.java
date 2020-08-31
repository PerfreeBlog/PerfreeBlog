package com.perfree.common;

import java.io.Serializable;
import java.util.List;
import java.util.Map;

/**
 * 分页工具类
 */
public class Pager<T> implements Serializable {
    //  页码
    private Integer pageIndex;
    // 每页数据量
    private Integer pageSize;
    // 总条数
    private Long total;
    // 携带参数实体类
    private T form;
    // 排序参数
    private List<Map<String, String>> sort;
    // 携带参数
    private Map<String, Object> params;
    // 数据集
    private Object data;
    // 响应码
    private int code;
    // 响应消息
    private String msg;

    public Map<String, Object> getParams() {
        return params;
    }

    public void setParams(Map<String, Object> params) {
        this.params = params;
    }

    public Integer getPageIndex() {
        return pageIndex;
    }

    public void setPageIndex(Integer pageIndex) {
        this.pageIndex = pageIndex;
    }

    public Integer getPageSize() {
        return pageSize;
    }

    public void setPageSize(Integer pageSize) {
        this.pageSize = pageSize;
    }

    public Long getTotal() {
        return total;
    }

    public void setTotal(Long total) {
        this.total = total;
    }

    public T getForm() {
        return form;
    }

    public void setForm(T form) {
        this.form = form;
    }

    public List<Map<String, String>> getSort() {
        return sort;
    }

    public void setSort(List<Map<String, String>> sort) {
        this.sort = sort;
    }

    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }

    public int getCode() {
        return code;
    }

    public void setCode(int code) {
        this.code = code;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }
}
