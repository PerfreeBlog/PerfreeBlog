package com.perfree.directive;

import com.perfree.model.Option;
import com.perfree.service.OptionService;
import freemarker.core.Environment;
import freemarker.template.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.Map;

/**
 * 自定义option标签
 */
@Component
public class OptionDirective implements TemplateDirectiveModel {
    @Autowired
    private OptionService optionService;
    @Override
    public void execute(Environment environment, Map map, TemplateModel[] templateModels, TemplateDirectiveBody templateDirectiveBody) throws TemplateException, IOException {
        String optionKey = "";
        if (map.containsKey("key")){
            optionKey = map.get("key").toString();
        }
        Option result = optionService.getOptionByKey(optionKey);
        if (result == null) {
            result = new Option();
            result.setKey(optionKey);
            result.setValue("");
        }
        DefaultObjectWrapperBuilder builder = new DefaultObjectWrapperBuilder(Configuration.VERSION_2_3_25);
        environment.setVariable("option", builder.build().wrap(result));
        templateDirectiveBody.render(environment.getOut());
    }
}
