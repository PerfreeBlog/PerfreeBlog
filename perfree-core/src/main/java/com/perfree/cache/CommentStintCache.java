package com.perfree.cache;

import com.google.common.cache.Cache;
import com.google.common.cache.CacheBuilder;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;

import java.util.concurrent.TimeUnit;

@Service
public class CommentStintCache {

    private final Cache<String, String> commentStintCache;

    public CommentStintCache() {
        commentStintCache = CacheBuilder.newBuilder()
                .expireAfterWrite(30, TimeUnit.SECONDS) // 设置过期时间为30s
                .build();
    }

    public void putCommentStint(String ip, String val) {
        commentStintCache.put(ip, val);
    }

    public String getCommentStint(String ip) {
        if (StringUtils.isBlank(ip)) {
            return null;
        }
        return commentStintCache.getIfPresent(ip);
    }
}
