package com.perfree.shared;

import com.perfree.model.Option;
import com.perfree.service.OptionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class OptionShared {
    private static OptionService optionService;

    @Autowired
    public void setArticleService(OptionService optionService){
        OptionShared.optionService = optionService;
    }

    public String option(String key) {
        Option optionByKey = optionService.getOptionByKey(key);
        if (optionByKey == null) {
            return null;
        }
        return optionByKey.getValue();
    }

    public boolean optionCompare(String key, String compareValue) {
        Option optionByKey = optionService.getOptionByKey(key);
        if (optionByKey == null) {
            return false;
        }
        if (optionByKey.getValue().equals(compareValue)) {
            return true;
        }
        return false;
    }
}
