package com.perfree.cache;

import com.google.common.cache.Cache;
import com.google.common.cache.CacheBuilder;
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

    public void putOption(String key, String value) {
        optionCache.put(key, value);
    }

    public String getOptionValue(String key) {
        if (StringUtils.isBlank(key)) {
            return null;
        }
        return optionCache.getIfPresent(key);
    }

    public String getDefaultValue(String key, String defaultValue) {
        String value = optionCache.getIfPresent(key);

        if (StringUtils.isBlank(value)){
            return defaultValue;
        }
        return value;
    }

    public void removeOption(String key) {
        optionCache.invalidate(key);
    }

    public List<String> getAllOption() {
        return optionCache.asMap().values().stream().toList();
    }
}
