package com.perfree.enjoy.shared;

import com.perfree.cache.OptionCacheService;
import com.perfree.commons.utils.SpringBeanUtil;
import com.perfree.system.api.option.dto.OptionCacheDTO;
import jakarta.annotation.Resource;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Component;

public class TplMethodShared {

    /**
     * @description 根据key获取字典值
     * @param key  key
     * @return java.lang.String
     * @author Perfree
     */
    public String option(String key) {
        OptionCacheDTO option = SpringBeanUtil.context.getBean(OptionCacheService.class).getOption(key);
        if (null == option || StringUtils.isBlank(option.getValue())) {
            return null;
        }
        return option.getValue();
    }

    /**
     * @description  比对字典值
     * @param key key
     * @param compareValue 要比对的值
     * @return boolean
     * @author Perfree
     */
    public boolean optionCompare(String key, String compareValue) {
        OptionCacheDTO option = SpringBeanUtil.context.getBean(OptionCacheService.class).getOption(key);
        if (null == option || StringUtils.isBlank(option.getValue())) {
            return false;
        }
        return option.getValue().equals(compareValue);
    }

    /**
     * 插件是否启动
     * @param pluginId pluginId
     * @return boolean
     */
    public boolean pluginIsStart(String pluginId) {
      /*  PluginInfo plugin = PluginHolder.getPlugin(pluginId);
        if (plugin == null) {
            return false;
        }
        return plugin.getPluginWrapper().getPluginState().equals(PluginState.STARTED);*/
        return false;
    }
}
