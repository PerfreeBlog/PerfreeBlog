package com.perfree.config;

import com.perfree.commons.OptionCacheUtil;
import com.perfree.plugin.PluginHolder;
import com.perfree.plugin.PluginInfo;
import org.apache.commons.lang3.StringUtils;
import org.pf4j.PluginState;
import org.springframework.stereotype.Component;

@Component
public class TplMethodShared {

    /**
     * @description 根据key获取字典值
     * @param key  key
     * @return java.lang.String
     * @author Perfree
     */
    public String option(String key) {
        String value = OptionCacheUtil.getValue(key);
        if (StringUtils.isBlank(value)) {
            return null;
        }
        return value;
    }

    /**
     * @description  比对字典值
     * @param key key
     * @param compareValue 要比对的值
     * @return boolean
     * @author Perfree
     */
    public boolean optionCompare(String key, String compareValue) {
        String value = OptionCacheUtil.getValue(key);
        if (StringUtils.isBlank(value)) {
            return false;
        }
        return value.equals(compareValue);
    }

    /**
     * 插件是否启动
     * @param pluginId pluginId
     * @return boolean
     */
    public boolean pluginIsStart(String pluginId) {
        PluginInfo plugin = PluginHolder.getPlugin(pluginId);
        if (plugin == null) {
            return false;
        }
        return plugin.getPluginWrapper().getPluginState().equals(PluginState.STARTED);
    }
}
