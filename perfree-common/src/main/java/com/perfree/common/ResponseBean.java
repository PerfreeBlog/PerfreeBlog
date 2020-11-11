package com.perfree.common;

public class ResponseBean {
    public static final int SUCCESS_CODE = 200;
    public static final int ERROR_CODE = 500;
    private int code;

    private String msg;

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

    public static ResponseBean fail(String msg, Object data) {
        return new ResponseBean(ERROR_CODE, msg, data);
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
