package com.perfree.system.api.option;

/**
 * 配置相关api
 */
public interface OptionApi {

    /**
     * 根据key修改value
     * @param key key
     * @param value value
     * @return Boolean
     */
    Boolean updateOptionByKeyAndIdentification(String key,String identification, String value);
}
