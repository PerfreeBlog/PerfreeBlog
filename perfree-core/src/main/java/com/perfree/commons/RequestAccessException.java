package com.perfree.commons;

/**
 * 自定义访问异常
 */
public class RequestAccessException extends Exception {
    public RequestAccessException(String message) {
        super(message);
    }

    public RequestAccessException(String message, Throwable cause) {
        super(message, cause);
    }
}
