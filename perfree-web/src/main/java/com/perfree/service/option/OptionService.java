package com.perfree.service.option;

import com.baomidou.mybatisplus.extension.service.IService;
import com.perfree.model.Option;

import java.util.List;

/**
 * @description OptionService
 * @author Perfree
 * @date 2021/11/15 10:23
 */
public interface OptionService extends IService<Option> {

    void initOptionCache();
}
