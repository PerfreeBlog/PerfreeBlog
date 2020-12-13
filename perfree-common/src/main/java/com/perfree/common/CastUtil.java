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
}
