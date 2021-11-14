package com.perfree.commons;

import java.io.Serializable;

/**
 * websocket信息类
 * @author Perfree
 */
public class WebSocketMsg implements Serializable {
	private static final long serialVersionUID = 1L;

	/** websocket 类型 */
	private int type;

    /** websocket 信息 */
    private String message;

    /** websocket 数据 */
    private Object data;

    public WebSocketMsg() {

    }

    public WebSocketMsg(int type,String message) {
        this.type = type;
        this.message = message;
    }

    public WebSocketMsg(int type, String message, Object data) {
        this.type = type;
        this.message = message;
        this.data = data;
    }

    public int getType() {
        return type;
    }

    public void setType(int type) {
        this.type = type;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }
}
