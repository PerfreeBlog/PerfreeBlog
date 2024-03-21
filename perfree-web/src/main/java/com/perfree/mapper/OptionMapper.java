package com.perfree.mapper;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.perfree.model.Option;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface OptionMapper extends BaseMapperX<Option> {

    default Option getOptionByKeyAndSiteId(String key, Long siteId){
        return selectOne(new LambdaQueryWrapper<Option>().eq(Option::getKey, key).eq(Option::getSiteId, siteId));
    }
}

