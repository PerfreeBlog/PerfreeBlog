package com.perfree.cache;

import com.google.common.cache.Cache;
import com.google.common.cache.CacheBuilder;
import com.perfree.system.api.option.dto.OptionDTO;
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
    private final Cache<String, OptionDTO> optionCache;

    public OptionCacheService() {
        optionCache = CacheBuilder.newBuilder().build();
    }

    public void putOption(String key, String identification, OptionDTO optionDTO) {
        optionCache.put(key + "_" + identification, optionDTO);
    }

    public OptionDTO getOption(String key, String identification) {
        if (StringUtils.isBlank(key)) {
            return null;
        }
        return optionCache.getIfPresent(key + "_" + identification);
    }

    public void removeOption(String key, String identification) {
        optionCache.invalidate(key + "_" + identification);
    }

    public List<OptionDTO> getAllOption() {
        return optionCache.asMap().values().stream().toList();
    }

    public String getDefaultValue(String key, String identification, String defaultValue) {
        OptionDTO option = getOption(key, identification);
        if (null == option || StringUtils.isBlank(option.getValue())) {
            return defaultValue;
        }

        return option.getValue();
    }
}
