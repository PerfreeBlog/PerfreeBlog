package com.perfree.commons;

import io.swagger.v3.oas.annotations.media.Schema;

import java.io.Serializable;

/**
 * 分页工具类
 *
 * @author Perfree
 */
@Schema(description = "全局分页信息")
public class Pager<T> implements Serializable {
    public static final int SUCCESS_CODE = 200;
    public static final int ERROR_CODE = 500;
    //  页码
    @Schema(description = "页码", name = "pageIndex", example = "1")
    private Integer pageIndex = 1;
    // 每页数据量
    @Schema(description = "每页数据量", name = "pageSize", example = "10")
    private Integer pageSize = 10;
    // 总条数
    @Schema(description = "总条数", name = "total")
    private Long total;
    // 携带参数实体类
    @Schema(description = "查询参数", name = "form", example = "{}", hidden = true)
    private T form;
    // 数据集
    @Schema(description = "分页数据", name = "data")
    private Object data;
    // 响应码
    @Schema(description = "响应码", name = "code", example = "200")
    private int code;
    // 响应消息
    @Schema(description = "响应消息", name = "msg", example = "success")
    private String msg;

    private String orderBy;

    public String getOrderBy() {
        return orderBy;
    }

    public void setOrderBy(String orderBy) {
        this.orderBy = orderBy;
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
