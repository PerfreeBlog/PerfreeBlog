package com.perfree.cache;

import com.google.common.cache.Cache;
import com.google.common.cache.CacheBuilder;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;

import java.util.concurrent.TimeUnit;

@Service
public class FindPasswordCacheService {
    private final Cache<String, String> findPasswordCodeCache;

    public FindPasswordCacheService() {
        findPasswordCodeCache = CacheBuilder.newBuilder()
                .expireAfterWrite(2, TimeUnit.MINUTES)
                .build();
    }

    public void putCode(String key, String captchaCode) {
        findPasswordCodeCache.put(key, captchaCode);
    }

    public String getCode(String key) {
        if (StringUtils.isBlank(key)) {
            return null;
        }
        return findPasswordCodeCache.getIfPresent(key);
    }

    public void removeCode(String key) {
        findPasswordCodeCache.invalidate(key);
    }
}
