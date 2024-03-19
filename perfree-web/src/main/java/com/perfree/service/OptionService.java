package com.perfree.service;

import com.perfree.model.Option;

import java.util.List;

/**
 * @description OptionService
 * @author Perfree
 * @date 2021/11/15 10:23
 */
public interface OptionService {
    /**
     * 根据key获取option
     * @param key key
     * @return Option
     */
    Option getOptionByKey(String key);

    /**
     * 根据key更新value
     * @param option option
     * @return int
     */
    int updateValueByKey(Option option);

    /**
     * 批量添加或更新option
     * @param options options
     * @return int
     */
    int addOrUpdateOptions(List<Option> options);

    void initOptionCache();
}
