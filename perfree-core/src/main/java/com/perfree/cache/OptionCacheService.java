package com.perfree.cache;

import com.google.common.cache.Cache;
import com.google.common.cache.CacheBuilder;
import com.perfree.constants.OptionConstant;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author Perfree
 * @description 配置缓存相关
 * @date 15:35 2023/9/28
 */
@Service
public class OptionCacheService {
    private final Cache<String, String> optionCache;

    public OptionCacheService() {
        optionCache = CacheBuilder.newBuilder().build();
    }

    public void putOption(String key, Long siteId, String value) {
        optionCache.put(key + OptionConstant.OPTION_CACHE_FLAG + siteId, value);
    }

    public String getOptionValue(String key, Long siteId) {
        if (StringUtils.isBlank(key)) {
            return null;
        }
        if (null == siteId) {
            siteId = -1L;
        }
        return optionCache.getIfPresent(key + OptionConstant.OPTION_CACHE_FLAG + siteId);
    }

    public String getDefaultValue(String key, Long siteId , String defaultValue) {
        if (null == siteId) {
            siteId = -1L;
        }
        String value = optionCache.getIfPresent(key + OptionConstant.OPTION_CACHE_FLAG + siteId);

        if (StringUtils.isBlank(value)){
            return defaultValue;
        }
        return value;
    }

    public void removeOption(String key, Long siteId) {
        optionCache.invalidate(key + OptionConstant.OPTION_CACHE_FLAG + siteId);
    }

    public List<String> getAllOption() {
        return optionCache.asMap().values().stream().toList();
    }
}
