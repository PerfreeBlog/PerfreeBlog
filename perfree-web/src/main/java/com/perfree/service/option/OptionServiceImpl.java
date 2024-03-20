package com.perfree.service.option;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.perfree.cache.OptionCacheService;
import com.perfree.mapper.OptionMapper;
import com.perfree.model.Option;
import com.perfree.service.option.OptionService;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class OptionServiceImpl extends ServiceImpl<OptionMapper, Option>  implements OptionService {

    @Resource
    private OptionCacheService optionCacheService;


    @Resource
    private OptionMapper optionMapper;


    public void initOptionCache() {
        List<Option> options = optionMapper.selectList();
        for (Option option : options) {
            optionCacheService.putOption(option.getKey(),option.getValue());
        }
    }
}
