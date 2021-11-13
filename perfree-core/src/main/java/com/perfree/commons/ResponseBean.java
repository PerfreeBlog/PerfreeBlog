package com.perfree.commons;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

@ApiModel(value="响应结果",description="全局响应结果信息")
public class ResponseBean {
    public static final int SUCCESS_CODE = 200;
    public static final int ERROR_CODE = 500;
    @ApiModelProperty(value="状态码",name="code",example="200/500")
    private int code;

    @ApiModelProperty(value="信息",name="msg",example="成功")
    private String msg;

    @ApiModelProperty(value="数据",name="data",example="{}")
    private Object data;
    public ResponseBean() {

    }
    public ResponseBean(int code, String msg, Object data) {
        this.code = code;
        this.msg = msg;
        this.data = data;
    }

    public static ResponseBean success(String msg, Object data) {
        return new ResponseBean(SUCCESS_CODE, msg, data);
    }

    public static ResponseBean success(int code,String msg, Object data) {
        return new ResponseBean(code, msg, data);
    }

    public static ResponseBean fail(int code, String msg, Object data) {
        return new ResponseBean(code, msg, data);
    }

    public static ResponseBean fail(String msg, Object data) {
        return new ResponseBean(ERROR_CODE, msg, data);
    }

    public static ResponseBean error(int code, String msg, Object data) {
        return new ResponseBean(code, msg, data);
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

    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }
}
