package com.perfree.cache;

import com.google.common.cache.Cache;
import com.google.common.cache.CacheBuilder;
import com.perfree.shared.api.site.dto.SiteDTO;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author Perfree
 * @description 站点缓存相关
 * @date 15:35 2023/9/28
 */
@Service
public class SiteCacheService {
    private final Cache<String, SiteDTO> siteCache;

    public SiteCacheService() {
        siteCache = CacheBuilder.newBuilder().build();
    }

    public void putSite(String key, SiteDTO siteDTO) {
        siteCache.put(key, siteDTO);
    }

    public SiteDTO getSite(String key) {
        if (StringUtils.isBlank(key)) {
            return null;
        }
        return siteCache.getIfPresent(key);
    }


    public void removeSite(String key) {
        siteCache.invalidate(key);
    }

    public List<SiteDTO> getAllSite() {
        return siteCache.asMap().values().stream().toList();
    }
}
