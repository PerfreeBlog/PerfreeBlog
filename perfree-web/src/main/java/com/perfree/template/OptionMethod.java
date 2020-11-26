package com.perfree.template;

import com.perfree.common.SpringBeanUtils;
import com.perfree.service.OptionService;
import freemarker.template.TemplateMethodModelEx;
import freemarker.template.TemplateModelException;
import org.springframework.stereotype.Component;

import java.util.List;

public class OptionMethod implements TemplateMethodModelEx {
    private final OptionService optionService = SpringBeanUtils.getBean(OptionService.class);

    @Override
    public Object exec(List list) throws TemplateModelException {
        if (list.size() != 1) {
            throw new TemplateModelException("Wrong arguments");
        }
        return optionService.getOptionByKey(list.get(0).toString());
    }
}
