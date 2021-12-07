package com.perfree.shared;

import com.perfree.commons.OptionCacheUtil;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Component;

@Component
public class TplMethodShared {

    /**
     * @description 根据key获取字典值
     * @param key  key
     * @return java.lang.String
     * @author Perfree
     */
    public String option(String key) {
        String value = OptionCacheUtil.getValue(key);
        if (StringUtils.isBlank(value)) {
            return null;
        }
        return value;
    }

    /**
     * @description  比对字典值
     * @param key key
     * @param compareValue 要比对的值
     * @return boolean
     * @author Perfree
     */
    public boolean optionCompare(String key, String compareValue) {
        String value = OptionCacheUtil.getValue(key);
        if (StringUtils.isBlank(value)) {
            return false;
        }
        return value.equals(compareValue);
    }
}
