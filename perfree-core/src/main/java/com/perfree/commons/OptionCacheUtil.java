package com.perfree.commons;

import net.sf.ehcache.CacheManager;
import net.sf.ehcache.Ehcache;

/**
 * @description OptionCacheUtil
 * @author Perfree
 * @date 2021/8/10 10:27
 */
public class OptionCacheUtil {
    private static final CacheManager cacheManager = CacheManager.newInstance();

    /**
     * 根据key获取值
     * @param key key
     * @return String
     */
    public static String getValue(String key) {
        Ehcache dictData = cacheManager.getEhcache("optionData");
        if (dictData.get(key) == null){
            return "";
        }
        return dictData.get(key).getObjectValue().toString();
    }
}
