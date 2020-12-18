package com.perfree.common;

import org.apache.commons.lang3.StringUtils;

public class CastUtil {

    public static Long objToLong(Object obj, long defaultValue) {
        if (obj != null && !(obj instanceof Long)) {
            String objStr = obj.toString();
            return StringUtils.isBlank(objStr) ? defaultValue : Long.parseLong(objStr);
        }
        Long result = (Long) obj;
        return result == null ? defaultValue : result;
    }


    public static Integer objToInteger(Object obj, int defaultValue) {
        if (obj != null && !(obj instanceof Integer)) {
            String objStr = obj.toString();
            return StringUtils.isBlank(objStr) ? defaultValue : Integer.parseInt(objStr);
        }
        Integer result = (Integer) obj;
        return result == null ? defaultValue : result;
    }

    public static Integer strToInteger(String str, int defaultValue) {
        if (StringUtils.isBlank(str)) {
            return defaultValue;
        }
        return Integer.parseInt(str);
    }

    public static Long strToLong(String str, long defaultValue) {
        if (StringUtils.isBlank(str)) {
            return defaultValue;
        }
        return Long.parseLong(str);
    }

    public static Boolean strToBool(String str, Boolean defaultValue){
        if (StringUtils.isBlank(str)) {
            return defaultValue;
        }
        return Boolean.valueOf(str);
    }
}
