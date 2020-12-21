package com.perfree.commons;

import org.springframework.web.servlet.mvc.method.RequestMappingInfo;

import java.lang.reflect.Method;

public class MenuRequest {
    private RequestMappingInfo requestMappingInfo;
    private String[] patternArr;
    private Class<?> entry;
    private Method method_name;

    public RequestMappingInfo getRequestMappingInfo() {
        return requestMappingInfo;
    }

    public Class<?> getEntry() {
        return entry;
    }

    public void setEntry(Class<?> entry) {
        this.entry = entry;
    }

    public Method getMethod_name() {
        return method_name;
    }

    public void setMethod_name(Method method_name) {
        this.method_name = method_name;
    }

    public void setRequestMappingInfo(RequestMappingInfo requestMappingInfo) {
        this.requestMappingInfo = requestMappingInfo;
    }

    public String[] getPatternArr() {
        return patternArr;
    }

    public void setPatternArr(String[] patternArr) {
        this.patternArr = patternArr;
    }


}
