package com.perfree.commons;

import net.sf.ehcache.CacheManager;
import net.sf.ehcache.Ehcache;

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
        if (dictData.get(key) == null){
            return "";
        }
        return dictData.get(key).getObjectValue().toString();
    }
}
