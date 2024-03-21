package com.perfree.service.option;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.perfree.cache.OptionCacheService;
import com.perfree.commons.MultipleSiteUtil;
import com.perfree.constants.OptionConstant;
import com.perfree.controller.api.option.vo.OptionQueryReqVO;
import com.perfree.convert.OptionConvert;
import com.perfree.mapper.OptionMapper;
import com.perfree.model.Option;
import com.perfree.controller.api.option.vo.OptionBaseVO;
import com.perfree.controller.api.option.vo.OptionCreateOrUpdateReqVO;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
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
            optionCacheService.putOption(option.getKey() , option.getSiteId(),option.getValue());
        }
    }

    @Override
    public void saveOrUpdateSetting(OptionCreateOrUpdateReqVO optionCreateOrUpdateReqVO) {
        for (OptionBaseVO optionBaseVO : optionCreateOrUpdateReqVO.getOptions()) {
            Option option = OptionConvert.INSTANCE.convertBaseVoToModel(optionBaseVO);
            option.setSiteId(optionCreateOrUpdateReqVO.getSiteId());
            Option queryOption = optionMapper.getOptionByKeyAndSiteId(option.getKey(), option.getSiteId());
            if (null != queryOption) {
                option.setId(queryOption.getId());
                optionMapper.updateById(option);
            } else {
                optionMapper.insert(option);
            }
            optionCacheService.putOption(option.getKey(),option.getSiteId(), option.getValue());
        }
    }

    @Override
    public List<Option> getOptions(OptionQueryReqVO optionQueryReqVO) {
        List<Option> optionList = new ArrayList<>();
        for (String key : optionQueryReqVO.getKeys()) {
            Option option = new Option();
            option.setKey(key);
            option.setValue(optionCacheService.getOptionValue(key, optionQueryReqVO.getSiteId()));
            optionList.add(option);
        }
        return optionList;
    }
}
