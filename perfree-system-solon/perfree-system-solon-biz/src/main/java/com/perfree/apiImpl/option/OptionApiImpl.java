package com.perfree.apiImpl.option;

import com.perfree.service.option.OptionService;
import com.perfree.system.api.option.OptionApi;
import jakarta.annotation.Resource;
import org.noear.solon.annotation.Component;
import org.noear.solon.annotation.Inject;
import org.springframework.stereotype.Service;

@Component
public class OptionApiImpl implements OptionApi {

    @Inject
    private OptionService optionService;

    @Override
    public Boolean updateOptionByKeyAndIdentification(String key,String identification, String value) {
        return optionService.updateOptionByKeyAndIdentification(key,identification, value);
    }
}
