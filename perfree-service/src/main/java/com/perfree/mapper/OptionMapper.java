package com.perfree.mapper;

import com.perfree.model.Option;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Component;

@Mapper
@Component
public interface OptionMapper {
    /**
     * 根据key获取option
     * @param key key
     * @return Option
     */
    Option getOptionByKey(String key);
}
