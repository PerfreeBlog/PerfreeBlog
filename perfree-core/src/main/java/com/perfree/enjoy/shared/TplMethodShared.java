package com.perfree.enjoy.shared;

import com.perfree.cache.OptionCacheService;
import com.perfree.commons.utils.SpringBeanUtil;
import com.perfree.plugin.PluginInfo;
import com.perfree.plugin.PluginInfoHolder;
import com.perfree.system.api.option.dto.OptionDTO;
import org.apache.commons.lang3.StringUtils;

public class TplMethodShared {

    /**
     * @description 根据key获取字典值
     * @param key  key
     * @return java.lang.String
     * @author Perfree
     */
    public String option(String key, String identification) {
        OptionDTO option = SpringBeanUtil.context.getBean(OptionCacheService.class).getOption(key, identification);
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
    public boolean optionCompare(String key, String identification, String compareValue) {
        OptionDTO option = SpringBeanUtil.context.getBean(OptionCacheService.class).getOption(key, identification);
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
        PluginInfo pluginInfo = PluginInfoHolder.getPluginInfo(pluginId);
        return null == pluginInfo;
    }
}
