package com.perfree.shared;

import com.perfree.model.Option;
import com.perfree.service.OptionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class TplMethodShared {
    private static OptionService optionService;

    @Autowired
    public void setArticleService(OptionService optionService){
        TplMethodShared.optionService = optionService;
    }

    /**
     * @description 根据key获取字典值
     * @param key  key
     * @return java.lang.String
     * @author Perfree
     */
    public String option(String key) {
        Option optionByKey = optionService.getOptionByKey(key);
        if (optionByKey == null) {
            return null;
        }
        return optionByKey.getValue();
    }

    /**
     * @description  比对字典值
     * @param key key
     * @param compareValue 要比对的值
     * @return boolean
     * @author Perfree
     */
    public boolean optionCompare(String key, String compareValue) {
        Option optionByKey = optionService.getOptionByKey(key);
        if (optionByKey == null) {
            return false;
        }
        return optionByKey.getValue().equals(compareValue);
    }
}
