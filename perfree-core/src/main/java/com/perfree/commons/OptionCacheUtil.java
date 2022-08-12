package com.perfree.commons;

import net.sf.ehcache.CacheManager;
import net.sf.ehcache.Ehcache;
import org.apache.commons.lang3.StringUtils;

/**
 * @description OptionCacheUtil
 * @author Perfree
 * @date 2021/8/10 10:27
 */
public class OptionCacheUtil {
    private static final CacheManager CACHE_MANAGER = CacheManager.newInstance();

    /**
     * 根据key获取缓存的Option值
     * @param key key
     * @return String
     */
    public static String getValue(String key) {
        Ehcache dictData = CACHE_MANAGER.getEhcache(Constants.EHCACHE_KEY_OPTION_DATA);
        if (dictData.get(key) == null || dictData.get(key).getObjectValue() == null){
            return "";
        }
        return dictData.get(key).getObjectValue().toString();
    }

    /**
     * 根据key获取缓存的Option值
     * @param key key
     * @param defaultValue defaultValue
     * @return String
     */
    public static String getDefaultValue(String key, String defaultValue) {
        Ehcache dictData = CACHE_MANAGER.getEhcache(Constants.EHCACHE_KEY_OPTION_DATA);
        if (dictData.get(key) == null){
            return defaultValue;
        }
        String value = dictData.get(key).getObjectValue().toString();
        if (StringUtils.isBlank(value)) {
            return defaultValue;
        }
        return value;
    }
}
