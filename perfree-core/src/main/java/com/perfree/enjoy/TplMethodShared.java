package com.perfree.enjoy;

import com.perfree.cache.OptionCacheService;
import com.perfree.commons.MultipleSiteUtil;
import com.perfree.commons.SpringBeanUtils;
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
        OptionCacheService optionCacheService = SpringBeanUtils.getBean(OptionCacheService.class);
        String value = optionCacheService.getOptionValue(key, MultipleSiteUtil.currentSite());
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
        OptionCacheService optionCacheService = SpringBeanUtils.getBean(OptionCacheService.class);
        String value = optionCacheService.getOptionValue(key, MultipleSiteUtil.currentSite());
        if (StringUtils.isBlank(value)) {
            return false;
        }
        return value.equals(compareValue);
    }
}
