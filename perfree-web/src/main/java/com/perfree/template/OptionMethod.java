package com.perfree.template;

import com.perfree.common.SpringBeanUtils;
import com.perfree.model.Option;
import com.perfree.service.OptionService;

public class OptionMethod {
    private static final OptionService optionService = SpringBeanUtils.getBean(OptionService.class);

    public static Option exec(String key){
        return optionService.getOptionByKey(key);
    }
}
