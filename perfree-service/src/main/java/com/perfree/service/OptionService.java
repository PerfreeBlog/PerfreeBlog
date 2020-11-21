package com.perfree.service;

import com.perfree.mapper.OptionMapper;
import com.perfree.model.Option;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class OptionService {
    @Autowired
    private OptionMapper optionMapper;

    /**
     * 根据key获取option
     * @param key key
     * @return Option
     */
    @Transactional(readOnly = true)
    public Option getOptionByKey(String key){
        return optionMapper.getOptionByKey(key);
    }

}
